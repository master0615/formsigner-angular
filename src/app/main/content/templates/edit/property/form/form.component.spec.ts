import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplatesEditPropertyFormComponent } from './form.component';

describe('TemplatesEditPropertyComponent', () => {
	let component: TemplatesEditPropertyFormComponent;
	let fixture: ComponentFixture<TemplatesEditPropertyFormComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
		declarations: [ TemplatesEditPropertyFormComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TemplatesEditPropertyFormComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
