import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { MatDialog, MatDialogRef } from '@angular/material';
import { TemplateService } from '../../services/template.service';
import { CustomLoadingService } from '../../../../shared/services/custom-loading.service';
import { CustomToastrService } from '../../../../shared/services/custom-toastr.service';
import { TemplatesEditContentComponent } from './content/content.component';
import { TemplatesEditPropertyComponent } from './property/property.component';
import { TemplateForm, TemplateFormField, TemplateFormFile, FormFieldType } from '../../models/template.models';

@Component({
	selector: 'app-templates-edit',
	templateUrl: './edit.component.html',
	styleUrls: ['./edit.component.scss']
})
export class TemplatesEditComponent implements OnInit {
	FormFieldType = FormFieldType;

	selectedField:TemplateFormField;
	templateFormId: number;	
	templateForm:TemplateForm;

	@ViewChild(TemplatesEditContentComponent)
	private conentEl: TemplatesEditContentComponent;
	
	@ViewChild(TemplatesEditPropertyComponent)
	private propertyEl: TemplatesEditPropertyComponent;

	constructor(
		private toastrService  	: CustomToastrService,
		private loadingService 	: CustomLoadingService,
		private templateService : TemplateService,
		public dialog			: MatDialog,
		private route			: ActivatedRoute,		
		private router			: Router ) {

			this.route.params.pipe().subscribe( params => {
				this.templateFormId = params.id;

				this.getTemplateForm( this.templateFormId );
			} );
	}

	ngOnInit() {
	}

	getTemplateForm(templateFormId:number) {
		setTimeout(() => this.loadingService.showLoadingSpinner());
        this.templateService.getForm(templateFormId)
            .subscribe(res => {
				this.loadingService.hideLoadingSpinner();	
				this.templateForm = res;
            }, err => {
				this.loadingService.hideLoadingSpinner();	
				this.toastrService.showError(err.error.message);
				this.templateForm = null;				
            });		
	}

	addField(fieldType:any) {
		this.conentEl.addFieldFromToolBox(fieldType);
	}

	selectField(field:any) {
		this.selectedField = field;
	}
}
