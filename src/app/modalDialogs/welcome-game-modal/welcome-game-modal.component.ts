import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GameComponent } from 'src/app/components/game/game.component';
import { IWelcomeGameDialog } from 'src/app/shared/interfaces/modalDialogs.interface';

@Component({
  selector: 'app-welcome-game-modal',
  templateUrl: './welcome-game-modal.component.html',
  styleUrls: ['./welcome-game-modal.component.css']
})
export class WelcomeGameModalComponent {

  constructor(public dialogRef: MatDialogRef<GameComponent>, @Inject(MAT_DIALOG_DATA) public data: IWelcomeGameDialog) { }

  public startGame(): void {
    this.data.isStartGame = true;
  }
}