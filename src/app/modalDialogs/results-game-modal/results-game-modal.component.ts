import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GameComponent } from 'src/app/components/game/game.component';
import { IResultsGameDialog } from 'src/app/shared/interfaces/modalDialogs.interface';

@Component({
  selector: 'app-results-game-modal',
  templateUrl: './results-game-modal.component.html',
  styleUrls: ['./results-game-modal.component.css']
})
export class ResultsGameModalComponent {

  constructor(public dialogRef: MatDialogRef<GameComponent>, @Inject(MAT_DIALOG_DATA) public dataDialog: IResultsGameDialog,) { }

  public choosePlayer(choose: 'Yes' | 'No'): void {
    this.dataDialog.repeatGame = choose === 'Yes';
  }
}