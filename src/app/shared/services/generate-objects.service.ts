import { Injectable } from '@angular/core';
import { ICeilData, ISettingsGame } from '../interfaces/game.interface';

@Injectable({
  providedIn: 'root'
})

export class GenerateObjectsService {

  constructor() { }

  public getRandomNumbers(settings: ISettingsGame) {
    const numbers = this.getNumbers(settings.countCeils);

    return this.shuffleNumbers(numbers);
  }

  private shuffleNumbers(numbers: number[]) {
    for (let currentIndex = numbers.length - 1; currentIndex > 0; currentIndex--) {
      let randomIndex = Math.floor(Math.random() * (currentIndex + 1));

      [numbers[currentIndex], numbers[randomIndex]] = [
        numbers[randomIndex],
        numbers[currentIndex],
      ];
    };

    return numbers;
  }

  private getNumbers(amountNumbers: number) {
    const numbers = [];

    for (let number = 1; number <= amountNumbers; number++) {
      numbers.push(number);
    }

    return numbers;
  }

  public generateObjects(countCeils: number): ICeilData[] {
    const dataCeil = [];

    for (let ceil = 1; ceil <= countCeils; ceil++) {
      dataCeil.push({ id: ceil, status: 'default' });
    }

    return dataCeil;
  }
}