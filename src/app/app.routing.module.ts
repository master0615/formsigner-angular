import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PublicGuard, ProtectedGuard } from 'ngx-auth';
import {CanActivate} from "@angular/router";
import { AuthenticationService } from './shared/authentication/authentication.service'
import {AuthGuardService as AuthGuard} from './shared/authentication/guard.service';


export const routes: Routes = [
  {path: 'main', canActivate: [AuthGuard], loadChildren: './main/main.module#MainModule'},
  {path: 'home', canActivate: [PublicGuard], loadChildren: './home/home.module#HomeModule'},
  {path: '**', redirectTo: 'home'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})


export class AppRoutingModule {
}
