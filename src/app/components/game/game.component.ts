import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IResultsGameDialog, IWelcomeGameDialog } from '../../shared/interfaces/modal-dialogs.interface';
import { CoreGameService } from '../../shared/services/core-game.service';
import { ICellData, ICellStatuses, ISettingsGame } from 'src/app/shared/interfaces/game.interface';
import { ResultsGameModalComponent } from 'src/app/modalDialogs/results-game-modal/results-game-modal.component';
import { WelcomeGameModalComponent } from 'src/app/modalDialogs/welcome-game-modal/welcome-game-modal.component';
import { delay, interval, map, Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})

export class GameComponent implements OnInit {
  public gameIsEnding = new Subject<void>();

  @ViewChild('board')

  public board!: ElementRef<HTMLElement>;

  public cellData: ICellData[] = [];

  public cellStatuses: ICellStatuses = {
    default: 'default',
    availableCell: 'active-element',
    playerCell: 'active-element-player',
    computerCell: 'active-element-computer',
  };

  public settingsGame: ISettingsGame = {
    countCells: 100,
    delayMs: 1500,
    winScore: 10,
  };

  public scoreComputer: number = 0;
  public scorePlayer: number = 0;

  constructor(private dialog: MatDialog, private generateObjects: CoreGameService) { }

  public ngOnInit(): void {
    this.cellData = this.generateObjects.generateObjects(this.settingsGame.countCells);

    this.openWelcomeDialog();
  }


  private openWelcomeDialog(): void {
    this.dialog.open(WelcomeGameModalComponent, {
      data: {
        isStartGame: false,
        delay: this.settingsGame.delayMs,
      }
    })
      .afterClosed()
      .subscribe((response: IWelcomeGameDialog) => {
        if (response.isStartGame) {
          this.settingsGame.delayMs = response.delay;

          this.getObservableScore().subscribe();
        }
      });
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
        if (response.repeatGame) {
          this.resetStateGame();

          this.getObservableScore().subscribe();
        }
      });
  }

  private resetStateGame(): void {
    this.cellData = this.generateObjects.generateObjects(this.settingsGame.countCells);

    this.scoreComputer = 0;
    this.scorePlayer = 0;
  }

  public clickPlayer(clickedElement: ICellData): void {
    if (clickedElement.status === this.cellStatuses.availableCell) {
      const cellData = this.cellData.at(clickedElement.id - 1);

      if (cellData) {
        cellData.status = this.cellStatuses.availableCell;
      }

      this.scorePlayer++;
    }
  }

  private checkWinner(playerScore: number, player: string): boolean {
    if (playerScore === this.settingsGame.winScore) {
      this.openResultsGameDialog(player);
      return true;
    }
    return false;
  }

  private getObservableScore() {
    const randomNumbers = this.generateObjects.getShuffledNumbers(this.settingsGame);

    return interval(this.settingsGame.delayMs)
      .pipe(
        takeUntil(this.gameIsEnding),
        map((tick) => {
          const [isComputerWinner, isPlayerWinner] = [
            this.checkWinner(this.scoreComputer, 'комп\'ютер'),
            this.checkWinner(this.scorePlayer, 'гравець')
          ];

          if (isComputerWinner || isPlayerWinner) {
            this.gameIsEnding.next();

            return;
          }

          const cellNeededHighlight = this.cellData[randomNumbers[tick] - 1];
          cellNeededHighlight.status = this.cellStatuses.availableCell;

          return cellNeededHighlight;
        }),
        delay(this.settingsGame.delayMs),
        tap((cell) => {
          cell && this.checkManagedPlayer(cell);
        }),
      );
  }

  private checkManagedPlayer(cell: ICellData): void {
    if (cell?.status !== 'active-element-player') {
      cell.status = 'active-element-computer';
      this.scoreComputer += 1;
    }
  }
}