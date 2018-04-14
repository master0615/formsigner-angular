import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { CustomToastrService } from '../../shared/services/custom-toastr.service';
import { CustomLoadingService } from '../../shared/services/custom-loading.service';
import { UserService } from '../services/user.service';
import { User } from '../models/user';


@Component({
    selector   : 'app-auth-register',
    templateUrl: './register.component.html',
    styleUrls  : ['./register.component.scss']
})
export class AuthRegisterComponent implements OnInit
{
    registerForm: FormGroup;
    registerFormErrors: any;

    constructor(
				private formBuilder: FormBuilder,
				private toastrService  : CustomToastrService,
				private loadingService : CustomLoadingService,
				private userService : UserService,
				private router: Router
    )
    {
        this.registerFormErrors = {
			first_name     : {},
			last_name	   : {},
            email          : {},
            password       : {},
            confirm_password: {}
        };
    }

    ngOnInit()
    {
        this.registerForm = this.formBuilder.group({
			first_name     : ['', Validators.required],
			last_name	   : ['', Validators.required],
            email          : ['', [Validators.required, Validators.email]],
            password       : ['', [Validators.required, Validators.minLength(8)]],
			confirm_password: ['', [Validators.required, confirmPassword]],
			acceptTerm: []
        });

        this.registerForm.valueChanges.subscribe(() => {
            this.onRegisterFormValuesChanged();
        });
    }

    onRegisterFormValuesChanged()
    {
        for ( const field in this.registerFormErrors )
        {
            if ( !this.registerFormErrors.hasOwnProperty(field) )
            {
                continue;
            }

            // Clear previous errors
            this.registerFormErrors[field] = {};

            // Get the control
            const control = this.registerForm.get(field);

            if ( control && control.dirty && !control.valid )
            {
                this.registerFormErrors[field] = control.errors;
            }
        }
		}
		
		register() {
			if (this.registerForm.valid && this.registerForm.getRawValue().acceptTerm ) {
				this.loadingService.showLoadingSpinner();
				let newUser:User = this.registerForm.value;

				this.userService.createUser( newUser ).subscribe(
					res => {
						this.loadingService.hideLoadingSpinner();		
						this.toastrService.showSuccess("Thank you for registering! \n Please log in and create your form.");
						this.router.navigate(['/auth/login']);
					},
					err =>{
						this.loadingService.hideLoadingSpinner();				
						this.toastrService.showError(err.error.message);
					}
				);
			}
		
		}
}

function confirmPassword(control: AbstractControl)
{
    if ( !control.parent || !control )
    {
        return;
    }

    const password = control.parent.get('password');
    const confirm_password = control.parent.get('confirm_password');

    if ( !password || !confirm_password )
    {
        return;
    }

    if ( confirm_password.value === '' )
    {
        return;
    }

    if ( password.value !== confirm_password.value )
    {
        return {
            passwordsNotMatch: true
        };
    }
}
