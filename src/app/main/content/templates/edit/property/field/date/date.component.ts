import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation, Input } from '@angular/core';
import { TemplateFormField, DATETIME_FORMATS, TemplateForm } from '../../../../../models/template.models';


@Component({
	selector: 'app-templates-edit-property-field-date',
	templateUrl: './date.component.html',
	styleUrls: ['./date.component.scss']
})
export class TemplatesEditPropertyFieldDateComponent implements OnInit {
	datetimeFormats = DATETIME_FORMATS;

	@Input() templateForm: TemplateForm;
	@Input() selectedField: TemplateFormField;

	constructor(
	) { }	

	ngOnInit() {
	}
}	
