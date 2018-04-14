import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainHomeFormListComponent } from './form-list.component';

describe('MainHomeFormListComponent', () => {
	let component: MainHomeFormListComponent;
	let fixture: ComponentFixture<MainHomeFormListComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
		declarations: [ MainHomeFormListComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(MainHomeFormListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
