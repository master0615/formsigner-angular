import { Component, OnInit } from '@angular/core';
import { CustomToastrService } from '../../../shared/services/custom-toastr.service';
import { CustomLoadingService } from '../../../shared/services/custom-loading.service';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { UserProfile } from '../models/profile.models';
import { UserProfileService } from '../services/userProfile.service';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

	userId: number;
	UserProfile: UserProfile;
	constructor(
		private toastrService  		: CustomToastrService,
		private loadingService 		: CustomLoadingService,
		private userProfileService 	: UserProfileService,
		public dialog				: MatDialog,
		private route				: ActivatedRoute
	) { 
		this.route.params.pipe().subscribe( params => {
			this.userId = params.id;
			this.getUserProfile( this.userId );
		} );
	}

	ngOnInit() {
	}

	getUserProfile(userId:number) {
		setTimeout(() => this.loadingService.showLoadingSpinner());
        this.userProfileService.getUserProfile(userId)
            .subscribe(res => {
				this.loadingService.hideLoadingSpinner();	
				this.UserProfile = res;
            }, err => {
				this.loadingService.hideLoadingSpinner();	
				this.toastrService.showError(err.error.message);
				this.UserProfile = null;				
            });		
	}
}
