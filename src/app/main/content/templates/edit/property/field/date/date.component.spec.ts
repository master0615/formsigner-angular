import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplatesEditPropertyFieldDateComponent } from './date.component';

describe('TemplatesEditPropertyFieldDateComponent', () => {
	let component: TemplatesEditPropertyFieldDateComponent;
	let fixture: ComponentFixture<TemplatesEditPropertyFieldDateComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
		declarations: [ TemplatesEditPropertyFieldDateComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TemplatesEditPropertyFieldDateComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
