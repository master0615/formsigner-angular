import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation, Input, Output,EventEmitter, DoCheck, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import * as moment from 'moment';

import { FORM_FIELD_TYPES, FormFieldType, TemplateFormField, DEAFULT_DATE_FORMAT, TemplateForm } from '../../../models/template.models';
import { ContextMenuService, ContextMenuComponent } from 'ngx-contextmenu';
import { TemplateService } from '../../../services/template.service';
import { PdfGenerationService } from '../../../services/pdf-generation.service';

@Component({
	selector: 'app-templates-edit-field',
	templateUrl: './field.component.html',
	styleUrls: ['./field.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class TemplatesEditFieldComponent implements OnInit, OnChanges {


	FormFieldType = FormFieldType;

	public dateMask = {
		guide: true,
		showMask : true,
		mask: [/\d/, /\d/, '/', /\d/, /\d/, '/',/\d/, /\d/,/\d/, /\d/]
	  };

	isEdit:boolean = false;


	@Input() templateForm: TemplateForm;
	@Input() isSelect: boolean;
	@Input() field: TemplateFormField;
	@Input() signData: any;
	@Input() initialData: any;

	@ViewChild('inputEl') inputEl; 
	@ViewChild('textEl') textEl;
	@ViewChild('dateEl') dateEl;
	@ViewChild('checkboxEl') checkboxEl;
	@ViewChild('radioEl') radioEl;	
	@ViewChild('selectEl') selectEl;
	@ViewChild('signInitEl') signInitEl;
	@ViewChild('signNameEl') signNameEl;
	@ViewChild('signEmailEl') signEmailEl;	
	@ViewChild('signDateEl') signDateEl;

	@Output() onRemoveField = new EventEmitter();
	@Output() onSelectField = new EventEmitter();
	
	constructor(
		private templateService: TemplateService,
		private pdfGenService: PdfGenerationService) { 

	}

	ngOnInit() {
		if (this.isSelect) this.isEdit = false; 
	}

	ngOnChanges() {
		if (!this.isSelect) this.isEdit = false; 
	}

	editField() {
		if (!this.isSelect) return;
		this.isEdit = true;

		switch (this.field.type) {
			case FormFieldType.DATA_TEXT:
				this.inputEl.nativeElement.focus();
				break;
			case FormFieldType.DATA_TEXT_BOX:
				this.textEl.nativeElement.focus();
				break;
			case FormFieldType.DATA_DATE:
				this.dateEl.nativeElement.focus();		
				break;
			case FormFieldType.DATA_CHECK_BOX:
				break;
			case FormFieldType.DATA_RADIO:

				let isRadioSel = this.field.value == '1' ? '0' : '1';
				setTimeout(()=>{
					this.templateService.unselectRadioGroup(this.templateForm, this.field);
					this.field.value = isRadioSel.toString();
				});
				break;
			case FormFieldType.DATA_SELECT:
				//this.selectEl.nativeElement.focus();
				break;
			case FormFieldType.SIGN_DRAW:		
				break;
			case FormFieldType.SIGN_INITIAL:
				this.signInitEl.nativeElement.focus();		
				break;
			case FormFieldType.SIGN_NAME:
				this.signNameEl.nativeElement.focus();					
				break;
			case FormFieldType.SIGN_DATE:
				this.signDateEl.nativeElement.focus();					
				break;
			case FormFieldType.SIGN_EMAIL:
				this.signEmailEl.nativeElement.focus();					
				break;																																					
		}		
		//this.onSelectField.next(this.field);
	}

	unselectField() {
		this.isSelect = false;	
	}

	removeField() {

		this.onRemoveField.next(this.field);
	}

	mousedownResize(event) {
		//event.stopPropagation();
	}
	
	changeCheckbox(event) {
		if ( this.field.is_only_check_group ){
			setTimeout(()=>{
				this.templateService.unselectCheckGroup(this.templateForm, this.field);

			});
		}

		this.field.value = !this.field.value;	
	}

	setStringAsDateFormat(field: TemplateFormField) {
		if (!field.value ){
			return '';
		}else if (field.date_format.trim() == ''){
			return field.value;
		}
		let result = moment(field.value).format(field.date_format);
		return result;
	}

	setDtPickerType(format: string) {
		if (format.includes('H') || format.includes('m') ){
			return 'both';
		} else {
			return 'calendar';
		}
	}

	getSelectOptionsFromField(field: TemplateFormField) {
		if ( !field.select_options ) return [];
		let options = field.select_options.trim().split(",");
		let index = options.findIndex(o => o == '');
		if (index != -1) options.splice(index, 1);
		return options;
	}

	getImageData(event, field:TemplateFormField) {
		field.img_data = this.pdfGenService.getImageFromUrl(event.target.src);
	}

	isFirstActiveField(field: TemplateFormField, isSelect: boolean){
		return isSelect && !field.dragged && !field.resized && !field.id;
	}
}
