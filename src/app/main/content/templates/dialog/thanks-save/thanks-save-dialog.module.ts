import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../../shared/shared.module';
import { TemplatesThanksSaveDialogComponent } from './thanks-save-dialog.component';

@NgModule({
	imports: [
		CommonModule,
		SharedModule
	],
	exports: [

	],
	declarations: [
		TemplatesThanksSaveDialogComponent
	],
	entryComponents: [
		TemplatesThanksSaveDialogComponent
    ],
	providers:[]
})
export class TemplatesThanksSaveDialogModule { }