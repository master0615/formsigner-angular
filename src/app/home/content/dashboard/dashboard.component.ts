import { Component, OnInit, ViewChild } from '@angular/core';
import { HomeFormListComponent } from './form-list/form-list.component';

@Component({
    selector: 'app-home-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class HomeDashBoardComponent implements OnInit {

	@ViewChild(HomeFormListComponent)
    private formlistEl: HomeFormListComponent;

    constructor() { }

    ngOnInit() {
    }

    updateFilter(value :string) {
        this.formlistEl.search(value);
    }
}
