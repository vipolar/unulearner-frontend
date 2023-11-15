import { Injectable } from '@angular/core';
import { KeycloakEvent, KeycloakEventType, KeycloakService } from 'keycloak-angular';


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
            console.log('Keycloak received "OnAuthError" event.');
            break;
          case KeycloakEventType.OnAuthLogout:
            console.log('Keycloak received "OnAuthLogout" event.');
            break;
          case KeycloakEventType.OnAuthRefreshError:
            console.log('Keycloak received "OnAuthRefreshError" event.');
            break;
          case KeycloakEventType.OnAuthRefreshSuccess:
            console.log('Keycloak received "OnAuthRefreshSuccess" event.')
            break;
          case KeycloakEventType.OnAuthSuccess:
            console.log('Keycloak received "OnAuthSuccess" event.');
            break;
          case KeycloakEventType.OnReady:
            console.log('Keycloak received "OnReady" event.');
            break;
          case KeycloakEventType.OnTokenExpired:
            console.log('Keycloak received "OnTokenExpired" event.');
            await this.keycloak.updateToken(30);
            break;
          case KeycloakEventType.OnActionUpdate:
            console.log('Keycloak received "OnActionUpdate" event.');
            break;
          default:
            console.error('Keycloak event type unexpected!');
            break;
        }
      }
    });
  }
}
