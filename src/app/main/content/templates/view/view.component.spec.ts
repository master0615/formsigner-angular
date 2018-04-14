import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplatesViewComponent } from './view.component';

describe('TemplatesViewComponent', () => {
	let component: TemplatesViewComponent;
	let fixture: ComponentFixture<TemplatesViewComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
		declarations: [ TemplatesViewComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TemplatesViewComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
