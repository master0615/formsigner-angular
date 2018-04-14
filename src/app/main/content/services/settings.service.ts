import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { environment } from '../../../../environments/environment';
import { TokenStorage } from '../../../shared/authentication/token-storage.service';

const BASE_URL = `${environment.apiUrl}`;
const SETTINGS_URL = `${BASE_URL}/settings`;


@Injectable()
export class SettingsService {
    private httpOptions = {
        headers: new HttpHeaders({ 'Content-Type' : 'application/json'  }),
      };
      
    constructor(
        private http: HttpClient,
        private tokenStorage: TokenStorage) {

    }


    getCurrentUserDrawSignature() {
        let userInformation = this.tokenStorage.getUserInfo();
        return this.getDrawSignature(parseInt(userInformation.id));
    }

    setCurrentuserDrawSignature(signature: any) {
        let userInformation = this.tokenStorage.getUserInfo();
        return this.setDrawSignature(parseInt(userInformation.id), signature);
    }

    getCurrentUserDrawInitial() {
        let userInformation = this.tokenStorage.getUserInfo();
        return this.getDrawInitial(parseInt(userInformation.id));
    }

    setCurrentuserDrawInitial(signature: any) {
        let userInformation = this.tokenStorage.getUserInfo();
        return this.setDrawInitial(parseInt(userInformation.id), signature);
    } 


    getDrawSignature(userId: number) : Observable<any> {
        const url = `${SETTINGS_URL}/${userId}/sign`;
        return this.http.get(url)
            .catch(this.handleError);
    }

    setDrawSignature(userId: number, signature: any) : Observable<any> {
        const url = `${SETTINGS_URL}/${userId}/sign`;
        return this.http.post(url, signature)
            .catch(this.handleError);
    }

    getDrawInitial(userId: number) : Observable<any> {
        const url = `${SETTINGS_URL}/${userId}/initial`;
        return this.http.get(url)
            .catch(this.handleError);
    }
    
    setDrawInitial(userId: number, signature: any) : Observable<any> {
        const url = `${SETTINGS_URL}/${userId}/initial`;
        return this.http.post(url, signature)
            .catch(this.handleError);
    }
      

    private handleError(error: Response | any) {
        return Observable.throw(error);
    }    
}
