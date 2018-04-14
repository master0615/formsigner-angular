import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../../shared/shared.module';
import { TemplatesSendEmailsDialogComponent } from './send-emails-dialog.component';

@NgModule({
	imports: [
		CommonModule,
		SharedModule
	],
	exports: [

	],
	declarations: [
		TemplatesSendEmailsDialogComponent
	],
	entryComponents: [
		TemplatesSendEmailsDialogComponent
    ],
	providers:[]
})
export class TemplatesSendEmailsDialogModule { }