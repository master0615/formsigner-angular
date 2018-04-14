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
import { CustomToastrService } from '../../../../../shared/services/custom-toastr.service';
import { MatDialog } from '@angular/material';
import { TemplatesSignPadDialogComponent } from '../../dialog/sign-pad/sign-pad-dialog.component';

@Component({
	selector: 'app-templates-signup-field',
	templateUrl: './field.component.html',
	styleUrls: ['./field.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class TemplatesSignupFieldComponent implements OnInit {

	FormFieldType = FormFieldType;

	public dateMask = {
		guide: true,
		showMask : true,
		mask: [/\d/, /\d/, '/', /\d/, /\d/, '/',/\d/, /\d/,/\d/, /\d/]
	  };


	@Input() templateForm: TemplateForm;
	@Input() field: TemplateFormField;

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

	dialogRef: any;
	//fileUploadDialogRef: MatDialogRef<TemplatesSignPadDialogComponent>;

	constructor(
		private templateService	: TemplateService,
		private toastrService  	: CustomToastrService,
		private pdfGenService	: PdfGenerationService,
		private dialog			: MatDialog) { 

	}

	ngOnInit() {

	}


	clickRadio() {
		let isRadioSel = this.field.value == '1' ? '0' : '1';
		setTimeout(()=>{
			this.templateService.unselectRadioGroup(this.templateForm, this.field);
			this.field.value = isRadioSel.toString();
		});
	}
	
	changeCheckbox(event) {
		if ( this.field.is_only_check_group ){
			setTimeout(()=>{
				this.templateService.unselectCheckGroup(this.templateForm, this.field);
			});
		}
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

	clickSignInitial(field: TemplateFormField) {
		this.OnDrawSign(field, false);
	}

	clickSignDraw(field: TemplateFormField) {
		this.OnDrawSign(field, true);
	}

	OnDrawSign(field:TemplateFormField, isSign: boolean) {
		this.dialogRef = this.dialog.open(TemplatesSignPadDialogComponent, {
			panelClass: 'template-sign-pad-dialog',
			data: {
				title	: isSign ? 'Sign' : "Initial",
				signdata: isSign ? this.field.sign : this.field.initial
			}
		});

		this.dialogRef.afterClosed().subscribe(result => {
			if (result){

				this.field.sign_path = result.file;
				if (isSign) {
					this.field.sign = this.field.sign ? this.field.sign : {};
					this.field.sign.data = result.signData;
				} else {
					this.field.initial = this.field.initial ? this.field.initial : {};
					this.field.initial.data = result.signData;
				}
			}
		});		
	}
}
