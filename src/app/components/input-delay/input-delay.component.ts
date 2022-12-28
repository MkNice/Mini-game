import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-input-delay',
  templateUrl: './input-delay.component.html',
  styleUrls: ['./input-delay.component.css']
})

export class InputDelayComponent {
  @Output() delayUser: EventEmitter<number> = new EventEmitter<number>();

  public formSettings!: FormGroup;

  constructor(formBuilder: FormBuilder) {
    this.formSettings = formBuilder.group({
      delay: new FormControl('', [
        Validators.min(150),
        Validators.max(5000),
        Validators.required
      ])
    });
  }

  public startGame(): void {
    this.delayUser.emit(this.formSettings.value.delay);
  }

}