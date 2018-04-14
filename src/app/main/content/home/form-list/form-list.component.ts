import { Component, OnInit, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomToastrService } from '../../../../shared/services/custom-toastr.service';
import { CustomLoadingService } from '../../../../shared/services/custom-loading.service';
import { TemplateService } from '../../services/template.service';
import { TokenStorage } from '../../../../shared/authentication/token-storage.service';
import { UserProfile } from '../../models/profile.models';

const DEFAULT_PAGE_SIZE = 8;

@Component({
	selector: 'app-main-home-form-list',
	templateUrl: './form-list.component.html',
	styleUrls: ['./form-list.component.scss']
})
export class MainHomeFormListComponent implements OnInit, AfterViewInit {

	pageNumber: number = 0;
	pageSize = DEFAULT_PAGE_SIZE;
	total: number;
	templateForms:any[] = [];
	currentUser:UserProfile;

	constructor(		
		private templateService: TemplateService,
		private toastrService  : CustomToastrService,
		private loadingService : CustomLoadingService,
		private tokenStorage   : TokenStorage,
		private router: 		 Router) { 
			this.currentUser = tokenStorage.getUserInfo();
	 }

	ngOnInit() {
		this.getAvailableForms();
	}

	ngAfterViewInit() {
	}

    private getAvailableForms(data=null) {
		const query = {
			page_size: this.pageSize,
			page_number: this.pageNumber,
			...data
		}
		setTimeout(() => this.loadingService.showLoadingSpinner());
        this.templateService.getAvailableForms(this.currentUser.id, query)
            .subscribe(res => {
				this.loadingService.hideLoadingSpinner();	

				res.data.forEach( template => {
					this.templateForms.push(template);
				});

                this.pageSize = res.page_size;
                this.pageNumber = res.page_number;
				this.total = res.total_counts;

            }, err => {
				this.loadingService.hideLoadingSpinner();	
				this.toastrService.showError(err.error.message);
            });
	}

	showMore() {
		this.pageNumber++;
		this.getAvailableForms();
	}
	
	canShowMore() {
		return this.total > this.pageSize * (this.pageNumber + 1);
	}

	search(filter: string) {
		this.templateForms = [];
		this.pageNumber = 0;
		this.getAvailableForms( {filter : filter});
	}
}
