import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module';
import { TemplatesListComponent } from './list.component';
import { TemplateService } from '../../services/template.service';
import { TemplatesFileUploadDialogModule } from '../dialog/file-upload/file-upload-dialog.module';

@NgModule({
	imports: [
		CommonModule,
		SharedModule,
		TemplatesFileUploadDialogModule
	],
	exports: [
		TemplatesListComponent
	],
	declarations: [
		TemplatesListComponent
	],
	entryComponents: [
    ],
	providers:[TemplateService]
})
export class TemplatesListModule { }


