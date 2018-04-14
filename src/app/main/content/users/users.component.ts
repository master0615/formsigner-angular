import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { UserProfile, DefaultProfilePhoto } from '../models/profile.models';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { CustomToastrService } from '../../../shared/services/custom-toastr.service';
import { CustomLoadingService } from '../../../shared/services/custom-loading.service';

import { TokenStorage } from '../../../shared/authentication/token-storage.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { UserProfileService } from '../services/userProfile.service';
import { UserFormDialogComponent } from './dialogs/user-form/user-form.component';

import { FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/takeUntil';

import { ConfirmDialogComponent } from '../../../shared/dialog/confirm/confirm-dialog.component';

const DEFAULT_PAGE_SIZE = 5;

@Component({
	selector: 'app-users',
	templateUrl: './users.component.html',
	styleUrls: ['./users.component.scss'],
	encapsulation: ViewEncapsulation.None
})

export class UsersComponent implements OnInit, OnDestroy {
	defaultProfilePhoto = DefaultProfilePhoto;

    users: UserProfile[];
    selectedUsers: UserProfile[] = [];

    pageNumber: number;
    pageSize = DEFAULT_PAGE_SIZE;
    total: number;
	pageLengths = [5, 10, 20, 50, 100];

	filter:string;
	sort:string;
	dir: string;
	searchInput : any;

    loadingIndicator = true;
    reorderable = true;

	dialogRef: any;
	confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
	userFormDialogRef: MatDialogRef<UserFormDialogComponent>;
	
	currentuser:UserProfile;

	@ViewChild(DatatableComponent) table: DatatableComponent

	searchControl = new FormControl();
	componentDestroyed = new Subject(); // Component Destroy
	
	constructor(
		private toastrService  		: CustomToastrService,
		private loadingService 		: CustomLoadingService,
		private userProfileService 	: UserProfileService,
		private tokenStorage 		: TokenStorage,
        public dialog				: MatDialog,
		private router				: Router
	) { 
		this.currentuser = this.tokenStorage.getUserInfo();
	}


	ngOnInit() {
		this.getUsers();

		this.searchControl.valueChanges
		.debounceTime(300) 
		.distinctUntilChanged()  
		.takeUntil(this.componentDestroyed)
		.subscribe( filter => { 
			this.filter = filter ? filter : '';
			this.getUsers();
		});
	}

	ngOnDestroy() {
		this.componentDestroyed.next();
		this.componentDestroyed.unsubscribe();
	}

	private getUsers(data = null) {
		const query = {
			page_size: this.pageSize,
			filter: this.filter ? this.filter : '',
			order: this.sort ? this.sort : 'created_at',
			dir: this.dir ? this.dir : 'desc',
			...data
		}
		this.loadingIndicator = true;
		//setTimeout(() => this.loadingService.showLoadingSpinner());

        this.userProfileService.getUsers(query)
            .subscribe(res => {
				this.loadingIndicator = false;
				//this.loadingService.hideLoadingSpinner();	
                this.users = res.data;
                this.pageSize = res.page_size;
                this.pageNumber = res.page_number;
                this.total = res.total_counts;

            }, err => {
				this.loadingIndicator = false;
				//this.loadingService.hideLoadingSpinner();	
				this.toastrService.showError(err.error.message);
            });
	}

	private createUser(userProfile: UserProfile) {
		setTimeout(() => this.loadingService.showLoadingSpinner());
        this.userProfileService.creatUserProfile(userProfile)
            .subscribe(res => {
				this.loadingService.hideLoadingSpinner();	
				this.toastrService.showSuccess("The profile of user was created successfully!");
				//this.user = res.data;
				this.getUsers();
            }, err => {
				this.loadingService.hideLoadingSpinner();	
				this.toastrService.showErrorMsg(err.errors);
            });
	}

	private deleteUser(userId: number) {

		setTimeout(() => this.loadingService.showLoadingSpinner());
        this.userProfileService.deleteUserProfile(userId)
            .subscribe(res => {
				this.loadingService.hideLoadingSpinner();	
				this.toastrService.showSuccess("The profile of user was deleted successfully!");
				//this.user = res.data;
				this.getUsers();
            }, err => {
				this.loadingService.hideLoadingSpinner();	
				this.toastrService.showErrorMsg(err.errors);
            });
	}


	
    newUser() {
        this.userFormDialogRef = this.dialog.open(UserFormDialogComponent, {
            //panelClass: 'user-form-dialog',
        });

        this.userFormDialogRef.afterClosed().subscribe(user => {
                if (!user) {
                    return;
                }
				this.createUser(user);
            });
	}

	isExistProfilePhoto(user:UserProfile) {
		return user && user.thumb;
	}

	onSelect({ selected }) {
        this.selectedUsers.splice(0, this.selectedUsers.length);
        this.selectedUsers.push(...selected);
	}

	onActivate(evt) {
	}
	
	onSort(event) {
		this.sort = event.sorts[0].prop;
		this.dir = event.sorts[0].dir;
		this.getUsers();
	}
	
    setPage(pageInfo) {
		this.pageNumber = pageInfo.page - 1;
        this.getUsers({
            page_number: this.pageNumber
        });
	}
	
    onPageLengthChange(value) {
        this.getUsers({page_size: value});
	}
	
    updateFilter(term: string): void {
		this.getUsers();
    }

	editUser(user: UserProfile) {
		this.router.navigate(['main/profile',user.id]);		
	}

	removeUser(user: UserProfile) {
        this.confirmDialogRef = this.dialog.open(ConfirmDialogComponent, {
            disableClose: false
		});
		this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';

        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.deleteUser(user.id);
            }
        });	
	}

	min(x, y) {
        return Math.min(x, y);
    }
}
