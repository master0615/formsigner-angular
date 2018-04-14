import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplatesThanksSaveDialogComponent } from './thanks-save-dialog.component';

describe('TemplatesThanksSaveDialogComponent', () => {
	let component: TemplatesThanksSaveDialogComponent;
	let fixture: ComponentFixture<TemplatesThanksSaveDialogComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
		declarations: [ TemplatesThanksSaveDialogComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TemplatesThanksSaveDialogComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
