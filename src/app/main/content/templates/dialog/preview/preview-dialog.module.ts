import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../../shared/shared.module';
import { TemplatesPreviewDialogComponent } from './preview-dialog.component';
import { TemplateService } from '../../../services/template.service';

@NgModule({
	imports: [
		CommonModule,
		SharedModule
	],
	exports: [

	],
	declarations: [
		TemplatesPreviewDialogComponent
	],
	entryComponents: [
        TemplatesPreviewDialogComponent
    ],
	providers:[TemplateService]
})
export class TemplatesPreviewDialogModule { }


