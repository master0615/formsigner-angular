import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DATETIME_FORMATS, TemplateFormField, FormFieldType, TemplateForm } from '../../../../models/template.models';
import * as moment from 'moment';
import { CustomLoadingService } from '../../../../../../shared/services/custom-loading.service';
import { CustomToastrService } from '../../../../../../shared/services/custom-toastr.service';
import { TemplateService } from '../../../../services/template.service';
import * as _ from 'lodash';

const DRAG_GUIDE_TEXT = "Drag & drop your selected field to position it";
const RESIZE_GUIDE_TEXT = "Drag the borders of your selected field to re-size it";

@Component({
	selector: 'app-templates-edit-property-field',
	templateUrl: './field.component.html',
	styleUrls: ['./field.component.scss']
})
export class TemplatesEditPropertyFieldComponent implements OnInit {
	FormFieldType = FormFieldType;
	datetimeFormats = DATETIME_FORMATS;
	@Input() templateForm: TemplateForm;
	@Input() selectedField: TemplateFormField;

	constructor(
		private toastrService  	: CustomToastrService,
		private loadingService 	: CustomLoadingService,
		private templateService : TemplateService,
	) { }	

	ngOnInit() {
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
				field.id = savedField.id;
					
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

	changeMandatory(isChecked: boolean){
		this.setGroupMandatoryValue(this.templateForm, this.selectedField);
	}

	setMandatoryLabel(field: TemplateFormField) {
		switch (field.type) {
			case FormFieldType.DATA_CHECK_BOX:
				return 'Checkbox Group Mandatory';
			case FormFieldType.DATA_RADIO:
				return 'Radio Group Mandatory';
			default:
				return 'Value Mandatory';
		}
	}

	setGroupMandatoryValue(form: TemplateForm, selectedField: TemplateFormField){
		if (selectedField.type != FormFieldType.DATA_CHECK_BOX && selectedField.type != FormFieldType.DATA_RADIO) return;
		if (!selectedField.group || selectedField.group == '') return;
		form.files.forEach( file => {
			file.fields.forEach ( field => {
				if ( selectedField.type == field.type && selectedField.group == field.group && selectedField != field) {
					field.is_mandatory = selectedField.is_mandatory;
				}
			});
		});
	}

	isSignField(field: TemplateFormField) {
		return field.type == FormFieldType.SIGN_DRAW ||
				field.type == FormFieldType.SIGN_INITIAL ||
				field.type == FormFieldType.SIGN_DATE ||
				field.type == FormFieldType.SIGN_EMAIL ||
				field.type == FormFieldType.SIGN_NAME; 
	}
	isDrawSignField(field: TemplateFormField) {
		return field.type == FormFieldType.SIGN_DRAW ||
				field.type == FormFieldType.SIGN_INITIAL;	
	}

	saveField(field: TemplateFormField) {
		if (field.id) {
			this.updateField(field);
		} else {
			this.createField(field);
		}
	}

	getGuideText(field: TemplateFormField) {
		if ( field.id ) return "";

		if (field.dragged == false ) {
			return DRAG_GUIDE_TEXT;
		}
		else if (field.resized == false) {
			return RESIZE_GUIDE_TEXT;
		}
		return "";
	}

	isShowGuide(field: TemplateFormField) {
		return !field.id && ( !field.dragged || !field.resized );
	}
}	
