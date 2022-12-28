import { TestBed } from '@angular/core/testing';
import { CoreGameService } from './core-game.service';

describe('GenerateObjectsService', () => {
  let service: CoreGameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoreGameService);
  });

  const amountNumbers = 100;

  it('should be created array with 100 elements ', () => {
    expect(service.getNumbers(amountNumbers).length).toBe(amountNumbers);
  });

  it('the total sum of numbers should be 5050', () => {
    const totalSumNumbers = service.getNumbers(amountNumbers).reduce((acc, cur) => acc + cur, 0);

    expect(totalSumNumbers).toBe(5050);
  });

  it('should be array have only unique numbers', () => {
    const arrayNumbers = service.getNumbers(amountNumbers);

    const uniqueNumbers = [...new Set(arrayNumbers)];

    expect(arrayNumbers.length).toBe(uniqueNumbers.length);
  });

  it('should be array have only numbers <= 100', () => {
    const arrayNumbers = service.getNumbers(amountNumbers);

    const arrayNumbersFiletered = service.getNumbers(amountNumbers).filter((el) => el <= 100);

    expect(arrayNumbers.length).toBe(arrayNumbersFiletered.length);
  });


  it('should be created array with 100 objects and first element must be contain field id: 1 and status: "default"', () => {
    const amountObjects = 100;

    expect(service.generateObjects(amountObjects).length).toBe(amountObjects);
    expect(service.generateObjects(amountObjects)[0].id).toBe(1);
    expect(service.generateObjects(amountObjects)[0].status).toBe('default');
  });

  it('should be shuffled array.', () => {
    const numbers = service.getNumbers(amountNumbers);

    const shuffledNumbers = service.shuffleNumbers(numbers);

    const isShufflered = shuffledNumbers.some((el, idx, arr) => el + 1 !== arr[idx + 1]);

    expect(isShufflered).toBeTruthy();
  });

  it('should be generated numbers and shuffled', () => {
    const numbers = service.getNumbers(amountNumbers);

    const shuffledNumbers = service.shuffleNumbers(numbers);

    const isShufflered = shuffledNumbers.some((el, idx, arr) => el + 1 !== arr[idx + 1]);

    expect(numbers.length).toBe(amountNumbers);
    expect(isShufflered).toBeTruthy();

  });
});