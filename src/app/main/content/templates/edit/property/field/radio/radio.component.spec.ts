import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplatesEditPropertyFieldRadioComponent } from './radio.component';

describe('TemplatesEditPropertyFieldRadioComponent', () => {
	let component: TemplatesEditPropertyFieldRadioComponent;
	let fixture: ComponentFixture<TemplatesEditPropertyFieldRadioComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
		declarations: [ TemplatesEditPropertyFieldRadioComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TemplatesEditPropertyFieldRadioComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
