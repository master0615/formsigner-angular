import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module';
import { MainHomeFormListComponent } from './form-list.component';
import { MainHomeFormCardComponent } from './form-card/form-card.component';
import { TemplateService } from '../../services/template.service';
import { TemplatesPreviewDialogModule } from '../../templates/dialog/preview/preview-dialog.module';


@NgModule({
	imports: [
		CommonModule,
		SharedModule,
		TemplatesPreviewDialogModule
	],
	exports: [
		MainHomeFormListComponent
	],
	declarations: [
		MainHomeFormListComponent,
		MainHomeFormCardComponent
	],
	entryComponents: [
	],
	providers: [TemplateService]
})
export class MainHomeFormListModule { }