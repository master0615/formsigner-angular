import { Component, OnInit } from '@angular/core';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { SettingsService } from '../services/settings.service';
import { CustomLoadingService } from '../../../shared/services/custom-loading.service';
import { CustomToastrService } from '../../../shared/services/custom-toastr.service';

@Component({
	selector: 'app-settings',
	templateUrl: './settings.component.html',
	styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

	signData: any;
	initialData: any;
	constructor(
		private toastrService  	: CustomToastrService,
		private loadingService 	: CustomLoadingService,		
		private settingsService: SettingsService) {
		
	 }

	ngOnInit() {
		this.getDrawSignature();
		this.getDrawInitial();
	}

	getDrawSignature() {
		setTimeout(() => this.loadingService.showLoadingSpinner());
        this.settingsService.getCurrentUserDrawSignature()
            .subscribe(res => {
				this.loadingService.hideLoadingSpinner();	
				this.signData = res;
            }, err => {
				this.loadingService.hideLoadingSpinner();	
				this.toastrService.showError(err.error.message);
            });		
	}

	getDrawInitial() {
		setTimeout(() => this.loadingService.showLoadingSpinner());
        this.settingsService.getCurrentUserDrawInitial()
            .subscribe(res => {
				this.loadingService.hideLoadingSpinner();	
				this.initialData = res;
            }, err => {
				this.loadingService.hideLoadingSpinner();	
				this.toastrService.showError(err.error.message);
            });	
	}

	setDrawSignature(signdata: any) {
		setTimeout(() => this.loadingService.showLoadingSpinner());
        this.settingsService.setCurrentuserDrawSignature(signdata)
            .subscribe(res => {
				this.loadingService.hideLoadingSpinner();	
				this.toastrService.showSuccess("The signature is saved successfully");			
				this.signData = res;
            }, err => {
				this.loadingService.hideLoadingSpinner();	
				this.toastrService.showError(err.error.message);
            });	
	}

	setDrawInitial(initialdata: any) {
		setTimeout(() => this.loadingService.showLoadingSpinner());
        this.settingsService.setCurrentuserDrawInitial(initialdata)
            .subscribe(res => {
				this.loadingService.hideLoadingSpinner();	
				this.toastrService.showSuccess("The initial is saved successfully");
				this.initialData = res;
            }, err => {
				this.loadingService.hideLoadingSpinner();	
				this.toastrService.showError(err.error.message);
            });
	}


	makeDrawSignature(signData: any) {

		let formData = new FormData();
		formData.append('file', signData.file);
		formData.append('data', signData.data);

		this.setDrawSignature(formData);
	}

	makeDrawInitial(initialData: any) {
		let formData = new FormData();
		formData.append('file', initialData.file);
		formData.append('data', initialData.data);

		this.setDrawInitial(formData);
	}
}
