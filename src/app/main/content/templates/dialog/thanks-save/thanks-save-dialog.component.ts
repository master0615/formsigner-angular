import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation, HostListener, Inject, EventEmitter, ChangeDetectorRef, SimpleChanges, Input, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';


@Component({
	selector: 'app-templates-thanks-save-dialog',
	templateUrl: './thanks-save-dialog.component.html',
    styleUrls: ['./thanks-save-dialog.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class TemplatesThanksSaveDialogComponent implements OnInit {

	
    constructor(
        public dialogRef: MatDialogRef<TemplatesThanksSaveDialogComponent>,		
        @Inject(MAT_DIALOG_DATA) private data: any) { 

	}

	ngOnInit() {

	}



	viewForm() {
        this.dialogRef.close(true);
	}
}
