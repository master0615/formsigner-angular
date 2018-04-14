import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MainHomeFormListComponent } from './form-list/form-list.component';

@Component({
    selector: 'app-main-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class MainHomeComponent implements OnInit {

	@ViewChild(MainHomeFormListComponent)
    private formlistEl: MainHomeFormListComponent;
    
    constructor() { }

    ngOnInit() {
    }


    updateFilter(value :string) {
        this.formlistEl.search(value);
    }
}
