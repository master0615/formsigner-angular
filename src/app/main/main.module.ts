import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main.routing.module';
import { SharedModule } from '../shared/shared.module';
import { MainComponent } from './main.component';
import { MainToolbarComponent } from './toolbar/toolbar.component';
import { UserProfileService } from './content/services/userProfile.service';

@NgModule({
	imports: [
		CommonModule,
		SharedModule,
		MainRoutingModule,		
	],
	exports: [
	],
	declarations: [
		MainComponent,
		MainToolbarComponent
	],
	providers:[UserProfileService]
})
export class MainModule { }


