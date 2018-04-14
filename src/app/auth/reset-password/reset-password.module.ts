import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthResetPasswordComponent } from './reset-password.component';
import { SharedModule } from '../../shared/shared.module';

const routes = [
    {
        path     : '',
        component: AuthResetPasswordComponent
    }
];

@NgModule({
    declarations: [
			AuthResetPasswordComponent
    ],
    imports     : [
				SharedModule,
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})

export class AuthResetPasswordModule {

}
