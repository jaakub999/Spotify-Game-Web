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
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { HostComponent } from './components/home/host/host.component';
import { PlayerTableComponent } from './components/home/player-table/player-table.component';
import { SpotifySearchBarComponent } from './components/home/spotify-search-bar/spotify-search-bar.component';
import { GameComponent } from './components/game/game.component';
import { InsertCodeComponent } from './components/home/insert-code/insert-code.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    RegisterComponent,
    EmailComponent,
    HomeComponent,
    ForgotPasswordComponent,
    ChangePasswordComponent,
    HostComponent,
    PlayerTableComponent,
    SpotifySearchBarComponent,
    GameComponent,
    InsertCodeComponent
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
