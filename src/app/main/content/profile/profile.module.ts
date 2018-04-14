import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile.routing.module';
import { ProfileComponent } from './profile.component';
import { ProfilePhotoUploadComponent } from './photo-upload/photo-upload.component';
import { ProfileEditComponent } from './edit/edit.component';
import { SharedModule } from '../../../shared/shared.module';
import { UserProfileService } from '../services/userProfile.service';




@NgModule({
	imports: [
		CommonModule,
		SharedModule,
		ProfileRoutingModule
	],
	exports: [
		ProfileComponent
	],
	declarations: [
		ProfileComponent,
		ProfileEditComponent,
		ProfilePhotoUploadComponent
	],
	//providers:[UserProfileService]
})
export class ProfileModule { }


