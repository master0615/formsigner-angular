import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';
import { TemplateForm } from '../../../../models/template.models';
import { CustomToastrService } from '../../../../../../shared/services/custom-toastr.service';
import { CustomLoadingService } from '../../../../../../shared/services/custom-loading.service';
import { TemplateService } from '../../../../services/template.service';
import * as _ from 'lodash';
import { ConfirmDialogComponent } from '../../../../../../shared/dialog/confirm/confirm-dialog.component';
import { TokenStorage } from '../../../../../../shared/authentication/token-storage.service';
import { PdfGenerationService } from '../../../../services/pdf-generation.service';
import { TemplatesFileUploadDialogComponent } from '../../../dialog/file-upload/file-upload-dialog.component';
import { TemplatesThanksSaveDialogComponent } from '../../../dialog/thanks-save/thanks-save-dialog.component';
import { PdfHandlerService } from '../../../../services/pdf-handler.service';
import { SendEmailsService } from '../../../../services/send-emails.service';
import { TemplatesSendEmailsDialogComponent } from '../../../dialog/send-emails/send-emails-dialog.component';

export const PROVIDER_STAFFCONNECT = 'staffconnect';

@Component({
	selector: 'app-templates-edit-property-form',
	templateUrl: './form.component.html',
	styleUrls: ['./form.component.scss']
})
export class TemplatesEditPropertyFormComponent implements OnInit {

	@Input() templateForm: TemplateForm;
	form: FormGroup;
    dialogRef: any;
	confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
	fileUploadDialogRef: MatDialogRef<TemplatesFileUploadDialogComponent>;
	ThanksSaveDialogRef: MatDialogRef<TemplatesThanksSaveDialogComponent>;
	currentUser:any;
	emails: any[]=[];
	receivers: any[]=[];
	sender: string = '';

	constructor(		
		private toastrService  		: CustomToastrService,
		private loadingService 		: CustomLoadingService,
		private templateService 	: TemplateService,
		private tokenStorage 		: TokenStorage,
		private pdfGenService		: PdfGenerationService,
		private pdfHandlerService	: PdfHandlerService,
		private sendEmailsService	: SendEmailsService,
		public dialog				: MatDialog,
		private route				: ActivatedRoute,		
		private router				: Router
	) { 
		this.currentUser = tokenStorage.getUserInfo();
		this.sender = this.currentUser && this.currentUser.email ? this.currentUser.email : null;
	}	

	ngOnInit() {
		this.getAllEmails();

		if (this.currentUser && this.currentUser.email ){
			this.getSelectedEmails(this.currentUser.id);
		}
	}
	

	getAllEmails() {
		setTimeout(() => this.loadingService.showLoadingSpinner());
        this.sendEmailsService.getAllEmails()
            .subscribe(res => {
				this.loadingService.hideLoadingSpinner();	
				this.emails = res;
            }, err => {
				this.emails = [];
				this.loadingService.hideLoadingSpinner();	
				this.toastrService.showError(err.error.message);
            });
	}

	getSelectedEmails(userId: number) {
		setTimeout(() => this.loadingService.showLoadingSpinner());
        this.sendEmailsService.getAllSendEmails(userId)
            .subscribe(res => {
				this.loadingService.hideLoadingSpinner();	
				this.receivers = res.map( email => { return email.email;} );
            }, err => {
				this.receivers = [];
				this.loadingService.hideLoadingSpinner();	
				this.toastrService.showError(err.error.message);
            });
	}

	sendTemplateByEmail(data:any) {
		setTimeout(() => this.loadingService.showLoadingSpinner());
        this.sendEmailsService.sendTemplate(data)
            .subscribe(res => {
				this.loadingService.hideLoadingSpinner();
				this.toastrService.showSuccess(res.message);	
            }, err => {
				this.loadingService.hideLoadingSpinner();	
				this.toastrService.showError(err.error.message);
            });		
	}

	private createForm(data:any){
		setTimeout(() => this.loadingService.showLoadingSpinner());

        this.templateService.createForm(data).subscribe(
            res => {
				this.loadingService.hideLoadingSpinner();					
				//this.toastrService.showSucess(res.message);

				const savedTemplate = res;					
				this.router.navigate(['main/templates/edit',savedTemplate.id]);
            },
            err => {
				this.loadingService.hideLoadingSpinner();	
				this.toastrService.showError(err.error.message);
            });		
	}

	updateForm( templateForm: TemplateForm, isClose: boolean = false, isNew: boolean = false ){
		if ( !templateForm ) {
			return;
		}

		window.parent.postMessage({
			'func': 'parentFunc',
			'message': 'success'
		}, "*");

		setTimeout(() => this.loadingService.showLoadingSpinner());

        this.templateService.updateForm(templateForm)
            .subscribe(res => {
				this.loadingService.hideLoadingSpinner();	
				
				templateForm = res.files;
				this.toastrService.showSuccess("This form is saved successfully!");
				let currentUser =this.tokenStorage.getUserInfo()
				if (currentUser.provider_name == PROVIDER_STAFFCONNECT && currentUser.provider_id) {
					this.OpenThanksSaveDialog();
					return;
				}

				if (isClose) {
					this.router.navigate(['main/templates/list']);
				} 
				if (isNew) {
					this.newTemplate();
				}
            }, err => {
				this.loadingService.hideLoadingSpinner();
				this.toastrService.showError(err.error.message);
            });			
	}

	deleteForm( formId: number ){
		if ( !formId ) {
			return;
		}

		setTimeout(() => this.loadingService.showLoadingSpinner());

        this.templateService.deleteForm(formId)
            .subscribe(res => {
				this.loadingService.hideLoadingSpinner();	

				this.toastrService.showSuccess("This form is deleted successfully!");
				this.router.navigate(['main/templates/list']);

            }, err => {
				this.loadingService.hideLoadingSpinner();
				this.toastrService.showError(err.error.message);
            });			
	}

	onFormSubmit() {

	}

	save() {
		this.updateForm(this.templateForm);
	}

	sendPDF() {
		this.updateForm(this.templateForm);

		this.dialogRef = this.dialog.open(TemplatesSendEmailsDialogComponent, {
			panelClass: 'template-send-emails-dialog',
			data: {
				sender: 	this.sender,
				receivers: 	this.receivers,
				emails: 	this.emails,
				isLogin: 	this.currentUser ? true : false
			}
		});

		this.dialogRef.afterClosed().subscribe(result => {
			if (result){	
				this.receivers = result.receivers;
				this.sender = result.sender;

				let pdfB64 = this.pdfGenService.generatePdfFromTemplateForm( this.templateForm, 12, false);
				let pdfBlob = this.pdfHandlerService.b64toFile(pdfB64, this.templateForm.name);

				let formData = new FormData();
				
				formData.append('pdf', pdfBlob);
				formData.append('file_name', this.templateForm.name);
				formData.append('sender', this.sender);
				formData.append('status', 'create');

				for (let i = 0; i < this.receivers.length; i++) {
					formData.append('receiver[]', this.receivers[i]);
				}

				this.sendTemplateByEmail(formData);


			}
		});	
	}

	saveAndClose() {
		this.updateForm(this.templateForm, true);
		
	}
	
	delete() {
		this.deleteForm(this.templateForm.id);
	}
	
	replaceNewFile() {
		//this.updateForm(this.templateForm, false, true);
		this.newTemplate();
	}
	
	downloadPdf() {
		this.pdfGenService.generatePdfFromTemplateForm( this.templateForm, 12);
	}
	
	saveAs() {
		console.log('saveAs');
	}
	
	newTemplate() {
        this.fileUploadDialogRef = this.dialog.open(TemplatesFileUploadDialogComponent, {
		});	
		this.fileUploadDialogRef.componentInstance.fileType = 'Template';
		let uploadFiles:any[]=[];
	  
        this.fileUploadDialogRef.afterClosed().subscribe(result => {
            if (result) {

				let userInfo = this.tokenStorage.getUserInfo();
				let formData = new FormData();

				for (let i = 0; i < result.files.length; i++) {
					formData.append('file[]', result.files[i], result.files[i].name);

				}
				
				formData.append('name', result.name);
				formData.append('description', result.description);
				formData.append('pages', result.files.length);
				formData.append('user_id', userInfo['id']);
				formData.append('share_all', '0');

				this.createForm(formData);
            }
        });				
	}

	OpenThanksSaveDialog() {
		this.ThanksSaveDialogRef = this.dialog.open(TemplatesThanksSaveDialogComponent, {
		});

		this.ThanksSaveDialogRef.afterClosed().subscribe(result => {
			if (result) {
				this.router.navigate(['main/templates/view',this.templateForm.id]);				
			}
		});
	}
}
