import { Component, OnInit, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Location} from '@angular/common';
import { MatDialogRef } from '@angular/material';
import { UploadEvent, UploadFile } from 'ngx-file-drop';

import * as _ from 'lodash';
import { PdfHandlerService } from '../../services/pdf-handler.service';
import { CustomToastrService } from '../../../../shared/services/custom-toastr.service';
import { CustomLoadingService } from '../../../../shared/services/custom-loading.service';
import { TemplateService } from '../../services/template.service';
import { Router } from '@angular/router';
import { TokenStorage } from '../../../../shared/authentication/token-storage.service';




@Component({
    selector   : 'app-templates-create',
    templateUrl: './create.component.html',
    styleUrls  : ['./create.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class TemplatesCreateComponent implements OnInit
{
    public fileType: string;
    public files: any[] = [];
    public imgSrc:string[];
    filesNameStr = '';
    userInformation:any;
    
    form: FormGroup;

    loaded: boolean = false;
    imageLoaded: boolean = false;
    public imgPattern = /image-*/;

    constructor(
        private _location           : Location,
        private formBuilder         : FormBuilder,
        private pdfHandlerService   : PdfHandlerService,
        private templateService     : TemplateService,
		private toastrService  	    : CustomToastrService,
        private loadingService 	    : CustomLoadingService,
        private tokenStorage 	    : TokenStorage,
        private router			    : Router
    )
    {
        this.userInformation = this.tokenStorage.getUserInfo();
    }

    ngOnInit()
    {
        this.form = this.formBuilder.group({
            name        : ['', [Validators.required]],
            description : ['', []]
        });        
    }


    private createForm(data:any){
		setTimeout(() => this.loadingService.showLoadingSpinner());

        this.templateService.createForm(data).subscribe(
            res => {
				this.loadingService.hideLoadingSpinner();					
				//this.toastrService.showSucess(res.message);
				const savedTemplate = res;					
				this.router.navigate(['main/templates/edit',savedTemplate.id]);
            },
            err => {
				this.loadingService.hideLoadingSpinner();	
				this.toastrService.showError(err.error.message);
            });		
    }
    
    onDrop(event) {     
    }

    clickImage(file, event){
        event.stopPropagation();
    }
    onUploadFiles(event) {
        //this.files=[];
        debugger;
        var files = event.dataTransfer ? event.dataTransfer.files : event.target.files;
        this.validateFiles(files);
    }


    validateFiles(files) {
        //this.files = [];
        setTimeout(() => this.loadingService.showLoadingSpinner());
        let acceptedFiles =[];
        if (files && files.length > 0) {
            for (const file of files) {
                if (!file.type.match(this.imgPattern) && file.type != 'application/pdf') {
                    this.toastrService.showWarning(`${file.name} is invalid File!`);
                }else{
                    acceptedFiles.push(file);
                }
            }
        } 

        if ( acceptedFiles.length == 0) {
            this.toastrService.showError("No uploaded files!");
            this.filesNameStr = '';            
        }else{
            let filesNames:string[]=[];
            acceptedFiles.forEach(file=> { filesNames.push(file.name)});
            this.filesNameStr = filesNames.join(",");

            let index = 0;
            for (let file of acceptedFiles){
                this.loaded = false;
                let reader = new FileReader();
                if (file.type.match(this.imgPattern)) {
                    reader.onload = () => {
                        var img = new Image();

                        file.imgSrc = reader.result;
                        img.src = reader.result;
                        file.width = img.width; 
                        file.height = img.height;
                        file.pageNum = 1;
                        this.files.push(file);

                        if (++index == acceptedFiles.length) {
                            this.loadingService.hideLoadingSpinner();
                        }
                    };


                }else if (file.type == 'application/pdf') {

                    let pagesNum: number;
                    let pdfImgs: any;
                    reader.onload = () => {
                        this.pdfHandlerService.setPdfDocObjects(reader.result).then(
                            pdfImages => {
                                pdfImgs  = pdfImages;
                                for (let i = 0; i< pdfImgs.length; i++ ){
                                    let pdfImageFile:any = this.pdfHandlerService.b64toFile(pdfImgs[i].src, file.name + "-" + (i + 1) );
                                    pdfImageFile.imgSrc = pdfImgs[i].src;
                                    pdfImageFile.width = pdfImgs[i].width;
                                    pdfImageFile.height = pdfImgs[i].height;
                                    pdfImageFile.pageNum = pdfImgs[i].pageNum;
                                    this.files.push(pdfImageFile);
                                }

                                if (++index == acceptedFiles.length) {
                                    this.loadingService.hideLoadingSpinner();
                                }
                            });
                    }

                }
                reader.readAsDataURL(file);

            } 
        }
    }

    removeFile(file) {
        let index = this.files.findIndex( f => f == file);
        this.files.splice(index, 1);
    }
    _handleReaderLoaded(index, file, e, result) {
        let reader = e.target;
        let imgSrc = reader.result;
        this.loaded = true;
    }

    create() {
        if(this.userInformation == null) {
            this.userInformation = this.tokenStorage.getUserInfo();
        }
        const name = this.form.getRawValue().name;
        const description = this.form.getRawValue().description;
        //this.dialogRef.close({ name: name, description: description, files: this.files });

        let formData = new FormData();

        for (let i = 0; i < this.files.length; i++) {
            formData.append('file[]', this.files[i], this.files[i].name);

        }

        formData.append('name', name);
        formData.append('description', description);
        formData.append('pages', this.files.length.toString());
        formData.append('user_id', this.userInformation.id);
        formData.append('share_all', '0');

        this.createForm(formData);
    }

    back() {
        this._location.back();
    }

}
