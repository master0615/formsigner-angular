import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import * as _ from 'lodash';
import { CustomToastrService } from '../../../../../shared/services/custom-toastr.service';
import { CustomLoadingService } from '../../../../../shared/services/custom-loading.service';
import { SettingsService } from '../../../services/settings.service';

@Component({
    selector: 'app-settings-send-emails-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SettingsSendEmailsEditComponent implements OnInit {

    formActive = false;
    form: FormGroup;
    @Input() email;
    @Output() onEmailUpdate = new EventEmitter();
    @ViewChild('emailInput') emailInputField;

    constructor(
        private formBuilder     : FormBuilder,
		private toastrService  	: CustomToastrService,
		private loadingService 	: CustomLoadingService,
		private settingsService : SettingsService) { }

    ngOnInit() {
    }

    openForm() {
        this.form = this.formBuilder.group({
            email: [this.email.email]
        });
        this.formActive = true;
        this.focusNameField();
    }

    closeForm() {
        this.formActive = false;
    }

    focusNameField() {
        setTimeout(() => {
            this.emailInputField.nativeElement.focus();
        });
    }

    onFormSubmit() {
        if (this.form.valid) {
            const newEmail = _.cloneDeep(this.email);
            newEmail.email = this.form.getRawValue().email;

            this.onEmailUpdate.next(newEmail);
            this.formActive = false;
        }
    }

}
