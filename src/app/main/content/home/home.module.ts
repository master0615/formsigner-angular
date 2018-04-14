import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { MainHomeRoutingModule } from './home.routing.module';
import { MainHomeComponent } from './home.component';
import { MainHomeFormListModule } from './form-list/form-list.module';

@NgModule({
	imports: [
		CommonModule,
		HttpClientModule,
		MainHomeRoutingModule,
		MainHomeFormListModule
	],
	exports: [
		MainHomeComponent
	],
	declarations: [
		MainHomeComponent
	]
})
export class MainHomeModule { }