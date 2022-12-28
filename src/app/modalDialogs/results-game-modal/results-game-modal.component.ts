import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IResultsGameDialog } from 'src/app/shared/interfaces/modal-dialogs.interface';

@Component({
  selector: 'app-results-game-modal',
  templateUrl: './results-game-modal.component.html',
  styleUrls: ['./results-game-modal.component.css']
})

export class ResultsGameModalComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public dataDialog: IResultsGameDialog) { }

  public choosePlayer(isChoose: boolean): void {
    this.dataDialog.repeatGame = isChoose;
  }
}