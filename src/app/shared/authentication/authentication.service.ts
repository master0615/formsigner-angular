import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/switchMap';
import {AuthService} from 'ngx-auth';

import {TokenStorage} from './token-storage.service';
import {environment} from '../../../environments/environment';
import { CustomLoadingService } from '../services/custom-loading.service';


export interface AccessData {
  access_token: string;
  refresh_token: string;
  user: any;
  message: string;
  status: string;

}
export const API_URL = environment.apiUrl;
const AUTH_URL = `${API_URL}/auth`;
const OAUTH_URL = environment.OAuthUrl;

@Injectable()
export class AuthenticationService implements AuthService {
  public windowHandle;
  public ourcode;
  public accesstoken;
  public interval;

  constructor(private http: HttpClient,
              private tokenStorage: TokenStorage,
              private router: Router,
              private loadingService : CustomLoadingService) {
  }

  /**
   * Check, if user already authorized.
   * @description Should return Observable with true or false values
   * @returns {Observable<boolean>}
   * @memberOf AuthService
   */
  public isAuthorized(): Observable<boolean> {
    return this.tokenStorage
      .getAccessToken()
      .map(token => !!token);
  }

  /**
   * Get access token
   * @description Should return access token in Observable from e.g.
   * localStorage
   * @returns {Observable<string>}
   */
  public getAccessToken(): Observable<string> {
    return this.tokenStorage.getAccessToken();
  }

  /**
   * Function, that should perform refresh token verifyTokenRequest
   * @description Should be successfully completed so interceptor
   * can execute pending requests or retry original one
   * @returns {Observable<any>}
   */
  public refreshToken(): Observable<any> {
    return this.tokenStorage
      .getRefreshToken()
      .switchMap((refreshToken: string) => {
        return this.http.post(AUTH_URL + '/refresh', {refreshToken: refreshToken});
      })
      .map((tokens) => {
        console.log(tokens);
        this.saveAccessData.bind(tokens);
      })
      .catch((err) => {
        this.logout();
        console.log(err);
        return Observable.throw(err);
      });
    /*const refreshToken: string = localStorage.getItem('refreshToken');

     return this.http.post(AUTH_URL + '/refresh', { refreshToken })
     .do(this.saveAccessData.bind(this))
     .catch( this.handleError ); */
  }

  /**
   * Function, checks response of failed request to determine,
   * whether token be refreshed or not.
   * @description Essentialy checks status
   * @param {Response} response
   * @returns {boolean}
   */
  public refreshShouldHappen(response: HttpErrorResponse): boolean {
    return response.status === 401
  }

  /**
   * Verify that outgoing request is refresh-token,
   * so interceptor won't intercept this request
   * @param {string} url
   * @returns {boolean}
   */
  public verifyTokenRequest(url: string): boolean {
    return url.endsWith('/refresh');
  }

  /**
   * EXTRA AUTH METHODS
   */

  public loginStaffConnect() {
    this.loadingService.showLoadingSpinner();
    this.windowHandle = window.open(OAUTH_URL + '/auth/staffconnect', "Login", 'width=560,height=340,toolbar=0,menubar=0,location=0');
    if (window.focus) {
      this.windowHandle
    }

    var href;

    this.interval = setInterval(() => {
      href = this.windowHandle.location.href;
      console.log(href);
      if (href != 'about:blank' && href) {
        this.windowHandle.close();
        var extractedcode = href.split('=');

        // StaffConnect access code
        this.ourcode = extractedcode[1];

        this.tokenStorage
          .setAccessToken(this.ourcode);

        this.getUserDataByToken(this.ourcode).subscribe(
          res => {
            this.tokenStorage.setAccessUserInfo(res);
            //this.loadingService.hideLoadingSpinner();
            this.router.navigate(['/main/templates/create'], { queryParamsHandling: "merge" });
          });

        clearInterval(this.interval);
      } else {
        console.log('Login in progress');
      }

    }, 300);
  }

  public findGetParameter(parameterName) {
    var result = null,
      tmp = [];
    var items = location.search.substr(1).split("&");
    for (var index = 0; index < items.length; index++) {
      tmp = items[index].split("=");
      if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
    }
    return result;
  }

  public loginStaffConnectIframe() {
    this.loadingService.showLoadingSpinner();
    let href;
    let code;
    code = this.findGetParameter('code');
    if(code) {
      this.tokenStorage
        .setAccessToken(code);

      this.getUserDataByToken(code).subscribe(
        res => {
          this.tokenStorage.setAccessUserInfo(res);
         // this.loadingService.hideLoadingSpinner();
       //   this.router.navigate(['/main/templates/create'], { queryParamsHandling: "merge" });
        });
    } else {
      window.location.href = OAUTH_URL + '/auth/staffconnect?redirect=' + window.location.href;
    }
  }

  public getUserDataByToken(token): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };

    return this.http.get(OAUTH_URL + '/user', httpOptions);
  }

  public login(username: string, password: string): Observable<any> {
    return this.http.post(AUTH_URL + '/login', {username, password})
      .map((tokens) => {
        this.saveAccessData(tokens as AccessData);
        return tokens;
      })
      .catch(this.handleError);
  }

  /**
   * Logout
   */
  public async logout() {

    this.http.post(`${AUTH_URL}/logout`, {}).subscribe(res => {
    });
    this.tokenStorage.clear();

    this.router.navigate(['/home/login']);
  }

  //     /**
  //      * Logout
  //      */
  //   public getHeaders(token: string): { [name: string]: string | string[] } {
  //     let headers = { Authorization: token };
  //     return headers;
  //   }

  /**
   * Save access data in the storage
   *
   * @private
   * @param {AccessData} data
   */
  private saveAccessData({access_token, refresh_token, user, message}: AccessData) {

    this.tokenStorage
      .setAccessToken(access_token)
      .setRefreshToken(refresh_token)
      .setAccessUserInfo(user);
  }

  private handleError(error: Response | any) {
    return Observable.throw(error);
  }
}
