import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { environment } from '../../../../environments/environment';
import { TemplateForm, TemplateFormField, TemplateFormFile, FormFieldType } from '../models/template.models';

const BASE_URL = `${environment.apiUrl}`;
const FILES_URL = `${BASE_URL}/files`;
const FORMS_URL = `${BASE_URL}/forms`;

@Injectable()
export class FormService {
    private httpOptions = {
        headers: new HttpHeaders({'Content-Type' : 'application/json'}),
      };
      
    constructor(private http: HttpClient) { }




    saveEntry(data:any): Observable<any>{
        const url =`${FORMS_URL}`
        return this.http.post(url, data)
        .catch(this.handleError);       
    }

    private handleError(error: Response | any) {
        return Observable.throw(error);
    }
}
