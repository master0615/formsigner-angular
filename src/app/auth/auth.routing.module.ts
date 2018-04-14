import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';

export const routes: Routes = [
	{
		path: '',
		component: AuthComponent,
		children: [
				{ path: '', redirectTo:'login' },
				{ path: 'login',              loadChildren: './login/login.module#AuthLoginModule' },
				{ path: 'forgot-password',    loadChildren: './forgot-password/forgot-password.module#AuthForgotPasswordModule' },
				{ path: 'lock',               loadChildren: './lock/lock.module#AuthLockModule' },
				{ path: 'mail-confirm',       loadChildren: './mail-confirm/mail-confirm.module#AuthMailConfirmModule' },
				{ path: 'register',           loadChildren: './register/register.module#AuthRegisterModule' },
				{ path: 'reset-password',     loadChildren: './reset-password/reset-password.module#AuthResetPasswordModule' }   
		]
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule ]
})
export class AuthRoutingModule {}