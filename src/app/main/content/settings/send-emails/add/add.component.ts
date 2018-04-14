import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-settings-send-emails-add',
    templateUrl: './add.component.html',
    styleUrls: ['./add.component.scss']
})
export class SettingsSendEmailsAddComponent implements OnInit {

    formActive = false;
    form: FormGroup;
    @Output() onEmailAdd = new EventEmitter();
    @ViewChild('emailInput') emailInputField;

    constructor(
        private formBuilder: FormBuilder) {
    }

    ngOnInit() {
    }

    openForm() {
        this.form = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
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
        console.log(this.form.valid);
        if (this.form.valid) {
            this.onEmailAdd.next(this.form.value);
            this.formActive = false;
        }
    }
}
