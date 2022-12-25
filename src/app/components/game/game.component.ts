import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IResultsGameDialog, IWelcomeGameDialog } from '../../shared/interfaces/modalDialogs.interface';
import { GenerateObjectsService } from '../../shared/services/generate-objects.service';
import { ICeilData, ISettingsGame } from 'src/app/shared/interfaces/game.interface';
import { ResultsGameModalComponent } from 'src/app/modalDialogs/results-game-modal/results-game-modal.component';
import { WelcomeGameModalComponent } from 'src/app/modalDialogs/welcome-game-modal/welcome-game-modal.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})

export class GameComponent implements OnInit {
  public ceilDatas: ICeilData[] = [];
  // В целом было бы неплохо добавить ещё отдельный модуль для проекта.
  public settingsGame: ISettingsGame = { // Если я вдруг таки надумаю или успею сделать допольнитеные фичи то настройки будут сюда прилетатью
    countCeils: 100,
    deleyMs: 1500,
    winScore: 10,
  };

  public scoreComputer: number = 0;
  public scorePlayer: number = 0;

  constructor(private dialog: MatDialog, private generateObjects: GenerateObjectsService) { }

  public ngOnInit(): void {
    this.ceilDatas = this.generateObjects.generateObjects(this.settingsGame.countCeils);

    this.openWelcomeDialog();
  }

  private openWelcomeDialog(): void {
    this.dialog.open(WelcomeGameModalComponent, {
      data: {
        isStartGame: false,
        delay: this.settingsGame.deleyMs,
      }
    })
      .afterClosed()
      .subscribe((response: IWelcomeGameDialog) => {
        if (response.isStartGame) {
          this.settingsGame.deleyMs = response.delay;
          this.activateCell();
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
          this.ceilDatas = this.generateObjects.generateObjects(this.settingsGame.countCeils);
          this.scoreComputer = 0;
          this.scorePlayer = 0;

          this.activateCell();
        }
      });
  }

  public clickPlayer(clickedElement: ICeilData): void {
    if (clickedElement.status === 'active-element') {
      this.ceilDatas[clickedElement.id - 1].status = 'active-element-player';
      this.scorePlayer++;
    }
  }

  private activateCell(): void {
    const randomNumbers = this.generateObjects.getRandomNumbers(this.settingsGame);
    let countCompleateInterval = 0;

    const interval = setInterval(() => {
      const randomNumber = randomNumbers[countCompleateInterval];
      const curDate = this.ceilDatas[randomNumber - 1];
      let timeOut: NodeJS.Timeout = setTimeout(() => { }, 0); // Подумай над этой фигнёй

      const [isComputerWinner, isPlayerWinner] = [
        this.checkWinner(this.scoreComputer, 'комп\'ютер', interval, timeOut),
        this.checkWinner(this.scorePlayer, 'гравець', interval, timeOut)
      ];

      if (isComputerWinner || isPlayerWinner) {
        return;
      }

      curDate.status = 'active-element';
      timeOut = setTimeout(() => {
        if (curDate.status !== 'active-element-player') {
          curDate.status = 'active-element-computer';
          this.scoreComputer++;
        }
      }, this.settingsGame.deleyMs - 50); // Подумай еще над этим числом


      countCompleateInterval++;
    }, this.settingsGame.deleyMs);
  }

  private checkWinner(playerScore: number, player: string, interval: NodeJS.Timer, timeout: NodeJS.Timeout): boolean {
    if (playerScore === this.settingsGame.winScore) {
      clearInterval(interval);
      clearTimeout(timeout);
      this.openResultsGameDialog(player);
      return true;
    }
    return false;
  }
}