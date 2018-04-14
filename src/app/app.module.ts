import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app.routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { AuthenticationModule } from './shared/authentication';
import { CustomLoadingService } from './shared/services/custom-loading.service';
import { CustomToastrService } from './shared/services/custom-toastr.service';
import { AuthGuardService } from './shared/authentication/guard.service';



// AoT requires an exported function for factories
export function createTranslateLoader(http: HttpClient) {
	// for development
	return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule,
		AppRoutingModule,
		SharedModule,
		AuthenticationModule,
		LoadingModule.forRoot({
			animationType: ANIMATION_TYPES.circleSwish,
			backdropBackgroundColour: 'rgba(0,0,0,0.5)', 
			backdropBorderRadius: '4px',
			primaryColour: '#90ee90', 
			secondaryColour: '#ffffff', 
			tertiaryColour: '#ffffff',
			fullScreenBackdrop: true
		}),    

		ToastrModule.forRoot(),
		TranslateModule.forRoot({
		loader: {
			provide: TranslateLoader,
			useFactory: createTranslateLoader,
			deps: [HttpClient]
		}
	}),
	],
	declarations: [AppComponent],
	exports: [],
	providers: [AppComponent, CustomLoadingService, CustomToastrService, AuthGuardService],
	bootstrap: [AppComponent]
})
export class AppModule {
}
