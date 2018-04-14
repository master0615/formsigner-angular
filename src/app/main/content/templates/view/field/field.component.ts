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
	selector: 'app-templates-view-field',
	templateUrl: './field.component.html',
	styleUrls: ['./field.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class TemplatesViewFieldComponent implements OnInit {

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


	constructor(private templateService: TemplateService,
		private pdfGenService: PdfGenerationService) { 

	}

	ngOnInit() {

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
}
