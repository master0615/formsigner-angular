import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainHomeComponent } from './home.component';


export const routes: Routes = [
    {
        path: '',
        component: MainHomeComponent,
        children: [
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule ]
})
export class MainHomeRoutingModule {}