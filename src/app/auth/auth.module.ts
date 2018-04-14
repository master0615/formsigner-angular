import { NgModule } from '@angular/core';

import { AuthRoutingModule } from './auth.routing.module';
import { AuthComponent } from './auth.component';
import { AuthForgotPasswordModule } from './forgot-password/forgot-password.module';
import { AuthLockModule } from './lock/lock.module';
import { AuthLoginModule } from './login/login.module';
import { AuthMailConfirmModule } from './mail-confirm/mail-confirm.module';
import { AuthRegisterModule } from './register/register.module';
import { AuthResetPasswordModule } from './reset-password/reset-password.module';
import { UserService } from './services/user.service';


@NgModule({
	imports: [
		AuthRoutingModule,
		AuthForgotPasswordModule,
		AuthLockModule,
		AuthLoginModule,
		AuthMailConfirmModule,
		AuthRegisterModule,
		AuthRegisterModule,
		AuthResetPasswordModule
	],
	declarations:[
		AuthComponent,

	],
	providers:[UserService],
	exports:[AuthComponent],
	entryComponents: []  
})

export class AuthModule{
}
