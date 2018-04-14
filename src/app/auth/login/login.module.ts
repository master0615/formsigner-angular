import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

import { AuthLoginComponent } from './login.component';


const routes = [
    {
        path     : '',
        component: AuthLoginComponent
    }
];

@NgModule({
    declarations: [
		AuthLoginComponent
    ],
    imports     : [
		SharedModule,
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})

export class AuthLoginModule {
}
