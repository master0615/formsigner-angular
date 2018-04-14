import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation, Input, OnDestroy } from '@angular/core';
import { TemplateFormField, FormFieldType, TemplateForm } from '../../../../../models/template.models';
import { TemplateService } from '../../../../../services/template.service';


@Component({
	selector: 'app-templates-edit-property-field-checkbox',
	templateUrl: './checkbox.component.html',
	styleUrls: ['./checkbox.component.scss']
})
export class TemplatesEditPropertyFieldCheckBoxComponent implements OnInit, OnDestroy {

	@Input() templateForm: TemplateForm;
	@Input() selectedField: TemplateFormField;


	constructor(private templateService: TemplateService ) {

	}	

	ngOnInit() {
	}

	ngOnDestroy() {

	}

	changeCheckGroupOption(event) {
		this.updateOthersOfGroup();
	}

	changeCheckBoxGroup(group: string) {
		this.updateFormCheckBoxGroups(this.templateForm, this.selectedField, group.trim());
		this.selectedField.group = group.trim();
		this.updateOthersOfGroup();
	}

	updateFormCheckBoxGroups(form: TemplateForm, selectedField: TemplateFormField, newValue: string) {

		let newIndex = form.checkbox_groups.findIndex( g => g == newValue );
		let oldIndex = form.checkbox_groups.findIndex( g => g == this.selectedField.group );		
		let oldCount = 0;
		let findLastField: TemplateFormField = null;

		form.files.forEach( file => {
			file.fields.forEach ( field => {
				if ( field.type == FormFieldType.DATA_CHECK_BOX && 
					field.group !='' && field.group == selectedField.group ){
					oldCount++;
					findLastField = field;
				}
			});
		});
		
		if (newIndex >= 0) {
			if (oldCount == 1 && findLastField == selectedField ) {
				form.checkbox_groups.splice(oldIndex, 1);
			}
		} else {
			if (oldCount != 1 ) {
				if (newValue != '') form.checkbox_groups.push( newValue );
			} else {
				if (newValue == '' || findLastField.group == newValue) {
					form.checkbox_groups.splice(oldIndex, 1);
				} else if (selectedField == findLastField){
					form.checkbox_groups[oldIndex] = newValue;		
				} else {
					form.checkbox_groups.push( newValue );
				}			
			}
		}
	} 

	setOnlyCheckProperty(form: TemplateForm, selectedField: TemplateFormField){
		if (!selectedField.group || selectedField.group == '') return;
		form.files.forEach( file => {
			file.fields.forEach ( field => {
				if ( selectedField.type == field.type && selectedField.group == field.group && selectedField != field) {
					field.is_only_check_group = selectedField.is_only_check_group;
				}
			});
		});
	}

	updateOthersOfGroup(){
		this.setOnlyCheckProperty(this.templateForm, this.selectedField);
		if (this.selectedField.value && this.selectedField.is_only_check_group){
			this.templateService.unselectCheckGroup( this.templateForm, this.selectedField);
		}
	}
}
