import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';


const BASE_URL = `${environment.apiUrl}`;
const FORMS_URL = `${BASE_URL}/forms`;
const SHARED_FORMS_URL = `${BASE_URL}/shared/forms`;

@Injectable()
export class HomeService {

    constructor(private http: HttpClient) { }

    getAllForms(): Observable<any> {
        const url = `${FORMS_URL}`;
        return this.http.get(url)
            .catch(this.handleError);
    }

    getSharedForms(data=null): Observable<any> {
        const url = `${SHARED_FORMS_URL}`;
        return this.http.get(url, {params: data})
            .catch(this.handleError);
    }

    getShareForm(formId: number): Observable<any> {
        const url = `${SHARED_FORMS_URL}/${formId}`;
        return this.http.get(url)
            .catch(this.handleError);
    }

    private handleError(error: Response | any) {
        return Observable.throw(error);
    }
}
