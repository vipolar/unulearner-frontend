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
        if (event.type == KeycloakEventType.OnAuthError) {
          console.log('Keycloak received "OnAuthError" event.');
        }
        if (event.type == KeycloakEventType.OnAuthLogout) {
          console.log('Keycloak received "OnAuthLogout" event.');
        }
        if (event.type == KeycloakEventType.OnAuthRefreshError) {
          console.log('Keycloak received "OnAuthRefreshError" event.');
        }
        if (event.type == KeycloakEventType.OnAuthRefreshSuccess) {
          console.log('Keycloak received "OnAuthRefreshSuccess" event.');
        }
        if (event.type == KeycloakEventType.OnAuthSuccess) {
          console.log('Keycloak received "OnAuthSuccess" event.');
        }
        if (event.type == KeycloakEventType.OnReady) {
          console.log('Keycloak received "OnReady" event.');
        }
        if (event.type == KeycloakEventType.OnTokenExpired) {
          console.log('Keycloak received "OnTokenExpired" event.');
          await this.keycloak.updateToken(30);
        }
        if (event.type == KeycloakEventType.OnActionUpdate) {
          console.log('Keycloak received "OnActionUpdate" event.');
        }
      }
    });
  }
}
