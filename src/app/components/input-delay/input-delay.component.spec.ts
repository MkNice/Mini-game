import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { InputDelayComponent } from './input-delay.component';

describe('InputDelayComponent', () => {
  let component: InputDelayComponent;
  let fixture: ComponentFixture<InputDelayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputDelayComponent],
      imports: [ReactiveFormsModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(InputDelayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create form with 1 control', () => {
    expect(component.formSettings.contains('delay')).toBeTruthy();
  });


  it('should mark delay as invalid if empty value', () => {
    const control = component.formSettings.get('delay');

    control?.setValue('');

    expect(control?.valid).toBeFalsy();
  });

  it('should mark delay as invalid if value < 150', () => {
    const control = component.formSettings.get('delay');

    control?.setValue(149);

    expect(control?.valid).toBeFalsy();
  });

  it('should mark delay as invalid if value > 5000', () => {
    const control = component.formSettings.get('delay');

    control?.setValue(5001);

    expect(control?.valid).toBeFalsy();
  });

  it('should contain empty string', () => {
    expect(component.formSettings.value.delay).toBe('');
  });
});