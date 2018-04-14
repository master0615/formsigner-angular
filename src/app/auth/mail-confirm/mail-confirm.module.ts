import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthMailConfirmComponent } from './mail-confirm.component';
import { SharedModule } from '../../shared/shared.module';

const routes = [
    {
        path     : '',
        component: AuthMailConfirmComponent
    }
];

@NgModule({
    declarations: [
        AuthMailConfirmComponent
    ],
    imports     : [
				SharedModule,
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})

export class AuthMailConfirmModule {

}
