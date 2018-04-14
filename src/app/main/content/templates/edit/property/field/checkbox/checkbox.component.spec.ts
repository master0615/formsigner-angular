import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplatesEditPropertyFieldCheckBoxComponent } from './checkbox.component';

describe('TemplatesEditPropertyFieldCheckBoxComponent', () => {
	let component: TemplatesEditPropertyFieldCheckBoxComponent;
	let fixture: ComponentFixture<TemplatesEditPropertyFieldCheckBoxComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
		declarations: [ TemplatesEditPropertyFieldCheckBoxComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TemplatesEditPropertyFieldCheckBoxComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
