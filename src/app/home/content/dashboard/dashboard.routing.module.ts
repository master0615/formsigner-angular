import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeDashBoardComponent } from './dashboard.component';
import { TemplatesViewComponent } from '../../../main/content/templates/view/view.component';
import { TemplatesSignupComponent } from '../../../main/content/templates/singup/signup.component';

export const routes: Routes = [
	{ path: 'view/:id', component:  TemplatesViewComponent },	
    { path: 'signup/:id', component: TemplatesSignupComponent },
    { path: '', component: HomeDashBoardComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule ]
})
export class HomeDashBoardRoutingModule {}