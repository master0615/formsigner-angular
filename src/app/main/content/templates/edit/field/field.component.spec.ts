import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplatesEditFieldComponent } from './field.component';

describe('TemplatesEditPropertyComponent', () => {
	let component: TemplatesEditFieldComponent;
	let fixture: ComponentFixture<TemplatesEditFieldComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
		declarations: [ TemplatesEditFieldComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TemplatesEditFieldComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
