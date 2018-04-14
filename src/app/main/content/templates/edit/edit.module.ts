import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module';
import { TemplatesEditComponent } from './edit.component';
import { TemplateService } from '../../services/template.service';
import { ContextMenuService } from 'ngx-contextmenu';

import { TemplatesEditToolBoxComponent } from './toolbox/toolbox.component';
import { TemplatesEditContentComponent } from './content/content.component';
import { TemplatesEditPropertyComponent } from './property/property.component';
import { TemplatesEditFieldComponent } from './field/field.component';
import { TemplatesEditPropertyFieldComponent } from './property/field/field.component';
import { TemplatesEditPropertyFormComponent } from './property/form/form.component';
import { TemplatesEditPropertyFieldCheckBoxComponent } from './property/field/checkbox/checkbox.component';
import { TemplatesEditPropertyFieldRadioComponent } from './property/field/radio/radio.component';
import { TemplatesEditPropertyFieldTextComponent } from './property/field/text/text.component';
import { TemplatesEditPropertyFieldSelectComponent } from './property/field/select/select.component';
import { TemplatesEditPropertyFieldDateComponent } from './property/field/date/date.component';
import { PdfGenerationService } from '../../services/pdf-generation.service';
import { TemplatesFileUploadDialogModule } from '../dialog/file-upload/file-upload-dialog.module';
import { TemplatesThanksSaveDialogModule } from '../dialog/thanks-save/thanks-save-dialog.module';
import { SendEmailsService } from '../../services/send-emails.service';

@NgModule({
	imports: [
		CommonModule,
		SharedModule,
		TemplatesFileUploadDialogModule,
		TemplatesThanksSaveDialogModule
	],
	exports: [
		TemplatesEditComponent
	],
	declarations: [
		TemplatesEditComponent,
		TemplatesEditToolBoxComponent,
		TemplatesEditContentComponent,
		TemplatesEditPropertyComponent,
		TemplatesEditFieldComponent,
		TemplatesEditPropertyFieldComponent,
		TemplatesEditPropertyFormComponent,
		TemplatesEditPropertyFieldCheckBoxComponent,
		TemplatesEditPropertyFieldRadioComponent,
		TemplatesEditPropertyFieldTextComponent,
		TemplatesEditPropertyFieldSelectComponent,
		TemplatesEditPropertyFieldDateComponent
	],
	providers:[ContextMenuService, TemplateService, PdfGenerationService, SendEmailsService],
})
export class TemplatesEditModule { }


