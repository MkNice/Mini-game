import { Injectable } from '@angular/core';
import { ICellData, ISettingsGame } from '../interfaces/game.interface';

@Injectable({
  providedIn: 'root'
})

export class CoreGameService {
  public getShuffledNumbers(settings: ISettingsGame): number[] {
    const numbers = this.getNumbers(settings.countCells);

    return this.shuffleNumbers(numbers);
  }

  public shuffleNumbers(numbers: number[]): number[] {
    for (let currentIndex = 0; currentIndex < numbers.length; currentIndex++) {
      const randomIndex = Math.floor(Math.random() * (currentIndex + 1));

      [numbers[currentIndex], numbers[randomIndex]] = [
        numbers[randomIndex],
        numbers[currentIndex],
      ];
    }

    return numbers;
  }

  public getNumbers(amountNumbers: number): number[] {
    const numbers = [];

    for (let number = 1; number <= amountNumbers; number++) {
      numbers.push(number);
    }

    return numbers;
  }

  public generateObjects(countCeils: number): ICellData[] {
    const dataCell = [];

    for (let cell = 1; cell <= countCeils; cell++) {
      dataCell.push({ id: cell, status: 'default' });
    }

    return dataCell;
  }
}