import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsSignaturePadComponent } from './signature-pad.component';

describe('SettingsSignaturePadComponent', () => {
	let component: SettingsSignaturePadComponent;
	let fixture: ComponentFixture<SettingsSignaturePadComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ SettingsSignaturePadComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SettingsSignaturePadComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
