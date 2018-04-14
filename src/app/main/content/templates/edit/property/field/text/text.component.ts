import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation, Input } from '@angular/core';
import { TemplateFormField, TemplateForm } from '../../../../../models/template.models';


@Component({
	selector: 'app-templates-edit-property-field-text',
	templateUrl: './text.component.html',
	styleUrls: ['./text.component.scss']
})
export class TemplatesEditPropertyFieldTextComponent implements OnInit {

	@Input() templateForm: TemplateForm;
	@Input() selectedField: TemplateFormField;

	constructor(
	) { }	

	ngOnInit() {
	}

	changeTextMaxLength(event) {
		let value:number = event.target.value;
		if ( value < 1 ){
			event.target.value = 1;
			this.selectedField.length = event.target.value;
		}
	}
}