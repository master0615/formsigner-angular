import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
    selector   : 'app-auth-lock',
    templateUrl: './lock.component.html',
    styleUrls  : ['./lock.component.scss']
})
export class AuthLockComponent implements OnInit
{
    lockForm: FormGroup;
    lockFormErrors: any;

    constructor(
        private formBuilder: FormBuilder
    )
    {

        this.lockFormErrors = {
            username: {},
            password: {}
        };
    }

    ngOnInit()
    {
        this.lockForm = this.formBuilder.group({
            username: [
                {
                    value   : 'Katherine',
                    disabled: true
                }, Validators.required
            ],
            password: ['', Validators.required]
        });

        this.lockForm.valueChanges.subscribe(() => {
            this.onLockFormValuesChanged();
        });
    }

    onLockFormValuesChanged()
    {
        for ( const field in this.lockFormErrors )
        {
            if ( !this.lockFormErrors.hasOwnProperty(field) )
            {
                continue;
            }

            // Clear previous errors
            this.lockFormErrors[field] = {};

            // Get the control
            const control = this.lockForm.get(field);

            if ( control && control.dirty && !control.valid )
            {
                this.lockFormErrors[field] = control.errors;
            }
        }
    }
}
