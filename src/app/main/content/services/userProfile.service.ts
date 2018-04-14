import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { environment } from '../../../../environments/environment';
import { UserProfile, UserProfilePhoto } from '../models/profile.models';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs';



const BASE_URL = `${environment.apiUrl}`;
const USERS_URL = `${BASE_URL}/users`;

@Injectable()
export class UserProfileService {

    private currentProfilePhotoChanged: Subject<any>     = new Subject();

    constructor(private http: HttpClient) { }

    toggleCurrentUserProfilePhoto(userProfilePhoto: UserProfilePhoto) {
        this.currentProfilePhotoChanged.next(userProfilePhoto);
    }

    getChangedCurrentuserProfilePhoto(): Observable<any> {
        return this.currentProfilePhotoChanged.asObservable();
    }

    getAllUsers(): Observable<any> {
        return this.http.get<UserProfile[]>(USERS_URL)
            .catch(this.handleError);
    }

    getAllEmails(): Observable<any> {
        const url = `${USERS_URL}/emails`;
        return this.http.get(url)
            .catch(this.handleError);
    }
    
    getUsers(data = null): Observable<any> {
        return this.http.get(USERS_URL, {params: data})
            .catch(this.handleError);
    }
    
    getUserProfile(id: number): Observable<any> {
		const url = `${USERS_URL}/${id}`;
        return this.http.get(url)
            .catch(this.handleError);
    }

    creatUserProfile(user): Observable<any> {
        return this.http.post(USERS_URL, user)
            .catch(this.handleError);
    }

    updateUserProfile(user: UserProfile): Observable<any> {
		const url = `${USERS_URL}/${user.id}`;			
		return this.http.put(url, user)
			.catch(this.handleError);;
    }

    deleteUserProfile(id: number): Observable<any> {
		const url = `${USERS_URL}/${id}`;	
		return this.http.delete(url)
			.catch(this.handleError);
    }    

    uploadProfilePhoto(userId: number, data: any): Observable<any> {
        const url = `${USERS_URL}/${userId}/photo`;
        return this.http.post(url, data)
            .map( (res:any) => {
                if (res && JSON.stringify(res) != '{}') {
                    res.path = res.path + "?_=" + Date.now();
                    res.thumb = res.thumb + "?_=" + Date.now();
                }
                return res;
            })
            .catch(this.handleError);
    }

    getProfilePhoto(userId: number): Observable<any> {
        const url = `${USERS_URL}/${userId}/photo`;
        return this.http.get(url)
            .map( (res:any) => {
                if (res && JSON.stringify(res) != '{}') {
                    res.path = res.path + "?_=" + Date.now();
                    res.thumb = res.thumb + "?_=" + Date.now();
                }
                return res;
            })
            .catch(this.handleError);
    }

    rotateProfilePhoto(userId: number, degree: number): Observable<any> {
        const url = `${USERS_URL}/${userId}/photo/rotate/${degree}`;
        return this.http.put(url, {})
            .map( (res:any) => {
                res.path = res.path + "?_=" + Date.now();
                res.thumb = res.thumb + "?_=" + Date.now();
                return res;
            })
            .catch(this.handleError);
    }

    deleteProfilePhoto(userId: number): Observable<any> {
        const url = `${USERS_URL}}/${userId}/photo`;
        return this.http.delete(url)
            .catch(this.handleError);
    };

    private handleError(error: Response | any) {
        return Observable.throw(error);
    }
}
