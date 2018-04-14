import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthLockComponent } from './lock.component';
import { SharedModule } from '../../shared/shared.module';

const routes = [
    {
				path     : '',
				component: AuthLockComponent
    }
];

@NgModule({
    declarations: [
        AuthLockComponent
    ],
    imports     : [
				SharedModule,
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})

export class AuthLockModule {
}
