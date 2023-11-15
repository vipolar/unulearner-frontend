import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { KeycloakEventService } from './services/keycloak-event.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//Forms
import { FormUserSignUpComponent } from './components/form-user-sign-up/form-user-sign-up.component';
import { FormUserSignInComponent } from './components/form-user-sign-in/form-user-sign-in.component';

//Routes!!!
import { LoginComponent } from './routes/login/login.component';
import { RegistrationComponent } from './routes/registration/registration.component';


@NgModule({
  declarations: [
    AppComponent,
    //Routes
    LoginComponent,
    RegistrationComponent,
    //Forms
    FormUserSignUpComponent,
    FormUserSignInComponent
  ],
  imports: [
    KeycloakAngularModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    CommonModule,
    RouterModule.forRoot([
      {path: 'login', component: LoginComponent},
      {path: 'registration', component: RegistrationComponent},
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