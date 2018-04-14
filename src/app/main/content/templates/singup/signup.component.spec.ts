import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplatesSignupComponent } from './signup.component';

describe('TemplatesSignupComponent', () => {
	let component: TemplatesSignupComponent;
	let fixture: ComponentFixture<TemplatesSignupComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
		declarations: [ TemplatesSignupComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TemplatesSignupComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
