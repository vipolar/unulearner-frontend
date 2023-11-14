import { Component, OnInit } from '@angular/core';
import { KeycloakEvent, KeycloakEventType, KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { from } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'frontend';

  public isLoggedIn = false;
  //private keycloakInstance: any;
  public userProfile: KeycloakProfile | null = null;

  constructor(private readonly keycloak: KeycloakService) {}

  public async ngOnInit() {
    this.isLoggedIn = await this.keycloak.isLoggedIn();

    if (this.isLoggedIn) {
      this.userProfile = await this.keycloak.loadUserProfile();
    }
/*
    from(this.keycloak.keycloakEvents$)
      .pipe(filter(event => event.type === KeycloakEventType.OnTokenExpired))
      .subscribe(() => console.log('The token has expired'))

    this.keycloakInstance = this.keycloak.getKeycloakInstance().authenticated;
    console.log(this.keycloakInstance);
    this.keycloak.keycloakEvents$.subscribe();
    this.keycloakInstance.OnTokenExpired = () => {
      console.log("please?");
      if (this.keycloakInstance.refreshToken) {
        this.keycloak.updateToken();
      } else {
        this.keycloak.login();
      }
    }

    this.keycloak.keycloakEvents$.subscribe({
      next: async (event: KeycloakEvent) => {
        console.log("did I even  get hit?");
        console.log('Received Keycloak Event:', event);
        if (event.type == KeycloakEventType.OnTokenExpired) {
          await this.keycloak.updateToken(24);
        }
        if (event.type == KeycloakEventType.OnAuthRefreshError) {
          console.error('Failed to refresh authentication token.');
        }
        if (event.type == KeycloakEventType.OnAuthRefreshSuccess) {
          console.log('Authentication token refreshed successfully.');
        }
      }
    }); */
  }

  public login() {
    this.keycloak.login();
  }

  public register() {
    this.keycloak.register();
  }

  public logout() {
    this.keycloak.logout();
  //  this.keycloak.keycloakEvents$.unsubscribe();
  }
}
