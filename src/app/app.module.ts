import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';

import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { WelcomeGameModalComponent } from './welcome-game-modal/welcome-game-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    WelcomeGameModalComponent,
  ],
  exports: [
    MatDialogModule,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }