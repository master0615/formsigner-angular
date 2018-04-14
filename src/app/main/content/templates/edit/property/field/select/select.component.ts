import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation, Input } from '@angular/core';
import { TemplateFormField, TemplateForm } from '../../../../../models/template.models';


@Component({
	selector: 'app-templates-edit-property-field-select',
	templateUrl: './select.component.html',
	styleUrls: ['./select.component.scss']
})
export class TemplatesEditPropertyFieldSelectComponent implements OnInit {

	@Input() templateForm: TemplateForm;
	@Input() selectedField: TemplateFormField;

	options:string[];
    @ViewChild('optionInput') optionInputEl;
	constructor(
	) { }	

	ngOnInit() {
		this.getOptionsFromField(this.selectedField);
	}

	deleteOption(option: string) {
		let index = this.options.findIndex(o => o == option);
		if (index != -1) this.options.splice(index, 1);
		this.setFormFieldSelectOption(this.selectedField);
	}

	addOption(option:string) {
		let index = this.options.findIndex(o => o == option);
		if (index == -1) {
			this.options.push(option);
		}
		this.setFormFieldSelectOption(this.selectedField);
		this.optionInputEl.nativeElement.value='';
		this.optionInputEl.nativeElement.focus();				
	}

	getOptionsFromField(field: TemplateFormField) {
		if ( !field.select_options ) {
			this.options = [];
			return;
		}
		
		this.options = field.select_options.trim().split(",");
		let index = this.options.findIndex(o => o == '');
		if (index != -1) this.options.splice(index, 1);
	}

	setFormFieldSelectOption(field: TemplateFormField) {
		field.select_options = this.options.join();
	}	
}