import { Directive, Component, OnInit, ViewChild, ElementRef, ViewEncapsulation, Input, Output, EventEmitter, HostListener, Inject, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TemplateForm, TemplateFormField, TemplateFormFile, FORM_FIELD_TYPES, FormFieldType } from '../../../models/template.models';
import { CustomToastrService } from '../../../../../shared/services/custom-toastr.service';
import { CustomLoadingService } from '../../../../../shared/services/custom-loading.service';
import { TemplateService } from '../../../services/template.service';
import * as _ from 'lodash';
import { MatchHeightDirective } from '../../../../../shared/directives/match-height.directive';
import { SettingsService } from '../../../services/settings.service';
import { TokenStorage } from '../../../../../shared/authentication/token-storage.service';
import { PdfGenerationService } from '../../../services/pdf-generation.service';

@Component({
	selector: 'app-templates-edit-content',
	templateUrl: './content.component.html',
	styleUrls: ['./content.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class TemplatesEditContentComponent implements OnInit {
	FormFieldType = FormFieldType;

	@Input() templateForm: TemplateForm;
	@Output() onSelectField = new EventEmitter();

	selectedFile:any;
	selectedField: TemplateFormField;
	copyedField: TemplateFormField;
	oldField: TemplateFormField;	
	signData:any;
	initialData:any;

	addPosition: any = {x:0, y:0};
	isDataLoaded = false;
	addDataFieldItems=[];
	addSignFieldItems=[];
	oldWidgetConfig:any;
	ruleInfo = { left: 0, top: 0, right: 0, bottom: 0};

	containerConfig = {
		'margins': [0],
		'draggable': true,
		'resizable': true,
		'max_cols': 0,
		'max_rows': 0,
		'visible_cols': 0,
		'visible_rows': 0,
		'min_cols': 0,
		'min_rows': 0,
		'col_width': 0,
		'row_height': 0,
		'cascade': 'off',
		'min_width': 24,
		'min_height': 24,
		'fix_to_grid': false,
		'auto_style': false,
		'auto_resize': false,
		'maintain_ratio': false,
		'prefer_new': true,
		'zoom_on_drag': false,
		'limit_to_screen': true,
		'allow_overlap': true };



	constructor(
		private toastrService  	: CustomToastrService,
		private loadingService 	: CustomLoadingService,
		private tokenStorage	: TokenStorage,
		private templateService : TemplateService,
		private settingsService : SettingsService,
		private pdfGenService	: PdfGenerationService,
		private route			: ActivatedRoute,			
	) { 
		for (let index = 0; index < FORM_FIELD_TYPES.length; index++) {
			if ( index < 6 ) this.addDataFieldItems.push( FORM_FIELD_TYPES[index] );
			else this.addSignFieldItems.push( FORM_FIELD_TYPES[index] )
		}								
	}

	ngOnInit() {
		this.isDataLoaded = false;
		this.getDrawInitial();
		this.getDrawSignature();
		this.getInitialData();
	}

	
	//----------------------------! Database functions Start !---------------------------//
	getFormData( formId: number ) {
		setTimeout(() => this.loadingService.showLoadingSpinner());
        this.templateService.getForm(formId)
            .subscribe(res => {
				this.loadingService.hideLoadingSpinner();	
            }, err => {
				this.loadingService.hideLoadingSpinner();	
				this.toastrService.showError(err.error.message);
            });			
	}

	getDrawSignature() {
		setTimeout(() => this.loadingService.showLoadingSpinner());
        this.settingsService.getCurrentUserDrawSignature()
            .subscribe(res => {
				this.loadingService.hideLoadingSpinner();	
				this.signData = res;
            }, err => {
				this.loadingService.hideLoadingSpinner();	
				this.toastrService.showError(err.error.message);
            });		
	}

	getDrawInitial() {
		setTimeout(() => this.loadingService.showLoadingSpinner());
        this.settingsService.getCurrentUserDrawInitial()
            .subscribe(res => {
				this.loadingService.hideLoadingSpinner();	
				this.initialData = res;
            }, err => {
				this.loadingService.hideLoadingSpinner();	
				this.toastrService.showError(err.error.message);
            });	
	}	
	
	createField( field: TemplateFormField ){
		if (!field) {
			return;
		}

		let newField = _.cloneDeep( field );
		setTimeout(() => this.loadingService.showLoadingSpinner());

        this.templateService.createField(newField)
            .subscribe(res => {
				this.loadingService.hideLoadingSpinner();	
				const savedField = res;
				
				newField.id = savedField.id;
				let file = this.templateForm.files.find(f => f.id == savedField.file_id);

				this.convertFieldInfoToWidgetConfig(newField, this.selectedFile.screen_width, this.selectedFile.screen_height);

				file.fields.push( newField );
			
				this.selectField(newField);								
            }, err => {
				this.loadingService.hideLoadingSpinner();	
				this.toastrService.showError(err.error.message);
            });			
	}

	updateField( field: TemplateFormField ){
		if (!field) {
			return;
		}

		let upatedField = _.cloneDeep( field );
		this.convertFieldInfoToWidgetConfig( field, this.selectedFile.screen_width, this.selectedFile.screen_height );
		setTimeout(() => this.loadingService.showLoadingSpinner());

        this.templateService.updateField(upatedField)
            .subscribe(res => {
				this.loadingService.hideLoadingSpinner();	
				const savedField = res;
            }, err => {
				this.loadingService.hideLoadingSpinner();	
				this.toastrService.showError(err.error.message);
            });			
	}

	deleteField( field: TemplateFormField ){
		if (!field) {
			return;
		}

		setTimeout(() => this.loadingService.showLoadingSpinner());
		let deleteId = field.id;

        this.templateService.deleteField(deleteId)
            .subscribe(res => {
				this.loadingService.hideLoadingSpinner();	

				let file = this.templateForm.files.find( file => file.id == field.file_id);
				let fieldIndex = file.fields.findIndex( field => field.id == field.id);
				file.fields.splice(fieldIndex, 1);
										
            }, err => {
				this.loadingService.hideLoadingSpinner();	
				this.toastrService.showError(err.error.message);
            });				
	}

	clearFieldsOfPage( file: TemplateFormFile ){
		if (!file) {
			return;
		}

		setTimeout(() => this.loadingService.showLoadingSpinner());
		let fileId = file.id;

        this.templateService.deleteFieldsOfFile(fileId)
            .subscribe(res => {
				this.loadingService.hideLoadingSpinner();	
				file.fields = [];					
            }, err => {
				this.loadingService.hideLoadingSpinner();	
				this.toastrService.showError(err.error.message);
            });				
	}

	//----------------------------! Database functions End !---------------------------//


	//----------------------------! Initial functions Start !---------------------------//
	getInitialData(){
		_.sortBy(this.templateForm.files, 'page_number');

		if ( this.templateForm.files && this.templateForm.files.length > 0 ) {
			this.selectedFile = this.templateForm.files[0];
		}

		this.handleFieldsPosition();

	}

	handleFieldsPosition(){
		this.templateForm.files.forEach( file => {
			file.fields.forEach( field => {
				field.value = field.value == null ? '' : field.value;
				field.name = field.name == null ? '' : field.name;
				field.description = field.description == null ? '' : field.description;
				this.convertFieldInfoToWidgetConfig(field, file.file_width, file.file_height);
			});
		});

		this.isDataLoaded = true;
	}
	//----------------------------! Initial functions End !---------------------------//

	//----------------------------! Events Start !---------------------------//	
	addFieldFromToolBox( fieldType: any ) {
		this.addField(fieldType, this.selectedFile.screen_width / 2 - 50, this.selectedFile.screen_height / 2 - 12 );
	} 

	addField(fieldType:any, posx: number, posy: number, isFromToolBox = true) {
		
		let newField = new TemplateFormField({
			type: fieldType.value, 
			page_number: this.selectedFile.page_number,
			file_id: this.selectedFile.id});

		this.addWidgetConfigToField(newField, posx, posy);
		this.convertWidgetConfigToFieldInfo(newField, this.selectedFile.screen_width, this.selectedFile.screen_height);
		if ( newField.type == FormFieldType.SIGN_DRAW || 
			newField.type == FormFieldType.SIGN_INITIAL ) {
				let userInformation = this.tokenStorage.getUserInfo()
				newField.value = userInformation.id;
				
			if (newField.type == FormFieldType.SIGN_DRAW) {
				newField.sign_path = this.signData.path;
			} else {
				newField.sign_path = this.initialData.path;
			}
		}
		let compareResult = _.isEqual(
			_.omit(newField, ['widget_config', 'created_at']),
			_.omit(this.oldField, ['widget_config', 'created_at'])
		);

		if (compareResult) return;
		if (!isFromToolBox) {
			newField.dragged = true;
		}
		this.selectedFile.fields.push(newField);
		this.selectField(newField);
		this.oldField = newField;
		//this.createField(newField);
	}

	removeField(field: TemplateFormField) {
		let file = this.templateForm.files.find( file => file.id == field.file_id);
		let fieldIndex = file.fields.findIndex( f => f == field);
		file.fields.splice(fieldIndex, 1);	
		this.oldField = null;
		this.selectedField = null;
	}

	Resizepage(event, file) {
		file.screen_width = event.width;
		file.screen_height = event.height;

		 file.fields.forEach( field => {
			this.convertFieldInfoToWidgetConfig( field, file.screen_width, file.screen_height );
			if (field == this.selectedField) {
				this.setRuleInformation(this.selectedField.widget_config);
			}
		 });
	}


	changeStartField(event, file:TemplateFormFile, field:TemplateFormField) {
		this.oldWidgetConfig = _.cloneDeep( field.widget_config );	
	}

	changeStopField(event, file:TemplateFormFile, field:TemplateFormField) {
		let left = event.col;
		let top  = event.row;
		let width = event.sizex;
		let height = event.sizey;

		let index = file.fields.findIndex( f => f.id == field.id );
		//if ( index < 0) { console.log("other page") };
		if (left + width > file.screen_width || top + height > file.screen_height || index < 0){
			setTimeout(()=>{
				field.widget_config = _.cloneDeep( this.oldWidgetConfig );
				this.setRuleInformation(this.oldWidgetConfig);

			}, 100);

		} else {
			field.widget_config.col = left;
			field.widget_config.row = top;
			field.widget_config.sizex = width;
			field.widget_config.sizey = height;
			this.convertWidgetConfigToFieldInfo( field, file.screen_width, file.screen_height );
			this.setRuleInformation(event);
		}

					

	}	

	dragStopField(event, file:TemplateFormFile, field:TemplateFormField) {
		field.dragged = true;
	}

	resizeStopField(event, file:TemplateFormFile, field:TemplateFormField) {
		field.resized = true;
	}

	changingField(event, file:TemplateFormFile, field:TemplateFormField) {
		this.setRuleInformation(event);
	}

	clickField(event, field:TemplateFormField) {
		this.selectField(field);
		event.stopPropagation();	
	}

	changeFields(fields) {
		
	}

	selectPage(event, file:any) {
		this.selectedFile = file;
		let mouse_x = event.offsetX;
		let mouse_y = event.offsetY;

		let targetClassStr =event.currentTarget.classList.value;
		if ( targetClassStr.includes('template-page') ) {
			this.selectField(null);
		}
	}

	selectField(field: TemplateFormField){
		this.selectedField = field;
		this.onSelectField.next(field);
		if (!this.selectedField || !this.selectedField.widget_config) return;

		this.setRuleInformation(this.selectedField.widget_config);
	}

	clearAllFields(){
		if (!this.selectedFile) return;
		this.selectedFile.fields = [];
		//this.clearFieldsOfPage(this.selectedFile);
	}

	pasteField(){
		if ( this.copyedField ) {
			let newField = _.cloneDeep(this.copyedField);

			newField.widget_config.col = this.addPosition.x;
			newField.widget_config.row = this.addPosition.y;
			newField.file_id = this.selectedFile.id;
			delete newField.id;
			this.convertWidgetConfigToFieldInfo( newField, this.selectedFile.screen_width, this.selectedFile.screen_height );
			this.selectedFile.fields.push(newField);
			//this.createField(newField);
		}

		this.copyedField = null;
	}

	copyField(field) {
		this.copyedField = field;
	}

	onRightClick(event, file:TemplateFormFile){
		this.selectPage(event, file);
		this.addPosition = { x: event.offsetX, y: event.offsetY };
	}

	addFieldFromContextMenu(e, field) {
		this.addField(field, this.addPosition.x, this.addPosition.y, false);
	}

	getImageData(event, file:TemplateFormFile) {
		file.img_data = this.pdfGenService.getImageFromUrl(event.target.src);
	}
	//----------------------------! Events End !---------------------------//	


	//--------------------! Convert Coordinate system functions start!-----------------------//
	convertWidgetConfigToFieldInfo(field: TemplateFormField, pageWidth: number, pageHeight: number) {
		field.x_rate 	  = field.widget_config.col / pageWidth;
		field.y_rate 	  = field.widget_config.row / pageHeight;
		field.width_rate  = field.widget_config.sizex / pageWidth;
		field.height_rate = field.widget_config.sizey / pageHeight;		
	}

	convertFieldInfoToWidgetConfig( field: TemplateFormField, pageWidth: number, pageHeight: number) {
		if (!field.widget_config) field.widget_config = {'col': 0, 'row': 0, 'sizex': 0, 'sizey': 0, 'borderSize': 10};

		field.widget_config.col 	= field.x_rate * pageWidth;
		field.widget_config.row 	= field.y_rate * pageHeight;
		field.widget_config.sizex 	= field.width_rate * pageWidth;
		field.widget_config.sizey 	= field.height_rate * pageHeight;	
	}
	//--------------------! Convert Coordinate system functions end !-----------------------//

	//----------------------------! Field Config Funcion Start !---------------------------//	
	addWidgetConfigToField(	
		field: TemplateFormField, 
		posx: number, 
		posy: number, 
		sizex?: number, 
		sizey?: number, 
		minWidth?: number, 
		minHeight?:number,
		borderSize: number = 10  
	) {
		let size_x: number;
		let size_y: number;
		let min_w : number;
		let min_h : number;
		switch (field.type) {
			case FormFieldType.DATA_TEXT:
			case FormFieldType.SIGN_NAME:	
					
				size_x = sizex ? sizex : 100;
				size_y = sizey ? sizey : 24;
				break;
			case FormFieldType.DATA_TEXT_BOX:
				size_x = sizex ? sizex : 100;
				size_y = sizey ? sizey : 80;	
				break;
			case FormFieldType.SIGN_EMAIL:				
			case FormFieldType.DATA_DATE:
			case FormFieldType.SIGN_DATE:			
				size_x = sizex ? sizex : 100;
				size_y = sizey ? sizey : 24;				
				//min_w = minWidth ? minWidth : 80;
				//min_h = minHeight ? minHeight : 24;			
				break;
			case FormFieldType.DATA_CHECK_BOX:
			case FormFieldType.DATA_RADIO:			
				size_x = sizex ? sizex : 24;
				size_y = sizey ? sizey : 24;				
				//min_w = minWidth ? minWidth : 24;
				//min_h = minHeight ? minHeight : 24;		
				break;

			case FormFieldType.DATA_SELECT:
				size_x = sizex ? sizex : 100;
				size_y = sizey ? sizey : 24;				
				//min_w = minWidth ? minWidth : 80;
				//min_h = minHeight ? minHeight : 24;					
				break;
			case FormFieldType.SIGN_INITIAL:
			case FormFieldType.SIGN_DRAW:
				size_x = sizex ? sizex : 100;
				size_y = sizey ? sizey : 50;				
				//min_w = minWidth ? minWidth : 80;
				//min_h = minHeight ? minHeight : 24;			
				break;
																																		
		}

		field.widget_config = { 'col': posx, 'row': posy, 'sizex': size_x, 'sizey': size_y, 'minWidth': min_w,'minHeight': min_h, 'borderSize': borderSize };		
	}


	setRuleInformation(info: any) {
		this.ruleInfo.top = info.row;
		this.ruleInfo.left = info.col;
		this.ruleInfo.bottom = info.row + info.sizey;
		this.ruleInfo.right = info.col + info.sizex;
	}
	//----------------------------! Field Config Funcion End !---------------------------//	
}
