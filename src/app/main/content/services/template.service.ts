import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { environment } from '../../../../environments/environment';
import { TemplateForm, TemplateFormField, TemplateFormFile, FormFieldType } from '../models/template.models';

const BASE_URL = `${environment.apiUrl}`;
const FILES_URL = `${BASE_URL}/files`;
const FORMS_URL = `${BASE_URL}/forms`;
const FIELDS_URL = `${BASE_URL}/fields`;
const USERS_URL = `${BASE_URL}/users`

@Injectable()
export class TemplateService {
    private httpOptions = {
        headers: new HttpHeaders({'Content-Type' : 'application/json'}),
      };
      
    constructor(private http: HttpClient) { }
    
	unselectRadioGroup(form: TemplateForm, selectedField: TemplateFormField){
		form.files.forEach( file => {
			file.fields.forEach ( field => {
				if ( field.type == FormFieldType.DATA_RADIO && 
					 field.group == selectedField.group && field != selectedField ){
						field.value = '0';
				}
			});
		});
	}

	unselectCheckGroup(form: TemplateForm, selectedField: TemplateFormField){
		form.files.forEach( file => {
			file.fields.forEach ( field => {
				if ( field.type == FormFieldType.DATA_CHECK_BOX && 
					 field.group == selectedField.group && field != selectedField ){
						field.value = false;
				}
			});
		});
	}

	setGroupsToForm(templateForm: TemplateForm) {
		templateForm.checkbox_groups = [];
		templateForm.radio_groups = [];
		templateForm.files.forEach( file => {
			file.fields.forEach ( field => {
				if ( field.group && field.group != '' ){
					if ( field.type == FormFieldType.DATA_CHECK_BOX) {
						let index = templateForm.checkbox_groups.findIndex( g => g == field.group );
                        if (index >= 0) templateForm.checkbox_groups.push( field.group );

					}else if ( field.type == FormFieldType.DATA_RADIO ) {
						let index = templateForm.radio_groups.findIndex( g => g == field.group );
						if (index >= 0) templateForm.radio_groups.push( field.group );
					}
				}else {
					field.group = '';
                }
                
                if ( field.type == FormFieldType.DATA_CHECK_BOX) {
                    field.value = parseInt(field.value) ? true : false;
                }
			});
		});		
	}

    getFormFiles(formId:number): Observable<any>{
        const url =`${FORMS_URL}/${formId}/files`;
        return this.http.get(url)
            .catch(this.handleError);
    }
  
    createFile(file:TemplateFormFile): Observable<any>{
        return this.http.post(FILES_URL, file)
        .catch(this.handleError);       
    }

    updateFile(file:TemplateFormFile): Observable<any>{
        const url =`${FILES_URL}/${file.id}`
        return this.http.put(url, file)
        .catch(this.handleError);          
    }

    deleteFile(id: number): Observable<any> {
		const url = `${FILES_URL}/${id}`;	
		return this.http.delete(url)
			.catch(this.handleError);;
    }
    deleteFieldsOfFile(fileId:number){
        const url =`${FILES_URL}/${fileId}/fields`
        return this.http.delete(url)
        .catch(this.handleError);    
    }

    getAllForms(): Observable<any> {
        const url =`${FORMS_URL}`
        return this.http.get(url)
            .catch(this.handleError);
    }

    getSharedForms(): Observable<any> {
        const url =`${FORMS_URL}/shared`
        return this.http.get(url)
            .catch(this.handleError);
    }

    getAvailableForms(userId:number, data=null): Observable<any> {
        const url =`${USERS_URL}/${userId}/forms`
        return this.http.get(url, {params: data})
            .catch(this.handleError);
    }

    getForm(id:number): Observable<any>{
        const url =`${FORMS_URL}/${id}`
        return this.http.get(url)
            .map( (res: any) => {
                this.setGroupsToForm( res );
                return res; 
            })
            .catch(this.handleError);

    }

    createForm(data:any): Observable<any>{
        const url =`${FORMS_URL}`
        return this.http.post(url, data)
        .catch(this.handleError);       
    }

    uploadFiles(formId:number, data): Observable<any> {
        const url = `${FORMS_URL}/${formId}/files`;
        return this.http.post(url, data)
            .catch(this.handleError);
    }

    updateForm(form:TemplateForm): Observable<any>{
        const url =`${FORMS_URL}/${form.id}`
        return this.http.put(url, form)
        .map( (res: any) => {
            this.setGroupsToForm( res );
            return res; })
        .catch(this.handleError);          
    }

    deleteForm(id: number): Observable<any> {
		const url = `${FORMS_URL}/${id}`;	
		return this.http.delete(url)
			.catch(this.handleError);
    }    

    getFormFields(formId: number): Observable<any>{
        const url =`${FORMS_URL}/${formId}/fields`
        return this.http.get(url)
            .catch(this.handleError);       
    }

    createField(field: TemplateFormField): Observable<any>{
        const url =`${FIELDS_URL}`
        return this.http.post(url, field)
        .catch(this.handleError);      
    }

    updateField(field: TemplateFormField): Observable<any>{
        const url =`${FIELDS_URL}/${field.id}`
        return this.http.put(url, field)
        .catch(this.handleError);      
    }
    
    deleteField(id:number){
        const url =`${FIELDS_URL}/${id}`
        return this.http.delete(url)
        .catch(this.handleError);    
    }


    private handleError(error: Response | any) {
        return Observable.throw(error);
    }
}
