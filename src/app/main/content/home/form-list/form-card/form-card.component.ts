import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../../../environments/environment';
import { TemplateForm } from '../../../models/template.models';
import { Subscription } from 'rxjs/Subscription';
import { MatDialog } from '@angular/material';
import { TemplatesPreviewDialogComponent } from '../../../templates/dialog/preview/preview-dialog.component';

@Component({
	selector: 'app-main-home-form-card',
	templateUrl: './form-card.component.html',
	styleUrls: ['./form-card.component.scss']
})

export class MainHomeFormCardComponent implements OnInit {

	@Input() template;
	@Output() onClickSign = new EventEmitter();
	@Output() onClickPreview = new EventEmitter();

	dialogRef: any;

	constructor(private router: Router,
				private dialog: MatDialog) {
	 }

	ngOnInit() {

	}

	clickSign(template: TemplateForm) {
		this.router.navigate(['main/templates/signup',template.id]);
	}
	
	clickPreview(template: TemplateForm) {
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
