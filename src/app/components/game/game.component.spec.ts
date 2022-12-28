import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { CoreGameService } from 'src/app/shared/services/core-game.service';

import { GameComponent } from './game.component';

xdescribe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;
  let CoreGameServiceStub: Partial<CoreGameService>;

  beforeEach(async () => {
    CoreGameServiceStub = {
  
    };
    await TestBed.configureTestingModule({
      declarations: [GameComponent],
      providers: [{ provide: CoreGameService, useValue: CoreGameServiceStub }, {
      }],
      imports: [MatDialogModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
