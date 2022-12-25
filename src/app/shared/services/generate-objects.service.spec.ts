import { TestBed } from '@angular/core/testing';

import { GenerateObjectsService } from './generate-objects.service';

describe('GenerateObjectsService', () => {
  let service: GenerateObjectsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenerateObjectsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});