import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplatesEditToolBoxComponent } from './toolbox.component';

describe('TemplatesEditToolboxComponent', () => {
	let component: TemplatesEditToolBoxComponent;
	let fixture: ComponentFixture<TemplatesEditToolBoxComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
		declarations: [ TemplatesEditToolBoxComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TemplatesEditToolBoxComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
