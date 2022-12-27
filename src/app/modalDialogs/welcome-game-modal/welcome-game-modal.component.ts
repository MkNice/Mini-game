import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-welcome-game-modal',
  templateUrl: './welcome-game-modal.component.html',
  styleUrls: ['./welcome-game-modal.component.css']
})

export class WelcomeGameModalComponent implements OnInit {
  @Output() delayUser: EventEmitter<number> = new EventEmitter();

  public formSettings: FormGroup = new FormGroup({
    delay: new FormControl('', [
      Validators.min(150),
      Validators.max(5000),
      Validators.required
    ])
  });;

  constructor() { }

  ngOnInit() { }

  public startGame(): void {
    this.delayUser.emit(this.formSettings.value.delay);
  }

}