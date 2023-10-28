import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

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
    ReactiveFormsModule,
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    RouterModule.forRoot([
      {path: 'login', component: LoginComponent},
      {path: 'registration', component: RegistrationComponent},
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
