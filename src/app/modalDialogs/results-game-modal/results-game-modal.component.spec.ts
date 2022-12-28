import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { ResultsGameModalComponent } from './results-game-modal.component';

xdescribe('ResultsGameModalComponent', () => {
  let component: ResultsGameModalComponent;
  let fixture: ComponentFixture<ResultsGameModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResultsGameModalComponent],
      imports: [MatDialogModule, MatDialog]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ResultsGameModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});