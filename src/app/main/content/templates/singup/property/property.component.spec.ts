import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplatesSignupPropertyComponent } from './property.component';

describe('TemplatesSignupPropertyComponent', () => {
	let component: TemplatesSignupPropertyComponent;
	let fixture: ComponentFixture<TemplatesSignupPropertyComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
		declarations: [ TemplatesSignupPropertyComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TemplatesSignupPropertyComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
