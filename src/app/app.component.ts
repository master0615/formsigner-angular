import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { CustomLoadingService } from './shared/services/custom-loading.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy,AfterViewInit {
	title = 'app';

	loading = true;
	onLoadingChanged: Subscription;

	constructor(
		private loadingService: CustomLoadingService ) {
	}

	ngOnInit() {
		this.onLoadingChanged = this.loadingService.isLoading.subscribe(
			isLoading => {
				this.loading = isLoading;
			});
	}
	ngAfterViewInit(){
		
	}
	ngOnDestroy() {
		this.onLoadingChanged.unsubscribe();
	}
}
