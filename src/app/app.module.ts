import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { GameComponent } from './components/game/game.component';
import { InputDelayComponent } from './components/input-delay/input-delay.component';
import { ResultsGameModalComponent } from './modalDialogs/results-game-modal/results-game-modal.component';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/game/button/button.component';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    InputDelayComponent,
    ResultsGameModalComponent,
    ButtonComponent,
  ],

  imports: [
    BrowserModule,
    MatDialogModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }