import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplatesEditPropertyFieldTextComponent } from './text.component';

describe('TemplatesEditPropertyFieldTextComponent', () => {
	let component: TemplatesEditPropertyFieldTextComponent;
	let fixture: ComponentFixture<TemplatesEditPropertyFieldTextComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
		declarations: [ TemplatesEditPropertyFieldTextComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TemplatesEditPropertyFieldTextComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
