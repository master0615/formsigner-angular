import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { USER_ROLES, USER_ACTIVIES } from '../../../models/profile.models';
import { CustomValidators } from '../../../../../shared/validators/custom-validators';

@Component({
    selector     : 'app-users-user-form-dialog',
    templateUrl  : './user-form.component.html',
    styleUrls    : ['./user-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class UserFormDialogComponent implements OnInit
{
    USER_ROLES = USER_ROLES;
	USER_ACTIVIES = USER_ACTIVIES;
    userForm: FormGroup;

    constructor(
        public dialogRef: MatDialogRef<UserFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private data: any,
        private formBuilder: FormBuilder) {
    }

    ngOnInit() {
		this.userForm = new FormGroup({
            first_name   	    : new FormControl('', [Validators.required]),
			last_name	 	    : new FormControl('', [Validators.required]),
			email		 	    : new FormControl('', [Validators.required, Validators.email]),
			role         	    : new FormControl('staff'),
			active       	    : new FormControl('inactive'),
			password            : new FormControl('', [Validators.required, Validators.minLength(8)]),
			confirm_password    : new FormControl('', [])
		}, [CustomValidators.MatchPasswordForCreateuser]);

    }


    create() {

        const user = this.userForm.value;
        console.log(user);
        this.dialogRef.close(user);
    }
}
