import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthRegisterComponent } from './register.component';
import { SharedModule } from '../../shared/shared.module';
import { UserService } from '../services/user.service';

const routes = [
    {
        path     : '',
        component: AuthRegisterComponent
    }
];

@NgModule({
    declarations: [
        AuthRegisterComponent
    ],
    imports     : [
		SharedModule,
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule],
    providers: [UserService]
})

export class AuthRegisterModule {
}
