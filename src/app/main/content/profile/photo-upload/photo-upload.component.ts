import { Component, OnInit, Input, ChangeDetectorRef, OnChanges, SimpleChanges } from '@angular/core';
import { CustomLoadingService } from '../../../../shared/services/custom-loading.service';
import { CustomToastrService } from '../../../../shared/services/custom-toastr.service';
import { UserProfileService } from '../../services/userProfile.service';
import { UserProfilePhoto, DefaultProfilePhoto } from '../../models/profile.models';
import { TokenStorage } from '../../../../shared/authentication/token-storage.service';

@Component({
	selector: 'app-profile-photo-upload',
	templateUrl: './photo-upload.component.html',
	styleUrls: ['./photo-upload.component.scss']
})
export class ProfilePhotoUploadComponent implements OnInit, OnChanges {
	@Input() userId;
	userProfilePhoto: UserProfilePhoto;
	defaultProfilePhoto = DefaultProfilePhoto;
	constructor(
		private tokenStorage		: TokenStorage,
		private toastrService  		: CustomToastrService,
		private loadingService 		: CustomLoadingService,
		private userProfileService 	: UserProfileService
	) { }

	ngOnInit() {
		//this.getProfilePhoto(this.userId);
	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes['userId']) {
			this.userId = changes['userId'].currentValue;
			this.getProfilePhoto(this.userId);
		}
	}

	getProfilePhoto(userId: number) {
		setTimeout(() => this.loadingService.showLoadingSpinner());
        this.userProfileService.getProfilePhoto(userId)
            .subscribe(res => {
				this.loadingService.hideLoadingSpinner();	
				this.userProfilePhoto = res;
            }, err => {
				this.loadingService.hideLoadingSpinner();	
				this.toastrService.showError(err.error.message);
				this.userProfilePhoto = null;			
            });	
	}

	uploadProfilePhoto(userId: number, data: any) {
		setTimeout(() => this.loadingService.showLoadingSpinner());
        this.userProfileService.uploadProfilePhoto(userId, data)
            .subscribe(res => {
				this.loadingService.hideLoadingSpinner();	
				this.userProfilePhoto = res;
				this.toggleCurrentUserPhoto(this.userProfilePhoto);
            }, err => {
				this.loadingService.hideLoadingSpinner();	
				this.toastrService.showError(err.error.message);
				//this.userProfilePhoto = null;			
            });	
	}

	roateProfilePhoto(userId:number, degree: number) {
		setTimeout(() => this.loadingService.showLoadingSpinner());
        this.userProfileService.rotateProfilePhoto(userId, degree)
            .subscribe(res => {
				this.loadingService.hideLoadingSpinner();	
				this.userProfilePhoto = res;
				this.toggleCurrentUserPhoto(this.userProfilePhoto);
            }, err => {
				this.loadingService.hideLoadingSpinner();	
				this.toastrService.showError(err.error.message);
				//this.userProfilePhoto = null;			
            });		
	}

	onUploadPhoto(event) {
		const files = event.target.files;
		
		let formData = new FormData();

		formData.append('photo', files[0], files[0].name);
		formData.append('name', files[0].name);

		this.uploadProfilePhoto(this.userId, formData);
	}

	rotateLeft() {
		this.roateProfilePhoto(this.userId, 90);
	}

	rotateRight() {
		this.roateProfilePhoto(this.userId, 270);
	}

	isExistProfilePhoto() {
		return this.userProfilePhoto && this.userProfilePhoto.path;
	}

	toggleCurrentUserPhoto(userProfilePhoto : UserProfilePhoto) {
		let currentUser = this.tokenStorage.getUserInfo();
		if (currentUser.id == userProfilePhoto.user_id) {
			this.userProfileService.toggleCurrentUserProfilePhoto(userProfilePhoto);
		}
	}
}
