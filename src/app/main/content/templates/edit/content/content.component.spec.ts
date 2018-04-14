import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplatesEditContentComponent } from './content.component';

describe('TemplatesEditContentComponent', () => {
	let component: TemplatesEditContentComponent;
	let fixture: ComponentFixture<TemplatesEditContentComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
		declarations: [ TemplatesEditContentComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TemplatesEditContentComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
