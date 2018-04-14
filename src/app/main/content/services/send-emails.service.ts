import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { SendEmail } from '../models/send-email.models';
import { environment } from '../../../../environments/environment.prod';

const BASE_URL = `${environment.apiUrl}`;
const USERS_URL = `${BASE_URL}/users`;
const SEND_EMAILS_URL = `${BASE_URL}/send_emails`;

@Injectable()
export class SendEmailsService {
    private httpOptions = {
        headers: new HttpHeaders({ 'Content-Type' : 'application/json'  }),
      };
      
    constructor(
        private http: HttpClient) {

    }
    getAllEmails() : Observable<any> {
        const url = `${BASE_URL}/emails`;
        return this.http.get(url)
            .catch(this.handleError);
    }
    
    getAllSendEmails(userId: number) : Observable<any> {
        const url = `${USERS_URL}/${userId}/all_send_emails`;
        return this.http.get(url)
            .catch(this.handleError);
    }

    getSendEmails(userId: number, data = null): Observable<any> {
        const url = `${USERS_URL}/${userId}/send_emails`;
        return this.http.get(url, {params: data})
            .catch(this.handleError);
    }

    createSendEmail(sendEmail: SendEmail): Observable<any> {
        const url = `${SEND_EMAILS_URL}`;
        return this.http.post(url, sendEmail)
            .catch(this.handleError);
    }

    updateSendEmail(sendEmail: SendEmail): Observable<any> {
        const url = `${SEND_EMAILS_URL}/${sendEmail.id}`;
        return this.http.put(url, sendEmail)
            .catch(this.handleError);
    }
    
    deleteSendEmail(id: number): Observable<any> {
        const url = `${SEND_EMAILS_URL}/${id}`;
        return this.http.delete(url)
            .catch(this.handleError);
    }    

    sendTemplate(data: any) {
        const url = `${BASE_URL}/emails/send`;
        return this.http.post(url, data)
            .catch(this.handleError);
    }

    private handleError(error: Response | any) {
        return Observable.throw(error);
    }    
}
