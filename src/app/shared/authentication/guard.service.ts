import {Injectable} from '@angular/core';
import {Router, CanActivate} from '@angular/router';
import {AuthenticationService} from './authentication.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthenticationService,
              private router: Router) {
  }

  canActivate() {
    let provider = this.findGetParameter('provider');
    let code = this.findGetParameter('code');
    let type = this.findGetParameter('type');
    let userAuth = this.authService.isAuthorized();
    if (provider == 'staffconnect') {
      // If there is iframe parameter, initiate login without popup, otherwise open with popup
      if(type == 'iframe') {
        this.authService.loginStaffConnectIframe();
        return true;
      } else {
        this.authService.loginStaffConnect();
      }
    } else if (code != null) {
      this.authService.loginStaffConnectIframe();
    } else {
      let userAuth = this.authService.isAuthorized();
      if (userAuth) {
        return true;
      } else {
        this.router.navigate(['/home/login']);
      }
    }
  }

  findGetParameter(parameterName) {
    var result = null,
      tmp = [];
    var items = location.search.substr(1).split("&");
    for (var index = 0; index < items.length; index++) {
      tmp = items[index].split("=");
      if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
    }
    return result;
  }
}