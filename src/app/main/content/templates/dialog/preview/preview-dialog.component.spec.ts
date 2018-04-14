import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplatesPreviewDialogComponent } from './preview-dialog.component';

describe('TemplatesPreviewDialogComponent', () => {
	let component: TemplatesPreviewDialogComponent;
	let fixture: ComponentFixture<TemplatesPreviewDialogComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
		declarations: [ TemplatesPreviewDialogComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TemplatesPreviewDialogComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
