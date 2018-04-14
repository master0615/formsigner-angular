import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { MatDialog, MatDialogRef } from '@angular/material';

import { ConfirmDialogComponent } from '../../../../shared/dialog/confirm/confirm-dialog.component';

import { CustomToastrService } from '../../../../shared/services/custom-toastr.service';
import { CustomLoadingService } from '../../../../shared/services/custom-loading.service';
import { TemplateService } from '../../services/template.service';
import { TemplateForm } from '../../models/template.models';
import { TokenStorage } from '../../../../shared/authentication/token-storage.service';
import { TemplatesFileUploadDialogComponent } from '../dialog/file-upload/file-upload-dialog.component';
import { UserProfile } from '../../models/profile.models';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/takeUntil';

const DEFAULT_PAGE_SIZE = 5;

@Component({
	selector: 'app-templates-list',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class TemplatesListComponent implements OnInit, OnDestroy {

	templates:TemplateForm[]=[];
	selectedTemplates: TemplateForm[]=[];
    pageNumber: number;
    pageSize = DEFAULT_PAGE_SIZE;
    total: number;
	pageLengths = [5, 10, 20, 50, 100];

	filter:string;
	sort:string;
	dir: string;

    loadingIndicator = true;
	reorderable = true;
	
	currentUser:UserProfile;

	@ViewChild(DatatableComponent) table: DatatableComponent;

	searchControl = new FormControl();
	componentDestroyed = new Subject(); // Component Destroy

    dialogRef: any;
	confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
	fileUploadDialogRef: MatDialogRef<TemplatesFileUploadDialogComponent>;

	constructor(
		private toastrService  	: CustomToastrService,
		private loadingService 	: CustomLoadingService,
		private templateService : TemplateService,
		private tokenStorage 	: TokenStorage,
        public dialog			: MatDialog,
		private router			: Router
	) { 
		this.currentUser = this.tokenStorage.getUserInfo();
	}

	ngOnInit() {
		this.getAvailableForms();

		this.searchControl.valueChanges
			.debounceTime(300) 
			.distinctUntilChanged()  
			.takeUntil(this.componentDestroyed)
			.subscribe( filter => { 
				this.filter = filter ? filter : '';
				this.getAvailableForms();
			});
	}

	ngOnDestroy() {
		this.componentDestroyed.next();
		this.componentDestroyed.unsubscribe();
	}

    private getAvailableForms(data=null) {
		const query = {
			page_size: this.pageSize,
			filter: this.filter ? this.filter : '',
			order: this.sort ? this.sort : 'created_at',
			dir: this.dir ? this.dir : 'desc',
			...data
		}

		this.loadingIndicator = true;
		//setTimeout(() => this.loadingService.showLoadingSpinner());
        this.templateService.getAvailableForms(this.currentUser.id, query)
            .subscribe(res => {
				this.loadingIndicator = false;
				//this.loadingService.hideLoadingSpinner();	
				this.templates = res.data;
                this.pageSize = res.page_size;
                this.pageNumber = res.page_number;
				this.total = res.total_counts;
				
            }, err => {
				this.loadingIndicator = false;
				//this.loadingService.hideLoadingSpinner();	
				this.toastrService.showError(err.error.message);
            });
	}
	
    private templateRemove(template) {
		setTimeout(() => this.loadingService.showLoadingSpinner());

        this.templateService.deleteForm(template.id).subscribe(
            res => {
				this.loadingService.hideLoadingSpinner();					
				this.toastrService.showSuccess("The template is deleted successfully!");
				
                this.getAvailableForms();
            },
            err => {
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
	
	private uploadFiles(templateId:number, data:any){
		setTimeout(() => this.loadingService.showLoadingSpinner());

        this.templateService.uploadFiles(templateId, data).subscribe(
            res => {
				this.loadingService.hideLoadingSpinner();					
				this.toastrService.showError(res.message);
				let files = res.data;
			},
            err => {
				this.loadingService.hideLoadingSpinner();	
				this.toastrService.showError(err.error.message);
            });		
	}


	newTemplate(){
        /*this.fileUploadDialogRef = this.dialog.open(TemplatesFileUploadDialogComponent, {
		});	
		this.fileUploadDialogRef.componentInstance.fileType = 'Template';
		let uploadFiles:any[]=[];
	  
        this.fileUploadDialogRef.afterClosed().subscribe(result => {
            if (result) {

				let formData = new FormData();

				for (let i = 0; i < result.files.length; i++) {
					formData.append('file[]', result.files[i], result.files[i].name);

				}

				formData.append('name', result.name);
				formData.append('description', result.description);
				formData.append('pages', result.files.length);
				formData.append('user_id', this.currentUser.id);
				formData.append('share_all', '0');

				this.createForm(formData);

            }
		});	*/
		this.router.navigate(['main/templates/create']);			
	}

	viewTemplate(template:TemplateForm){
		this.router.navigate(['main/templates/view',template.id]);
	}

	editTemplate(template:TemplateForm){
		this.router.navigate(['main/templates/edit',template.id]);
	}
	signupTemplate(template:TemplateForm){
		this.router.navigate(['main/templates/signup',template.id]);
	}

	removeTemplate(template:TemplateForm){
        this.confirmDialogRef = this.dialog.open(ConfirmDialogComponent, {
            disableClose: false
		});
		this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';

        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.templateRemove(template);
            }
        });		
	}

	onSelect({ selected }) {
        this.selectedTemplates.splice(0, this.selectedTemplates.length);
        this.selectedTemplates.push(...selected);
	}

	onActivate(evt) {
		
	}
	
	onSort(event) {
		this.sort = event.sorts[0].prop;
		this.dir = event.sorts[0].dir;
		this.getAvailableForms();
	}
	
    setPage(pageInfo) {
		this.pageNumber = pageInfo.page - 1;
        this.getAvailableForms({
            page_number: this.pageNumber
        });
	}

    onPageLengthChange(value) {
        this.getAvailableForms({page_size: value});
	}

    updateFilter(term: string) {
		this.getAvailableForms();
	}

	min(x, y) {
        return Math.min(x, y);
    }
}
