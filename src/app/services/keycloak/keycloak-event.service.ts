import { KeycloakEvent, KeycloakEventType, KeycloakService } from 'keycloak-angular';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class KeycloakEventService {

	constructor(private keycloak: KeycloakService) { }

	async initializeKeycloakEventListener() {
		this.keycloak.keycloakEvents$.subscribe({
			next: async (event: KeycloakEvent) => {
				switch (event.type) {
					case KeycloakEventType.OnAuthError:
						console.log('Keycloak fired an "OnAuthError" event.');
						break;
					case KeycloakEventType.OnAuthLogout:
						console.log('Keycloak fired an "OnAuthLogout" event.');
						break;
					case KeycloakEventType.OnAuthRefreshError:
						console.log('Keycloak fired an "OnAuthRefreshError" event.');
						break;
					case KeycloakEventType.OnAuthRefreshSuccess:
						console.log('Keycloak fired an "OnAuthRefreshSuccess" event.')
						break;
					case KeycloakEventType.OnAuthSuccess:
						console.log('Keycloak fired an "OnAuthSuccess" event.');
						break;
					case KeycloakEventType.OnReady:
						console.log('Keycloak fired an "OnReady" event.');
						break;
					case KeycloakEventType.OnTokenExpired:
						console.log('Keycloak fired an "OnTokenExpired" event.');
						await this.keycloak.updateToken(30);
						break;
					case KeycloakEventType.OnActionUpdate:
						console.log('Keycloak fired an "OnActionUpdate" event.');
						break;
					default:
						console.error('Unexpected Keycloak event type!');
						break;
				}
			}
		});
	}
}
