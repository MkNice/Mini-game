import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IWelcomeGameDialog } from 'src/app/shared/interfaces/modal-dialogs.interface';

@Component({
  selector: 'app-welcome-game-modal',
  templateUrl: './welcome-game-modal.component.html',
  styleUrls: ['./welcome-game-modal.component.css']
})

export class WelcomeGameModalComponent {

  public formSettings: FormGroup = new FormGroup({
    delay: new FormControl(this.dataDialog.delay, [
      Validators.min(150),
      Validators.max(5000),
      Validators.required
    ])
  });

  constructor(@Inject(MAT_DIALOG_DATA) public dataDialog: IWelcomeGameDialog) { }

  public startGame(): void {
    this.dataDialog.isStartGame = true;
    this.dataDialog.delay = this.formSettings.value.delay;
  }
}