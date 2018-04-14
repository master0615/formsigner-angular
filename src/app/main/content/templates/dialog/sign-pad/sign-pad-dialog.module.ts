import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../../shared/shared.module';
import { TemplateService } from '../../../services/template.service';
import { TemplatesSignPadDialogComponent } from './sign-pad-dialog.component';

@NgModule({
	imports: [
		CommonModule,
		SharedModule
	],
	exports: [

	],
	declarations: [
		TemplatesSignPadDialogComponent
	],
	entryComponents: [
		TemplatesSignPadDialogComponent
    ],
	providers:[TemplateService]
})
export class TemplatesSignPadDialogModule { }


