import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TemplatesListComponent } from './list/list.component';
import { TemplatesEditComponent } from './edit/edit.component';
import { TemplatesViewComponent } from './view/view.component';
import { TemplatesSignupComponent } from './singup/signup.component';
import { TemplatesCreateComponent } from './create/create.component';

export const routes: Routes = [
	{ path: 'list', component: TemplatesListComponent },
	{ path: 'create', component: TemplatesCreateComponent},
	{ path: 'edit/:id', component: TemplatesEditComponent },	
	{ path: 'view/:id', component: TemplatesViewComponent },	
	{ path: 'signup/:id', component: TemplatesSignupComponent },
	{ path: '**', redirectTo:'list'}	
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule ]
})
export class TemplatesRoutingModule {}