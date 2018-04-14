import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplatesSignPadDialogComponent } from './sign-pad-dialog.component';

describe('TemplatesSignPadDialogComponent', () => {
	let component: TemplatesSignPadDialogComponent;
	let fixture: ComponentFixture<TemplatesSignPadDialogComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
		declarations: [ TemplatesSignPadDialogComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TemplatesSignPadDialogComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
