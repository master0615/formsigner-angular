import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplatesSendEmailsDialogComponent } from './send-emails-dialog.component';

describe('TemplatesSendEmailsDialogComponent', () => {
	let component: TemplatesSendEmailsDialogComponent;
	let fixture: ComponentFixture<TemplatesSendEmailsDialogComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
		declarations: [ TemplatesSendEmailsDialogComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TemplatesSendEmailsDialogComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
