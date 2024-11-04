import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

interface Styles {
  width: string,
  height: string,

}

@Component({
  selector: 'app-test-select',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './test-select.component.html',
  styleUrl: './test-select.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TestSelectComponent),
      multi: true,
    }
  ]
})
export class TestSelectComponent {
  @Input() params: string[] = ["Не женат / не замужем", "Женат / замужем"]
  @Input() styles: Styles = { width: '300px', height: '30px' };

  selectValue: string = "";

  onChange = (value: string) => {};
  onTouched = () => {};

  writeValue(value: string): void {
    this.selectValue = value;
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

  onSelectChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const value = target ? target.value : '';
    this.selectValue = value;
    this.onChange(value); // Обновляем значение в контроллере формы
    this.onTouched();
  }
  onSelectBlur(): void {
    this.onTouched();
  }
}
