import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemplatesRoutingModule } from './templates.routing.module';
import { TemplatesComponent } from './templates.component';

import { SharedModule } from '../../../shared/shared.module';
import { TemplatesListModule } from './list/list.module';
import { TemplatesEditModule } from './edit/edit.module';
import { TemplatesViewModule } from './view/view.module';
import { TemplatesSignupModule } from './singup/signup.module';

import { TemplateService } from '../services/template.service';
import { SettingsService } from '../services/settings.service';
import { TemplatesCreateModule } from './create/create.module';


@NgModule({
	imports: [
		CommonModule,
		SharedModule,
		TemplatesRoutingModule,
		TemplatesListModule,
		TemplatesEditModule,
		TemplatesViewModule,
		TemplatesSignupModule,
		TemplatesCreateModule
	],
	exports: [
		TemplatesComponent
	],
	declarations: [
		TemplatesComponent
	],
	providers:[TemplateService, SettingsService]
})
export class TemplatesModule { }


