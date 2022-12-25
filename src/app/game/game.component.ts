import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { WelcomeGameModalComponent } from '../welcome-game-modal/welcome-game-modal.component';

interface IDate {
  id: number,
  status: string,
}

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})


export class GameComponent implements OnInit {

  public date: IDate[] = [];
  public generatedNumbers: number[] = [];

  public countCeils = 100;
  public deleyMs = 1500;

  public scoreComputer: number = 0;
  public scorePlayer: number = 0;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.genereteObject();
    this.activateCell();
  }

  public OpenModal(): void {
    this.dialog.open(WelcomeGameModalComponent,{})
  }

  private genereteObject(): void {
    for (let ceil = 1; ceil <= this.countCeils; ceil++) {
      this.date.push({ id: ceil, status: 'default' });
    }
  }

  public clickPlayer(status: string, element: IDate): void {
    if (status === 'active-element-computer') {
      this.date[element.id - 1].status = 'active-element-player';
      this.scorePlayer++;
    }
  }

  public activateCell(): void {
    const arr = this.getRandomNumbers();
    let count = 0;

    const interval = setInterval(() => {

      if (this.scoreComputer === 10) {
        clearInterval(interval);
        alert('Победил компуктер');
        return;
      } else if (this.scorePlayer === 10) {
        clearInterval(interval);
        alert('Победил плаер');
        return;
      }
      const randomNumber = arr[count];
      const curDate = this.date[randomNumber - 1];
      if (curDate.status !== 'active-element-player') {
        curDate.status = 'active-element-computer';
        setTimeout(() => {
          if (curDate.status !== 'active-element-player') {
            curDate.status = 'diactive-element-computer';
            this.scoreComputer++;
          }
        }, this.deleyMs);

      }
      count++;

    }, this.deleyMs);

  }

  public shuffle(array: number[]) {
    let currentIndex = array.length;
    let randomIndex = 0;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  public fillArray(numberElements: number) {
    const arr = [];

    for (let i = 1; i <= numberElements; i++) {
      arr.push(i);
    }

    return arr;
  }

  public getRandomNumbers(): number[] {
    const array = this.fillArray(100);
    return this.shuffle(array);
  }
}


      // if (curDate.status !== 'active-element-player') {
      //   curDate.status = 'active-element-computer';
      //   setTimeout(() => {
      //     if (curDate.status !== 'active-element-player') {
      //       curDate.status = 'diactive-element-computer';
      //       this.scoreComputer++;
      //     }
      //   }, this.deleyMs);

      // }