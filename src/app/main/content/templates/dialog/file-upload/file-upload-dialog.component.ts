import { Component, OnInit, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { UploadEvent, UploadFile } from 'ngx-file-drop';

import * as _ from 'lodash';
import { CustomToastrService } from '../../../../../shared/services/custom-toastr.service';
import { CustomLoadingService } from '../../../../../shared/services/custom-loading.service';
import { PdfHandlerService } from '../../../services/pdf-handler.service';



@Component({
    selector   : 'app-templates-file-upload-dialog',
    templateUrl: './file-upload-dialog.component.html',
    styleUrls  : ['./file-upload-dialog.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class TemplatesFileUploadDialogComponent implements OnInit
{
    public fileType: string;
    public files: any[] = [];
    public imgSrc:string[];
    filesNameStr = '';

    form: FormGroup;

    loaded: boolean = false;
    imageLoaded: boolean = false;
    public imgPattern = /image-*/;

    constructor(
        public dialogRef: MatDialogRef<TemplatesFileUploadDialogComponent>,
        private formBuilder: FormBuilder,
        private pdfHandlerService: PdfHandlerService,
		private toastrService  	: CustomToastrService,
        private loadingService 	: CustomLoadingService
    )
    {
    }

    ngOnInit()
    {
        this.form = this.formBuilder.group({
            name        : ['', [Validators.required]],
            description : ['', []]
        });        
    }

    onDrop(event) {     
    }
    clickImage(file, event){
        event.stopPropagation();
    }
    onUploadFiles(event) {
        //this.files=[];

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
        const name = this.form.getRawValue().name;
        const description = this.form.getRawValue().description;
        this.dialogRef.close({ name: name, description: description, files: this.files });
    }
}
