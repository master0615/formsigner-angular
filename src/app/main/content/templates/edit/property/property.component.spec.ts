import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplatesEditPropertyComponent } from './property.component';

describe('TemplatesEditPropertyComponent', () => {
	let component: TemplatesEditPropertyComponent;
	let fixture: ComponentFixture<TemplatesEditPropertyComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
		declarations: [ TemplatesEditPropertyComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TemplatesEditPropertyComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
