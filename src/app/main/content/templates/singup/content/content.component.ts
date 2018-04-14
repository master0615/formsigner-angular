import { Directive, Component, OnInit, ViewChild, ElementRef, ViewEncapsulation, Input, Output, EventEmitter, HostListener, Inject, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TemplateForm, TemplateFormField, TemplateFormFile, FORM_FIELD_TYPES, FormFieldType } from '../../../models/template.models';
import { CustomToastrService } from '../../../../../shared/services/custom-toastr.service';
import { CustomLoadingService } from '../../../../../shared/services/custom-loading.service';
import { TemplateService } from '../../../services/template.service';
import * as _ from 'lodash';
import { MatchHeightDirective } from '../../../../../shared/directives/match-height.directive';
import { PdfGenerationService } from '../../../services/pdf-generation.service';

@Component({
	selector: 'app-templates-signup-content',
	templateUrl: './content.component.html',
	styleUrls: ['./content.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class TemplatesSignupContentComponent implements OnInit {

	@Input() templateForm: TemplateForm;
	imgLoadedCount:number = 0;
	isDataLoaded = false;


	containerConfig = {
		'margins': [0],
		'draggable': false,
		'resizable': false,
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
		private templateService : TemplateService,
		private pdfGenService	: PdfGenerationService,
		private route			: ActivatedRoute,			
	) { 
							
	}

	ngOnInit() {
		this.isDataLoaded = false;
		setTimeout(() => this.loadingService.showLoadingSpinner() );
		this.getInitialData();
	}


	//----------------------------! Initial functions Start !---------------------------//
	getInitialData(){
		_.sortBy(this.templateForm.files, 'page_number');
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

	Resizepage(event, file) {
		file.screen_width = event.width;
		file.screen_height = event.height;

		 file.fields.forEach( field => {
			this.convertFieldInfoToWidgetConfig( field, file.screen_width, file.screen_height );
		 });
	}

	getImageData(event, file:TemplateFormFile) {
		file.img_data = this.pdfGenService.getImageFromUrl(event.target.src);
		if ( ++this.imgLoadedCount >= this.templateForm.files.length ) {
			this.loadingService.hideLoadingSpinner();
		}
	}

	//----------------------------! Events end !---------------------------//	


	//--------------------! Convert Coordinate system functions start !-----------------------//	
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
			case FormFieldType.SIGN_INITIAL:					
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
			case 'sign_draw':
				size_x = sizex ? sizex : 100;
				size_y = sizey ? sizey : 24;				
				//min_w = minWidth ? minWidth : 80;
				//min_h = minHeight ? minHeight : 24;			
				break;
																																		
		}

		field.widget_config = { 'col': posx, 'row': posy, 'sizex': size_x, 'sizey': size_y, 'minWidth': min_w,'minHeight': min_h, 'borderSize': borderSize };		
	}

	//----------------------------! Field Config Funcion End !---------------------------//	
}
