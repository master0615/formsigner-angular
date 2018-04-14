import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { DocumentsRoutingModule } from './documents.routing.module';
import { DocumentsComponent } from './documents.component';



@NgModule({
	imports: [
		CommonModule,
		HttpClientModule,
		DocumentsRoutingModule
	],
	exports: [

	],
	declarations: [
		DocumentsComponent
	]
})
export class DocumentsModule { }


