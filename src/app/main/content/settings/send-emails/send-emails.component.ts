import { Component, 
		OnInit, 
		Input, 
		ViewChild, 
		ViewEncapsulation, 
		HostListener, 
		Output, 
		EventEmitter, 	
		AfterViewInit, 
		OnChanges,
		SimpleChanges,
		ChangeDetectorRef,
		OnDestroy} from '@angular/core';
import { CustomToastrService } from '../../../../shared/services/custom-toastr.service';
import { CustomLoadingService } from '../../../../shared/services/custom-loading.service';
import { SendEmailsService } from '../../services/send-emails.service';
import { TokenStorage } from '../../../../shared/authentication/token-storage.service';
import { SendEmail } from '../../models/send-email.models';
import { UserProfile } from '../../models/profile.models';
import { FormControl } from '@angular/forms';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/takeUntil';
import { ConfirmDialogComponent } from '../../../../shared/dialog/confirm/confirm-dialog.component';
import { MatDialogRef, MatDialog } from '@angular/material';



const DEFAULT_PAGE_SIZE = 5;

@Component({
	selector: 'app-settings-send-emails',
	templateUrl: './send-emails.component.html',
	styleUrls: ['./send-emails.component.scss'],
	encapsulation: ViewEncapsulation.None
})

export class SettingsSendEmailsComponent implements OnInit, OnDestroy {
	
	sendEmails:SendEmail[]=[];
	selectedSendEmails: SendEmail[]=[];
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

	searchControl = new FormControl();
	componentDestroyed = new Subject(); // Component Destroy

	dialogRef: any;
	confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;

	constructor(		
		private toastrService  		: CustomToastrService,
		private loadingService 		: CustomLoadingService,
		private sendEmailsService 	: SendEmailsService,
		private tokenStorage 		: TokenStorage,	
		public dialog				: MatDialog,	
	) { 
		this.currentUser = tokenStorage.getUserInfo();
	}

	ngOnInit() {
		this.getSendEmails();

		this.searchControl.valueChanges
		.debounceTime(300) 
		.distinctUntilChanged()  
		.takeUntil(this.componentDestroyed)
		.subscribe( filter => { 
			this.filter = filter ? filter : '';
			this.getSendEmails();
		});
	}

	ngOnChanges() {
	}

	ngOnDestroy() {
		this.componentDestroyed.next();
		this.componentDestroyed.unsubscribe();
	}

	private getSendEmails(data=null) {
		const query = {
			page_size: this.pageSize,
			filter: this.filter ? this.filter : '',
			order: this.sort ? this.sort : 'created_at',
			dir: this.dir ? this.dir : 'desc',
			...data
		}

		this.loadingIndicator = true;
		//setTimeout(() => this.loadingService.showLoadingSpinner());
        this.sendEmailsService.getSendEmails(this.currentUser.id, query)
            .subscribe(res => {
				this.loadingIndicator = false;
				//this.loadingService.hideLoadingSpinner();	
				this.sendEmails = res.data;
                this.pageSize = res.page_size;
                this.pageNumber = res.page_number;
				this.total = res.total_counts;
				
            }, err => {
				this.loadingIndicator = false;
				//this.loadingService.hideLoadingSpinner();	
				this.toastrService.showError(err.error.message);
            });
	}

	private createSendEmail(sendEmail: SendEmail) {
		setTimeout(() => this.loadingService.showLoadingSpinner());
        this.sendEmailsService.createSendEmail(sendEmail)
            .subscribe(res => {
				this.loadingService.hideLoadingSpinner();	
				this.toastrService.showSuccess("The email was created successfully!");
				//this.user = res.data;
				this.getSendEmails();
            }, err => {
				this.loadingService.hideLoadingSpinner();	
				this.toastrService.showErrorMsg(err.errors);
            });
	}

	private updateSendEmail(sendEmail: SendEmail) {
		setTimeout(() => this.loadingService.showLoadingSpinner());
        this.sendEmailsService.updateSendEmail(sendEmail)
            .subscribe(res => {
				this.loadingService.hideLoadingSpinner();	
				this.toastrService.showSuccess("The email was updated successfully!");
				//this.user = res.data;
				this.getSendEmails();
            }, err => {
				this.loadingService.hideLoadingSpinner();	
				this.toastrService.showErrorMsg(err.errors);
            });
	}

	private deleteSendEmail(id: number) {

		setTimeout(() => this.loadingService.showLoadingSpinner());
        this.sendEmailsService.deleteSendEmail(id)
            .subscribe(res => {
				this.loadingService.hideLoadingSpinner();	
				this.toastrService.showSuccess("The profile of user was deleted successfully!");
				//this.user = res.data;
				this.getSendEmails();
            }, err => {
				this.loadingService.hideLoadingSpinner();	
				this.toastrService.showErrorMsg(err.errors);
            });
	}

	removeSendMail(sendEmail: SendEmail) {
        this.confirmDialogRef = this.dialog.open(ConfirmDialogComponent, {
            disableClose: false
		});
		this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';

        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.deleteSendEmail(sendEmail.id);
            }
        });	
	}

	onSelect({ selected }) {
        this.selectedSendEmails.splice(0, this.selectedSendEmails.length);
        this.selectedSendEmails.push(...selected);
	}

	onActivate(evt) {
	}
	
	onSort(event) {
		this.sort = event.sorts[0].prop;
		this.dir = event.sorts[0].dir;
		this.getSendEmails();
	}
	
    setPage(pageInfo) {
		this.pageNumber = pageInfo.page - 1;
        this.getSendEmails({
            page_number: this.pageNumber
        });
	}
	
    onPageLengthChange(value) {
        this.getSendEmails({page_size: value});
	}
	
    updateFilter(term: string): void {
		this.getSendEmails();
    }


	min(x, y) {
        return Math.min(x, y);
	}
	
	onEmailAdd(newEmail) {
		if (newEmail === {}) {
            return;
		}
		
		newEmail.user_id = this.currentUser.id;

		this.createSendEmail(newEmail);

	}

	onEmailUpdate(updateEmail) {
		console.log("UPdate");
		this.updateSendEmail(updateEmail);
	}
}
