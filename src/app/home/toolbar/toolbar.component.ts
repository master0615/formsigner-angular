import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { AuthenticationService } from '../../shared/authentication';
import { TokenStorage } from '../../shared/authentication/token-storage.service';
import { HomeMenuModel } from './menu.model';


@Component({
    selector   : 'app-home-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls  : ['./toolbar.component.scss']
})

export class HomeToolbarComponent implements OnInit
{

    user: any;
    menus: any[];
    selectedMenu:any;
    constructor(
        private router: Router,
        private authService: AuthenticationService,
        private tokenStorage: TokenStorage,

    )
    {
    }

    ngOnInit() {
        this.user = this.tokenStorage.getUserInfo();
        this.menus = new HomeMenuModel().model;
    }


    logout() {
        this.authService.logout();
        
    }

    clickMenu(menu:any) {
        this.selectedMenu = menu;
    }
}
