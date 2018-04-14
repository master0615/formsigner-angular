import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplatesViewFieldComponent } from './field.component';

describe('TemplatesViewFieldComponent', () => {
	let component: TemplatesViewFieldComponent;
	let fixture: ComponentFixture<TemplatesViewFieldComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
		declarations: [ TemplatesViewFieldComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TemplatesViewFieldComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
