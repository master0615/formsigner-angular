import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { AuthenticationService } from '../../shared/authentication';
import { TokenStorage } from '../../shared/authentication/token-storage.service';
import { MainMenuModel } from './menu.model';
import { CustomLoadingService } from '../../shared/services/custom-loading.service';
import { UserProfileService } from '../content/services/userProfile.service';
import { UserProfilePhoto, DefaultProfilePhoto } from '../content/models/profile.models';
import { CustomToastrService } from '../../shared/services/custom-toastr.service';
import { Subject } from 'rxjs/Subject';


@Component({
    selector   : 'app-main-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls  : ['./toolbar.component.scss']
})

export class MainToolbarComponent implements OnInit, OnDestroy {
    defaultProfilePhoto = DefaultProfilePhoto;
    currentUser: any;
    menus: any[];
    selectedMenu:any;
    currentUserPhoto: UserProfilePhoto;

    private componetDestroyed = new Subject();  

    constructor(
        private router              : Router,
        private authService         : AuthenticationService,        
        private tokenStorage        : TokenStorage,
        private toastrService  		: CustomToastrService,
		private loadingService 		: CustomLoadingService,
		private userProfileService 	: UserProfileService

    )
    {
        this.currentUser = this.tokenStorage.getUserInfo();

        this.userProfileService.getChangedCurrentuserProfilePhoto().takeUntil(this.componetDestroyed).subscribe( 
            userProfilePhoto => { 
                this.currentUserPhoto = userProfilePhoto;
            }); 
    }

    ngOnInit() {
        this.menus = new MainMenuModel().model;
        this.getCurrentUserPhoto();

    }

    ngOnDestroy() {
        this.componetDestroyed.next();
        this.componetDestroyed.unsubscribe(); 
    }

    getCurrentUserPhoto() {
		setTimeout(() => this.loadingService.showLoadingSpinner());
		if(this.currentUser) {
            this.userProfileService.getProfilePhoto(this.currentUser.id)
              .subscribe(res => {
                  this.loadingService.hideLoadingSpinner();
                  this.currentUserPhoto = res;
              }, err => {
                  this.loadingService.hideLoadingSpinner();
                  this.toastrService.showError(err.error.message);
                  this.currentUserPhoto = null;
              });
        } else {
            setTimeout(() => this.loadingService.hideLoadingSpinner());
        }

	}

    logout() {
        this.authService.logout();
        
    }

    clickMenu(menu:any) {
        this.selectedMenu = menu;
    }

    profile() {
        this.router.navigate(['main/profile',this.currentUser.id]);       
    }

    isExistProfilePhoto() {
		return this.currentUserPhoto && this.currentUserPhoto.thumb;
    }
    
    isShowMenu(menu: any) {
        if(this.currentUser == null) {
           return false;
        } else {
            return menu.id != 'users' || this.currentUser.role == 'owner';
        }
    }
}
