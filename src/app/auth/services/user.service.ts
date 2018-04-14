import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { environment } from '../../../environments/environment';
import { User } from '../models/user';

const BASE_URL = `${environment.apiUrl}`;
const USERS_URL = `${BASE_URL}/users`;

@Injectable()
export class UserService {

    constructor(private http: HttpClient) { }

    getAllUsers(): Observable<any> {
        return this.http.get<User[]>(USERS_URL)
            .catch(this.handleError);
    }

    getUser(id: number): Observable<any> {
				const url = `${USERS_URL}/${id}`;
        return this.http.get(url)
            .catch(this.handleError);
    }

    createUser(user): Observable<any> {
        return this.http.post(USERS_URL, user)
            .catch(this.handleError);
    }

    updateUser(user: User): Observable<any> {
        const url = `${USERS_URL}/${user.id}`;			
        return this.http.put(url, user)
            .catch(this.handleError);;
    }

    deleteUser(id: number): Observable<any> {
				const url = `${USERS_URL}/${id}`;	
				return this.http.delete(url)
							.catch(this.handleError);;
    }    

    private handleError(error: Response | any) {
        return Observable.throw(error);
    }
}
