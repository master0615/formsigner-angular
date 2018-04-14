import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainHomeFormCardComponent } from './form-card.component';

describe('MainHomeFormCardComponent', () => {
	let component: MainHomeFormCardComponent;
	let fixture: ComponentFixture<MainHomeFormCardComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
		declarations: [ MainHomeFormCardComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(MainHomeFormCardComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
