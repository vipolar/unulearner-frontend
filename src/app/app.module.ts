import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AppRoutingModule } from '@app/app-routing.module';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from '@app/app.component';
import { CommonModule } from '@angular/common';

import { KeycloakEventService } from '@services/keycloak/keycloak-event.service';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//import { EnglishModule } from '@components/rest/content/english/english.module';

/* TODO: use ENV variables for stuff like this! */
function initializeKeycloak(keycloak: KeycloakService, keycloakEvents: KeycloakEventService) {
	return () => {
		keycloakEvents.initializeKeycloakEventListener();
		return keycloak.init({
			config: {
				url: 'https://unulearner.com/auth',
				realm: 'unulearner',
				clientId: 'angular'
			},
			initOptions: {
				onLoad: 'check-sso',
				checkLoginIframe: false,
				silentCheckSsoFallback: false,
				silentCheckSsoRedirectUri:
					window.location.origin + '/assets/keycloak/sso.html'
			}
		}).then((authenticated) => {
			console.log(authenticated ? 'User is authenticated' : 'User is not authenticated');
		}).catch(error => {
			console.error('Keycloak init failed', error);
		});
	}
}

const routes: Routes = [
	{
		path: 'english',
		loadChildren: () => import(`@routes/content/english/english.module`).then(
			module => module.EnglishModule
		)
	},
];

@NgModule({
	declarations: [
		AppComponent,
	],
	imports: [
		KeycloakAngularModule,
		ReactiveFormsModule,
		AppRoutingModule,
		BrowserModule,
		CommonModule,
		//EnglishModule,
		RouterModule.forRoot(routes),
		BrowserAnimationsModule,
	],
	providers: [
		{
			provide: APP_INITIALIZER,
			useFactory: initializeKeycloak,
			deps: [KeycloakService, KeycloakEventService],
			multi: true
		},
		provideHttpClient(withInterceptorsFromDi())
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
