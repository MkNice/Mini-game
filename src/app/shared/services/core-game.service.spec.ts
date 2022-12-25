import { TestBed } from '@angular/core/testing';
import { CoreGameService } from './core-game.service';


describe('GenerateObjectsService', () => {
  let service: CoreGameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoreGameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});