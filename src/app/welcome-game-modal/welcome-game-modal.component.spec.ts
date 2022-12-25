import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeGameModalComponent } from './welcome-game-modal.component';

describe('WelcomeGameModalComponent', () => {
  let component: WelcomeGameModalComponent;
  let fixture: ComponentFixture<WelcomeGameModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WelcomeGameModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WelcomeGameModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
