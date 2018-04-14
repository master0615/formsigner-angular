import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsSendEmailsComponent } from './send-emails.component';

describe('SettingsSendEmailsComponent', () => {
	let component: SettingsSendEmailsComponent;
	let fixture: ComponentFixture<SettingsSendEmailsComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ SettingsSendEmailsComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SettingsSendEmailsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
