import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation, HostListener, Inject, EventEmitter, ChangeDetectorRef, SimpleChanges, Input, Output, AfterViewInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CustomLoadingService } from '../../../../../shared/services/custom-loading.service';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';

export enum KEY_CODE {
    RIGHT_ARROW = 39,
    LEFT_ARROW = 37
}

@Component({
	selector: 'app-templates-sign-pad-dialog',
	templateUrl: './sign-pad-dialog.component.html',
    styleUrls: ['./sign-pad-dialog.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class TemplatesSignPadDialogComponent implements OnInit, AfterViewInit {
	
	signaturePadOptions: Object = {
		'minWidth': 3,
		'canvasWidth': 400,
		'canvasHeight': 200
	};

	title: string;
	signdata: any;

    @ViewChild(SignaturePad) signaturePad: SignaturePad;


	color: string="#000000";
	penWidths = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
	penWidth = 1;
	imgSrc;
	
    constructor(
        public dialogRef: MatDialogRef<TemplatesSignPadDialogComponent>,		
        @Inject(MAT_DIALOG_DATA) private data: any) { 
            this.title = this.data.title;
            this.signdata = this.data.signdata;
	}

	ngOnInit() {

	}

    ngAfterViewInit() {
        if ( this.signdata && this.signdata.data ) 
        this.signaturePad.fromData(JSON.parse(this.signdata.data));
    }

	drawSignStart() {

	}
	
	drawSignComplete() {

	}

	resizeSignature(event){

		let width = event.width;
		let height = event.height;
		this.signaturePad.set('canvasWidth', width);
	}

	onChangeWidth(width: number) {
		this.signaturePad.set('maxWidth', width);
		this.signaturePad.set('velocityFilterWeight', 0.05);
	}

	changeColor(color: string) {
		this.signaturePad.set('penColor', color);
	}
	
	clear() {
		this.signaturePad.clear();
	}

	undo() {
		var data = this.signaturePad.toData();
		if (data) {
		  data.pop(); // remove the last dot or line
		  this.signaturePad.fromData(data);
		}
	}

	save() {
		let signData = JSON.stringify( this.signaturePad.toData() );
		let signImgData =  this.signaturePad.toDataURL();
		this.imgSrc = signImgData;
        this.dialogRef.close({ data:signData, file: signImgData });
	}
}
