import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplatesViewContentComponent } from './content.component';

describe('TemplatesViewContentComponent', () => {
	let component: TemplatesViewContentComponent;
	let fixture: ComponentFixture<TemplatesViewContentComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
		declarations: [ TemplatesViewContentComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TemplatesViewContentComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
