import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../../shared/shared.module';

import { SettingsRoutingModule } from './settings.routing.module';
import { SettingsComponent } from './settings.component';

import { SettingsSignaturePadComponent } from './signature-pad/signature-pad.component';
import { MatchResizeDirective } from './signature-pad/directives/resize.directive';
import { SettingsService } from '../services/settings.service';
import { SendEmailsService } from '../services/send-emails.service';

import { SettingsSendEmailsComponent } from './send-emails/send-emails.component';
import { SettingsSendEmailsAddComponent } from './send-emails/add/add.component';
import { SettingsSendEmailsEditComponent } from './send-emails/edit/edit.component';



@NgModule({
	imports: [
		CommonModule,
		SharedModule,
		SettingsRoutingModule
	],
	exports: [
		SettingsComponent
	],
	declarations: [
		MatchResizeDirective,
		SettingsComponent,
		SettingsSignaturePadComponent,
		SettingsSendEmailsComponent,
		SettingsSendEmailsAddComponent,
		SettingsSendEmailsEditComponent
	],
	providers:[SettingsService, SendEmailsService]	
})
export class SettingsModule { }


