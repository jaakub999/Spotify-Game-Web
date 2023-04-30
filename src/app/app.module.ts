import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AuthComponent } from './components/auth/auth.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { HttpClientModule } from "@angular/common/http";
import { RegisterComponent } from './components/register/register.component';
import { EmailComponent } from './components/email/email.component';
import { HomeComponent } from './components/home/home.component';
import { PasswordComponent } from './components/password/password.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    RegisterComponent,
    EmailComponent,
    HomeComponent,
    PasswordComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}