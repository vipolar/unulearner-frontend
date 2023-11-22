import { AppRoutingModule } from '@app/app-routing.module';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from "@angular/forms";
import { AppComponent } from '@app/app.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { KeycloakEventService } from '@services/keycloak/keycloak-event.service';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';

import { EnglishDictionaryComponent } from '@components/rest/content/english/dictionary/english-dictionary.component';
import { EnglishWordlistComponent } from '@components/rest/content/english/wordlist/english-wordlist.component';

@NgModule({
	declarations: [
		AppComponent,
		EnglishDictionaryComponent,
		EnglishWordlistComponent,
	],
	imports: [
		KeycloakAngularModule,
		ReactiveFormsModule,
		AppRoutingModule,
		HttpClientModule,
		BrowserModule,
		CommonModule,
		FormsModule,
		RouterModule.forRoot([
			//{path: 'login', component: LoginComponent},
			//{path: 'registration', component: RegistrationComponent},
		]),
	],
	providers: [
		{
			provide: APP_INITIALIZER,
			useFactory: initializeKeycloak,
			deps: [KeycloakService, KeycloakEventService],
			multi: true
		}
	],
	bootstrap: [AppComponent]
})
export class AppModule { }

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
				checkLoginIframe: true,
				silentCheckSsoFallback: false,
				silentCheckSsoRedirectUri:
					window.location.origin + '/assets/keycloak/sso.html'
			}
		});
	}
}