import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplatesEditPropertyFieldSelectComponent } from './select.component';

describe('TemplatesEditPropertyFieldSelectComponent', () => {
	let component: TemplatesEditPropertyFieldSelectComponent;
	let fixture: ComponentFixture<TemplatesEditPropertyFieldSelectComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
		declarations: [ TemplatesEditPropertyFieldSelectComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TemplatesEditPropertyFieldSelectComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
