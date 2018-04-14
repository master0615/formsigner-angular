import { Component, OnInit, ViewChild, ElementRef, Output,EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';
import { FORM_FIELD_GROUP_TYPES, FORM_FIELD_TYPES } from '../../../models/template.models';
import {  } from 'protractor';

@Component({
	selector: 'app-templates-edit-toolbox',
	templateUrl: './toolbox.component.html',
	styleUrls: ['./toolbox.component.scss']
})
export class TemplatesEditToolBoxComponent implements OnInit {

	fieldGroupTypes = FORM_FIELD_GROUP_TYPES;
	fieldTypes = FORM_FIELD_TYPES;

	@Output() onAddField = new EventEmitter();
	constructor(
	) { }

	ngOnInit() {

	}

	getGroupFields(group:any){
		return this.fieldTypes.filter(f => f.group_id == group.value);
	}

	addField(field){
		this.onAddField.next(field);
	}
}
