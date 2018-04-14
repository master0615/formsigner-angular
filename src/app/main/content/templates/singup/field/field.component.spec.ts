import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplatesSignupFieldComponent } from './field.component';

describe('TemplatesSignupFieldComponent', () => {
	let component: TemplatesSignupFieldComponent;
	let fixture: ComponentFixture<TemplatesSignupFieldComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
		declarations: [ TemplatesSignupFieldComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TemplatesSignupFieldComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
