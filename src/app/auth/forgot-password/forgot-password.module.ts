import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthForgotPasswordComponent } from './forgot-password.component';
import { SharedModule } from '../../shared/shared.module';

const routes = [
    {
        path     : '',
        component: AuthForgotPasswordComponent
    }
];

@NgModule({
    declarations: [
        AuthForgotPasswordComponent
    ],
    imports     : [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})

export class AuthForgotPasswordModule {
}
