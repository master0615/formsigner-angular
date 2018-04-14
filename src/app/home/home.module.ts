import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from './home.routing.module';
import { HomeComponent } from './home.component';
import { HomeToolbarComponent } from './toolbar/toolbar.component';


@NgModule({
	imports: [
		CommonModule,
		SharedModule,
		HomeRoutingModule
	],
	exports: [
	],
	declarations: [
		HomeComponent,
		HomeToolbarComponent
	],
	providers:[],
})
export class HomeModule { }