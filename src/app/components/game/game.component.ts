import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IResultsGameDialog } from '../../shared/interfaces/modal-dialogs.interface';
import { CoreGameService } from '../../shared/services/core-game.service';
import { ICellData, ICellStatuses, ISettingsGame } from 'src/app/shared/interfaces/game.interface';
import { ResultsGameModalComponent } from 'src/app/modalDialogs/results-game-modal/results-game-modal.component';
import { delay, interval, map, Subject, takeUntil, tap } from 'rxjs';
import { WelcomeGameModalComponent } from 'src/app/modalDialogs/welcome-game-modal/welcome-game-modal.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})

export class GameComponent implements OnInit {
  public gameIsEnding = new Subject<void>();
  @ViewChild(WelcomeGameModalComponent) WelcomeGameModalComponent!: WelcomeGameModalComponent;

  public cellData: ICellData[] = [];

  public cellStatuses: ICellStatuses = {
    default: 'default',
    availableCell: 'active-element',
    playerCell: 'active-element-player',
    computerCell: 'active-element-computer',
  };

  public settingsGame: ISettingsGame = {
    countCells: 100,
    delayForPainting: 1500,
    delayForPlayer: 1450,
    delayBetweenPaintingAndPlayer: 50,
    winScore: 10,
  };

  public scoreComputer: number = 0;
  public scorePlayer: number = 0;

  constructor(private dialog: MatDialog, private coreGame: CoreGameService) { }

  public ngOnInit(): void {
    this.cellData = this.coreGame.generateObjects(this.settingsGame.countCells);
  }

  public startGame(delay: number): void {
    if (this.gameIsEnding.observers.length) {
      return;
    } else {
      this.resetStateGame();
    }

    this.settingsGame.delayForPainting = delay;
    this.settingsGame.delayForPlayer = this.settingsGame.delayForPainting - this.settingsGame.delayBetweenPaintingAndPlayer;

    this.getObservableScore().subscribe();
  }

  private openResultsGameDialog(winner: string): void {
    this.dialog.open(ResultsGameModalComponent, {
      data: {
        winner: winner,
        repeatGame: false,
      }
    })
      .afterClosed()
      .subscribe((response: IResultsGameDialog) => {
        if (response && response.repeatGame) {
          this.resetStateGame();

          this.getObservableScore().subscribe();
        }
      });
  }

  private resetStateGame(): void {
    this.cellData = this.coreGame.generateObjects(this.settingsGame.countCells);

    this.scoreComputer = 0;
    this.scorePlayer = 0;
  }

  public clickPlayer(clickedElement: ICellData): void {
    if (clickedElement.status === this.cellStatuses.availableCell) {
      const cellData = this.cellData.at(clickedElement.id - 1);

      if (cellData) {
        cellData.status = this.cellStatuses.playerCell;
      }

      this.scorePlayer++;
    }
  }

  private checkWinner(): boolean {
    let player = '';

    if (this.scoreComputer === this.settingsGame.winScore) {
      player = 'комп\'ютер';
      this.openResultsGameDialog(player);
    }

    if (this.scorePlayer === this.settingsGame.winScore) {
      player = 'гравець';
      this.openResultsGameDialog(player);
    }

    return !!player;
  }

  private getObservableScore() {
    const randomNumbers = this.coreGame.getShuffledNumbers(this.settingsGame);

    return interval(this.settingsGame.delayForPainting)
      .pipe(
        map((tick) => {
          if (this.checkWinner()) {
            this.gameIsEnding.next();
            return;
          }

          const cellNeededHighlight = this.cellData[randomNumbers[tick] - 1];
          cellNeededHighlight.status = this.cellStatuses.availableCell;

          return cellNeededHighlight;
        }),
        delay(this.settingsGame.delayForPlayer),
        tap((cell) => {
          cell && this.checkManagedPlayer(cell);
        }),
        takeUntil(this.gameIsEnding),
      );
  }

  private checkManagedPlayer(cell: ICellData): void {
    if (cell?.status !== this.cellStatuses.playerCell) {
      cell.status = this.cellStatuses.computerCell;
      this.scoreComputer++;
    }
  }
}