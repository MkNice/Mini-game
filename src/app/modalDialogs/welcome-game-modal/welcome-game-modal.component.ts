import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GameComponent } from 'src/app/components/game/game.component';
import { IWelcomeGameDialog } from 'src/app/shared/interfaces/modalDialogs.interface';

@Component({
  selector: 'app-welcome-game-modal',
  templateUrl: './welcome-game-modal.component.html',
  styleUrls: ['./welcome-game-modal.component.css']
})
export class WelcomeGameModalComponent {

  public formSettings: FormGroup = new FormGroup({
    delay: new FormControl(this.data.delay, [
      Validators.min(150),
      Validators.max(5000),
      Validators.required
    ])
  });

  constructor(public dialogRef: MatDialogRef<GameComponent>, @Inject(MAT_DIALOG_DATA) public data: IWelcomeGameDialog) { }

  public startGame(): void {
    this.data.isStartGame = true;
  }
}