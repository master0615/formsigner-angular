import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { UsersRoutingModule } from './users.routing.module';
import { UsersComponent } from './users.component';
import { UserFormDialogComponent } from './dialogs/user-form/user-form.component';
import { SharedModule } from '../../../shared/shared.module';




@NgModule({
	imports: [
		CommonModule,
		SharedModule,
		HttpClientModule,
		UsersRoutingModule
	],
	exports: [

	],
	entryComponents: [
		UserFormDialogComponent
    ],
	declarations: [
		UsersComponent,
		UserFormDialogComponent
	]
})
export class UsersModule { }


