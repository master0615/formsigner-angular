import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation, HostListener, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { CustomLoadingService } from '../../../../../shared/services/custom-loading.service';

export enum KEY_CODE {
    RIGHT_ARROW = 39,
    LEFT_ARROW = 37
}

@Component({
	selector: 'app-templates-preview-dialog',
	templateUrl: './preview-dialog.component.html',
    styleUrls: ['./preview-dialog.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class TemplatesPreviewDialogComponent implements OnInit {


    photos: any[];
    index: number = 0;

    constructor(
		@Inject(MAT_DIALOG_DATA) private data: any,
        private loadingService 	: CustomLoadingService
    ) { 
		this.index = 0;
		this.photos = this.data.photos;
	}

    ngOnInit() {

		console.log(this.photos);
    }

    onPrev() {
        this.index = this.index > 0 ? this.index - 1 : 0;
		setTimeout(() => this.loadingService.showLoadingSpinner());

    }

    onNext() {
        this.index = this.index < this.photos.length - 1 ? this.index + 1 : this.photos.length - 1;
		setTimeout(() => this.loadingService.showLoadingSpinner());
    }

	onLoadedImg() {
		setTimeout(() => this.loadingService.hideLoadingSpinner());
	}
    @HostListener('window:keyup', ['$event'])
    keyEvent(event: KeyboardEvent) {

        if (event.keyCode === KEY_CODE.RIGHT_ARROW) {
            this.onNext();
        }

        if (event.keyCode === KEY_CODE.LEFT_ARROW) {
            this.onPrev();
        }
    }
}
