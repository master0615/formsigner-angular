import { Component, Input } from '@angular/core';
import { AbstractControlDirective, AbstractControl } from '@angular/forms';

@Component({
  selector: 'show-errors',
  templateUrl: './show-errors.component.html',
  styleUrls: ['./show-errors.component.scss']
})
export class ShowErrorsComponent {

  private static readonly errorMessages = {
    'required': () => 'This field is required',
    'email': ()=> 'This field should be email address',
    'minlength': (params) => 'The min length of field is ' + params.requiredLength,
    'maxlength': (params) => 'The max length of field is ' + params.requiredLength,
    'pattern': (params) => 'The required pattern is: ' + params.requiredPattern,

    'number'                : (params) => 'This field should be numeric.',
    'noUserName'            : (params) => 'VALIDATE_NO_USERNAME',
    'noMatchPassword'       : (params) => 'Password and Confirm Password should be same.',
  };

  @Input()
  private control: AbstractControlDirective | AbstractControl;

  shouldShowErrors(): boolean {
    return this.control &&
      this.control.errors &&
      (this.control.dirty || this.control.touched);
  }

  listOfErrors(): any[] {
    let errors:Array<any> = [];
    errors = Object.keys(this.control.errors).map( 
      field => {
        let error = {};
        error['msg'] = this.getMessage(field, this.control.errors[field]);
        // error['param'] = this.control.errors[field].requiredLength ? this.control.errors[field].requiredLength : null; 
        return error;
      });
    
    return errors;
  }

  private getMessage(type: string, params: any) {
    return ShowErrorsComponent.errorMessages[type](params);
  }

}
