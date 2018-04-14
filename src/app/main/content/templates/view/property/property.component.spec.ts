import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplatesViewPropertyComponent } from './property.component';

describe('TemplatesViewPropertyComponent', () => {
	let component: TemplatesViewPropertyComponent;
	let fixture: ComponentFixture<TemplatesViewPropertyComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
		declarations: [ TemplatesViewPropertyComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TemplatesViewPropertyComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
