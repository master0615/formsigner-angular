import { Component, OnInit, Output, ViewChild, ElementRef, ViewEncapsulation, Input, EventEmitter } from '@angular/core';
import {Location} from '@angular/common';
import { Router } from '@angular/router';
import { TemplateForm } from '../../../models/template.models';
import { PdfGenerationService } from '../../../services/pdf-generation.service';
import * as _ from 'lodash';
@Component({
	selector: 'app-templates-view-property',
	templateUrl: './property.component.html',
	styleUrls: ['./property.component.scss']
})
export class TemplatesViewPropertyComponent implements OnInit {

	@Input() templateForm: TemplateForm;
	@Output() onDownLoadPdf = new EventEmitter();

	constructor( 
		private _location: Location,
		private pdfGenService: PdfGenerationService
	) { }	

	ngOnInit() {

	}

	close() {
		this._location.back();
	}

	send() {

	}

	downloadPdf() {
		this.pdfGenService.generatePdfFromTemplateForm( this.templateForm, 12);
	}
}
