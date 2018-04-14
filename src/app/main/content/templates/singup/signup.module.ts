import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module';
import { TemplatesSignupComponent } from './signup.component';
import { TemplateService } from '../../services/template.service';
import { TemplatesSignupContentComponent } from './content/content.component';
import { TemplatesSignupFieldComponent } from './field/field.component';
import { TemplatesSignupPropertyComponent } from './property/property.component';
import { PdfGenerationService } from '../../services/pdf-generation.service';
import { FormService } from '../../services/form.service';
import { TemplatesSignPadDialogModule } from '../dialog/sign-pad/sign-pad-dialog.module';
import { TemplatesSendEmailsDialogModule } from '../dialog/send-emails/send-emails-dialog.module';
import { SendEmailsService } from '../../services/send-emails.service';
import { SettingsService } from '../../services/settings.service';
import { PdfHandlerService } from '../../services/pdf-handler.service';


@NgModule({
	imports: [
		CommonModule,
		SharedModule,
		TemplatesSignPadDialogModule,
		TemplatesSendEmailsDialogModule
	],
	exports: [
		TemplatesSignupComponent
	],
	declarations: [
		TemplatesSignupComponent,
		TemplatesSignupContentComponent,
		TemplatesSignupFieldComponent,
		TemplatesSignupPropertyComponent
	],
	providers:[TemplateService, PdfGenerationService, PdfHandlerService, SendEmailsService, FormService, SettingsService]
})
export class TemplatesSignupModule { }


