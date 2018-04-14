import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { MatDialog, MatDialogRef } from '@angular/material';
import { CustomToastrService } from '../../../../shared/services/custom-toastr.service';
import { CustomLoadingService } from '../../../../shared/services/custom-loading.service';
import { TemplateService } from '../../services/template.service';
import { TemplateForm } from '../../models/template.models';



@Component({
	selector: 'app-templates-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.scss']
})
export class TemplatesSignupComponent implements OnInit {

	templateFormId: number;	
	templateForm:TemplateForm;

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
}
