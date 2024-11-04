import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-test-checkbox',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './test-checkbox.component.html',
  styleUrl: './test-checkbox.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TestCheckboxComponent),
      multi: true
    }
  ]
})
export class TestCheckboxComponent implements ControlValueAccessor {
  @Input() skills: string[] = [];
  selectedSkills: string[] = [];

  onChange = (skills: string[]) => {};
  onTouched = () => {};

  writeValue(skills: string[]): void {
    this.selectedSkills = skills || [];
  }

  registerOnChange(fn: (skills: string[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  toggleSkill(skill: string): void {
    if (this.selectedSkills.includes(skill)) {
      this.selectedSkills = this.selectedSkills.filter(s => s !== skill);
    } else {
      this.selectedSkills.push(skill);
    }
    this.onChange(this.selectedSkills);
    this.onTouched();
  }

  selectAll(): void {
    this.selectedSkills = this.skills;
    this.onChange(this.selectedSkills);
    this.onTouched();
  }

  deselectAll(): void {
    this.selectedSkills = [];
    this.onChange(this.selectedSkills);
    this.onTouched();
  }

  toggleAllSelection(): void {
    if (this.selectedSkills.length === this.skills.length) {
      this.deselectAll();
    } else {
      this.selectAll();
    }
  }
}
