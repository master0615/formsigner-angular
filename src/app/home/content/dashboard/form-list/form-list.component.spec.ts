import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeFormListComponent } from './form-list.component';

describe('HomeFormListComponent', () => {
	let component: HomeFormListComponent;
	let fixture: ComponentFixture<HomeFormListComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
		declarations: [ HomeFormListComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(HomeFormListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
