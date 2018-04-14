import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation, Input } from '@angular/core';
import { TemplateFormField, TemplateForm, FormFieldType } from '../../../../../models/template.models';


@Component({
	selector: 'app-templates-edit-property-field-radio',
	templateUrl: './radio.component.html',
	styleUrls: ['./radio.component.scss']
})
export class TemplatesEditPropertyFieldRadioComponent implements OnInit {

	@Input() templateForm: TemplateForm;
	@Input() selectedField: TemplateFormField;

	constructor(
	) { }	

	ngOnInit() {
	}

	changeRadioGroup(group: string) {
		this.updateFormRadioGroups(this.templateForm, this.selectedField, group.trim());
		this.selectedField.group = group.trim();
	}

	updateFormRadioGroups(form: TemplateForm, selectedField: TemplateFormField, newValue: string) {

		let newIndex = form.radio_groups.findIndex( g => g == newValue );
		let oldIndex = form.radio_groups.findIndex( g => g == this.selectedField.group );		
		let oldCount = 0;
		let findLastField: TemplateFormField = null;

		form.files.forEach( file => {
			file.fields.forEach ( field => {
				if ( field.type == FormFieldType.DATA_RADIO && 
					field.group !='' && field.group == selectedField.group ){
					oldCount++;
					findLastField = field;
				}
			});
		});

		if (newIndex >= 0) {
			if (oldCount == 1 && findLastField == selectedField ) {
				form.radio_groups.splice(oldIndex, 1);
			}
		} else {
			if (oldCount != 1) {
				if (newValue != '') form.radio_groups.push( newValue );
			} else {
				if (newValue == '' || findLastField.group == newValue) {
					form.radio_groups.splice(oldIndex, 1);
				} else if (selectedField == findLastField){
					form.radio_groups[oldIndex] = newValue;		
				} else {
					form.radio_groups.push( newValue );
				}			
			}
		}
	}

}	
