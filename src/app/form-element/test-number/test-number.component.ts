import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { TestInputComponent } from '../test-input/test-input.component';

interface Styles {
  width: string,
  height: string,

}
@Component({
  selector: 'app-test-number',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './test-number.component.html',
  styleUrl: './test-number.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TestNumberComponent),
      multi: true
    }
  ]
})
export class TestNumberComponent {
  @Input() number: number = 1;
  @Input() styles: Styles = {width: '300px', height: '30px'};

  numberValue: string = "";

  onChange = (value: string) => {};
  onTouched = () => {};

  writeValue(value: string): void {
    this.numberValue = value;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // Опционально: обработка, если компонент должен быть отключен
  }

  onNumberChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = target ? target.value : '';
    this.numberValue = value;
    this.onChange(value); // Убедитесь, что это передает значение в контроллер формы
    this.onTouched();
  }
  onNumberBlur(): void {
    this.onTouched();
  }
}

