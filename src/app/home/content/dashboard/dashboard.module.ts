import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';

import { HomeDashBoardComponent } from './dashboard.component';
import { HomeFormListModule } from './form-list/form-list.module';
import { HomeDashBoardRoutingModule } from './dashboard.routing.module';
import { TemplatesViewModule } from '../../../main/content/templates/view/view.module';
import { TemplatesSignupModule } from '../../../main/content/templates/singup/signup.module';

@NgModule({
	imports: [
		CommonModule,
		SharedModule,
		HomeDashBoardRoutingModule,
		HomeFormListModule,
		TemplatesViewModule,
		TemplatesSignupModule
	],
	exports: [
		HomeDashBoardComponent
	],
	declarations: [
		HomeDashBoardComponent
	]
})
export class HomeDashboardModule { }


