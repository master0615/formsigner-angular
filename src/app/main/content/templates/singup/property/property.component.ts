import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation, Input } from '@angular/core';
import {Location} from '@angular/common';
import { Router } from '@angular/router';
import { TemplateForm } from '../../../models/template.models';
import { PdfGenerationService } from '../../../services/pdf-generation.service';
import { FormService } from '../../../services/form.service';
import { MatDialog } from '@angular/material';
import { TemplatesSendEmailsDialogComponent } from '../../dialog/send-emails/send-emails-dialog.component';
import { SendEmailsService } from '../../../services/send-emails.service';
import { CustomToastrService } from '../../../../../shared/services/custom-toastr.service';
import { CustomLoadingService } from '../../../../../shared/services/custom-loading.service';
import { TokenStorage } from '../../../../../shared/authentication/token-storage.service';
import { PdfHandlerService } from '../../../services/pdf-handler.service';


@Component({
	selector: 'app-templates-signup-property',
	templateUrl: './property.component.html',
	styleUrls: ['./property.component.scss']
})
export class TemplatesSignupPropertyComponent implements OnInit {

	@Input() templateForm: TemplateForm;

	dialogRef: any;
	emails: any[]=[];
	receivers: any[]=[];
	sender: string = '';
	currentUser:any;

	constructor( 
		private _location			: Location,
		private formService			: FormService,
		private toastrService  		: CustomToastrService,
		private loadingService 		: CustomLoadingService,
		private pdfGenService		: PdfGenerationService,
		private pdfHandlerService	: PdfHandlerService,
		private dialog				: MatDialog,
		private sendEmailsService	: SendEmailsService,
		private tokenStorage		: TokenStorage
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
	
	close() {
		this._location.back();
	}

	send() {
		console.log(this.templateForm);
		this.formService.saveEntry(this.templateForm);
		// Send success message for parent of the iframe
		window.parent.postMessage({
			'func': 'parentFunc',
			'message': 'success'
		}, "*");
	}
	
	sendPDF() {

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
				formData.append('status', 'sign');

				for (let i = 0; i < this.receivers.length; i++) {
					formData.append('receiver[]', this.receivers[i]);
				}

				this.sendTemplateByEmail(formData);


			}
		});	
	}


	downloadPdf() {
		this.pdfGenService.generatePdfFromTemplateForm( this.templateForm, 12);
	}
}
