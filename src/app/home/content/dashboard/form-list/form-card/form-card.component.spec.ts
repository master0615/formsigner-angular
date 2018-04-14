import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeFormCardComponent } from './form-card.component';

describe('FormCardComponent', () => {
	let component: HomeFormCardComponent;
	let fixture: ComponentFixture<HomeFormCardComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
		declarations: [ HomeFormCardComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(HomeFormCardComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
