import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDashBoardComponent } from './dashboard.component';

describe('HomeDashBoardComponent', () => {
	let component: HomeDashBoardComponent;
	let fixture: ComponentFixture<HomeDashBoardComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
		declarations: [ HomeDashBoardComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(HomeDashBoardComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
