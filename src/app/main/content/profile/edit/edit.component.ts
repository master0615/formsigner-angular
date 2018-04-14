import { Component, OnInit, Input, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup,FormControl, Validators } from '@angular/forms';
import { CustomToastrService } from '../../../../shared/services/custom-toastr.service';
import { CustomLoadingService } from '../../../../shared/services/custom-loading.service';
import { UserProfileService } from '../../services/userProfile.service';
import { UserProfile, UserRoles, UserActives, USER_ROLES, USER_ACTIVIES } from '../../models/profile.models';
import { CustomValidators } from '../../../../shared/validators/custom-validators';
import { TokenStorage } from '../../../../shared/authentication/token-storage.service';
import {Location} from '@angular/common';
@Component({
	selector: 'app-profile-edit',
	templateUrl: './edit.component.html',
	styleUrls: ['./edit.component.scss']
})
export class ProfileEditComponent implements OnInit, OnChanges {
	USER_ROLES = USER_ROLES;
	USER_ACTIVIES = USER_ACTIVIES;

	@Input() userId;
	userProfile: UserProfile;
	profileForm: FormGroup;
	isSetPassword: boolean = false;
	currentUser: UserProfile;

	@ViewChild('role_select_el') roleSelectEl;
	@ViewChild('active_select_el') activeSelectEl;

	constructor(
		private _location			: Location,
		private formBuilder			: FormBuilder,
		private toastrService  		: CustomToastrService,
		private loadingService 		: CustomLoadingService,
		private tokenStorage		: TokenStorage,
		private userProfileService 	: UserProfileService
	) { 
		this.currentUser = tokenStorage.getUserInfo();
	}

	ngOnInit() {
		this.profileForm = new FormGroup({
            first_name   	: new FormControl('', [Validators.required]),
			last_name	 	: new FormControl('', [Validators.required]),
			email		 	: new FormControl('', [Validators.required, Validators.email]),
			role         	: new FormControl(''),
			active       	: new FormControl(''),
			password        : new FormControl('*********', [Validators.required, Validators.minLength(8)]),
			new_password    : new FormControl('*********', [Validators.required, Validators.minLength(8)]),
			confirm_password: new FormControl('*********', [Validators.required, Validators.minLength(8)]),
			is_set_password : new FormControl(false)	
		}, [CustomValidators.MatchPasswordForUpdateuser]);

		this.getUserProfile(this.userId);
	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes['userId']) {
			this.userId = changes['userId'].currentValue;
			this.getUserProfile(this.userId);
		}
	}

	getUserProfile(userId:number) {
		setTimeout(() => this.loadingService.showLoadingSpinner());
        this.userProfileService.getUserProfile(userId)
            .subscribe(res => {
				this.loadingService.hideLoadingSpinner();	
				this.userProfile = res;
				this.setUserProfileToFormValues(this.userProfile);
            }, err => {
				this.loadingService.hideLoadingSpinner();	
				this.toastrService.showError(err.error.message);
				this.userProfile = null;				
            });		
	}
	
	updateUserProfile(userProfile: UserProfile) {
		setTimeout(() => this.loadingService.showLoadingSpinner());
        this.userProfileService.updateUserProfile(userProfile)
            .subscribe(res => {
				this.loadingService.hideLoadingSpinner();	
				this.toastrService.showSuccess("The profile of user was updated successfully!");
				this.userProfile = res.data;
				this.setUserProfileToFormValues(this.userProfile);
            }, err => {
				this.loadingService.hideLoadingSpinner();	
				this.toastrService.showErrorMsg(err.error);
		
            });			
	}

	setUserProfileToFormValues(userProfile: UserProfile){
		if (!userProfile) return;
		this.profileForm.patchValue({
			first_name: userProfile.first_name,
			last_name: userProfile.last_name,
			email: userProfile.email,
			role : userProfile.role,
			active: userProfile.active,
		});
		//this.profileForm.controls['role'].setValue(userProfile.role, {onlySelf: true});
		//this.profileForm.controls['active'].setValue(userProfile.active, {onlySelf: true});
	}

	setPassword() {
    this.isSetPassword = !this.isSetPassword;
		if (!this.isSetPassword) {
			this.profileForm.patchValue({
				password: '*********',
				new_password: '*********',
				confirm_password: '*********'
			});
		}else{
			this.profileForm.patchValue({
				password: '',
				new_password: '',
				confirm_password: ''
			});     
		}
	}

	onSubmit() {

		let new_profile: any = {...this.profileForm.value};

		new_profile.id = this.userProfile.id;

		if (!new_profile.is_set_password) {
			delete new_profile['password'];
			delete new_profile['new_password'];
		}

		if (this.isCurrentUser(new_profile)) {
			delete new_profile['role'];
			delete new_profile['active'];
		}
		this.updateUserProfile(new_profile);
	}

	back() {
		this._location.back();
	}

	isCurrentUser(userProfile: UserProfile) {
		if (!userProfile) return false;
		return this.currentUser.id == userProfile.id;
	}
}
