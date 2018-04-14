import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePhotoUploadComponent } from './photo-upload.component';

describe('ProfilePhotoUploadComponent', () => {
  let component: ProfilePhotoUploadComponent;
  let fixture: ComponentFixture<ProfilePhotoUploadComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
		declarations: [ ProfilePhotoUploadComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ProfilePhotoUploadComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
