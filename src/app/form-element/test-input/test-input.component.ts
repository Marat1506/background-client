import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

interface Styles {
  width: string,
  height: string,
}

@Component({
  selector: 'app-test-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './test-input.component.html',
  styleUrl: './test-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TestInputComponent),
      multi: true
    }
  ]
})
export class TestInputComponent implements ControlValueAccessor {
  @Input() type: string = "text";
  @Input() placeholder: string = "";
  @Input() styles: Styles = { width: '300px', height: '30px' };

  inputValue: string = "";

  onChange = (value: string) => {};
  onTouched = () => {};

  writeValue(value: string): void {
    this.inputValue = value;
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

  onInputChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = target ? target.value : '';
    this.inputValue = value;
    this.onChange(value); // Убедитесь, что это передает значение в контроллер формы
    this.onTouched();
  }
  onInputBlur(): void {
    this.onTouched();
  }
}
