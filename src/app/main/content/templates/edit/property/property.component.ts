import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { MatDialog, MatDialogRef } from '@angular/material';
import { TemplateFormField, TemplateForm, FORM_FIELD_TYPES } from '../../../models/template.models';


@Component({
	selector: 'app-templates-edit-property',
	templateUrl: './property.component.html',
	styleUrls: ['./property.component.scss']
})
export class TemplatesEditPropertyComponent implements OnInit {

	@Input() templateForm: TemplateForm;
	@Input() selectedField: TemplateFormField;

	constructor(
	) { }	

	ngOnInit() {

	}

	selectField(field) {
		this.selectedField = field;
	}

	getLabelFromFieldTypeValue(fieldTypeValue) {
		let selectedType = FORM_FIELD_TYPES.find( f => f.value == fieldTypeValue )
		return selectedType ? selectedType.label : '';
	}
}
