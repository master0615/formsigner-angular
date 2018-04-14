import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation, HostListener, Inject, EventEmitter, ChangeDetectorRef, SimpleChanges, Input, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { SendEmailsService } from '../../../services/send-emails.service';
import { CustomLoadingService } from '../../../../../shared/services/custom-loading.service';
import { CustomToastrService } from '../../../../../shared/services/custom-toastr.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DisableControlDirective } from '../../../../../shared/directives/disable-control.directive';


@Component({
	selector: 'app-templates-send-emails-dialog',
	templateUrl: './send-emails-dialog.component.html',
    styleUrls: ['./send-emails-dialog.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class TemplatesSendEmailsDialogComponent implements OnInit {

	emails:any[]=[];
	sender = null;
	receivers:any[]=[];
	form: FormGroup;
	isLogin = false;
	
	
    constructor(
        public dialogRef: MatDialogRef<TemplatesSendEmailsDialogComponent>,		
		@Inject(MAT_DIALOG_DATA) private data: any,
		private formBuilder     	: FormBuilder,
		private sendEmailsService	: SendEmailsService,
	) { 
		this.emails = this.data.emails;
		this.sender = this.data.sender ? this.data.sender : '';
		this.isLogin = this.data.isLogin;
		this.receivers = this.data.receivers;
	}

	ngOnInit() {
        this.form = this.formBuilder.group({
			sender: [this.sender, [Validators.required, Validators.email]],
			receivers: [this.emails, [Validators.required]]
		});
	}


	onAddEmail(email) {
		if (!this.validateEmail(email.email)) {
			let receivers = this.form.controls.receivers.value;
			
			let findIndex = receivers.findIndex(e => e == email.email);
			receivers.splice(findIndex, 1);
			this.form.controls.receivers.patchValue(receivers);
		} 

	}

	send() {
		this.dialogRef.close({
				sender: this.form.controls.sender.value, 
				receivers: this.form.controls.receivers.value
			});
	}


	private validateEmail(value: string) {
		let emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
		let valid = emailRegEx.test(value);
		return valid;
	}

}
