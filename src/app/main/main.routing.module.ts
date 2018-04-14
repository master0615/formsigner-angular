import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';

export const routes: Routes = [
	{
		path: '',
		component: MainComponent,
		children: [
			{ path: 'home',    		loadChildren: './content/home/home.module#MainHomeModule' },
			{ path: 'documents',    loadChildren: './content/documents/documents.module#DocumentsModule' },
			{ path: 'templates',    loadChildren: './content/templates/templates.module#TemplatesModule' },
			{ path: 'settings',     loadChildren: './content/settings/settings.module#SettingsModule' },
			{ path: 'profile/:id',  loadChildren: './content/profile/profile.module#ProfileModule' },
			{ path: 'users',    	loadChildren: './content/users/users.module#UsersModule' },
			{ path: '', redirectTo:'home' }
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule ]
})
export class MainRoutingModule {}