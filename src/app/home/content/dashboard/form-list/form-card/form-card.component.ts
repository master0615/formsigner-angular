import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../../../environments/environment';
import { MatDialog } from '@angular/material';
import { TemplatesPreviewDialogComponent } from '../../../../../main/content/templates/dialog/preview/preview-dialog.component';


@Component({
	selector: 'app-home-form-card',
	templateUrl: './form-card.component.html',
	styleUrls: ['./form-card.component.scss']
})

export class HomeFormCardComponent implements OnInit {

	@Input() template;
	@Output() onClickSign = new EventEmitter();
	@Output() onClickPreview = new EventEmitter();

	dialogRef: any;

	constructor(private router: Router,
				private dialog: MatDialog) {
	 }

	ngOnInit() {

	}

	clickSign(template: any) {
		this.router.navigate(['home/forms/signup',template.id]);
	}

	clickPreview(template: any) {
		//this.router.navigate(['home/forms/view',template.id]);
		this.dialogRef = this.dialog.open(TemplatesPreviewDialogComponent, {
			panelClass: 'template-preview-dialog',
			data: {
				photos: this.template.files
			}
		});

		this.dialogRef.afterClosed()
			.subscribe(res => {});
	}
}
