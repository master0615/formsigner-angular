import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';

export const routes: Routes = [
	{
		path: '',
		component: HomeComponent,
		children: [
			{ path: 'forms',    	loadChildren: './content/dashboard/dashboard.module#HomeDashboardModule' },
			{ path: 'login',    	loadChildren: '../auth/login/login.module#AuthLoginModule' },
			{ path: 'signup',    	loadChildren: '../auth/register/register.module#AuthRegisterModule' },
			{ path: '', redirectTo:'forms' }
		]		
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule ]
})
export class HomeRoutingModule {}