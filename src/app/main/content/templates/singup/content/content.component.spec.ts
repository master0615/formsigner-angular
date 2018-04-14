import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplatesSignupContentComponent } from './content.component';

describe('TemplatesSignupContentComponent', () => {
	let component: TemplatesSignupContentComponent;
	let fixture: ComponentFixture<TemplatesSignupContentComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
		declarations: [ TemplatesSignupContentComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TemplatesSignupContentComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
