
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormGeneratorService } from './form-generator.service';
import { HttpClient } from '@angular/common/http';
import { TestInputComponent } from './form-element/test-input/test-input.component';
import { TestSelectComponent } from "./form-element/test-select/test-select.component";
import { TestCheckboxComponent } from "./form-element/test-checkbox/test-checkbox.component";
import { TestNumberComponent } from "./form-element/test-number/test-number.component";
import { CommonModule } from '@angular/common';
import { FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';


export interface UserData {
  name: string;
  age: number;
  family_status: string;
  university: string[];
  place_birth: string;
  skills: string[];
  _id: string;
}


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    TestInputComponent,
    TestSelectComponent,
    TestCheckboxComponent,
    TestNumberComponent,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  number_places_studied: number = 1;
  myForms: UserData[] = [];
  isEdit:boolean = false;
  currentEditingId:string = "";
  formEdit: UserData[] = []
  public myForm = new FormGroup({
    name: new FormControl('', Validators.required),
    age: new FormControl(0, Validators.required),
    family_status: new FormControl('', Validators.required),
    university: new FormArray([new FormControl('', Validators.required)]),
    place_birth: new FormControl('', Validators.required),
    skills: new FormControl<string[] | null>([]),
  })



  constructor(private formService: FormGeneratorService) { }


  public ngOnInit(): void {
    const data = this.formService.getAnkets().subscribe({
      next: (data: UserData[]) => {
        this.myForms = data
      },
      error: (error) => {
        console.log("Ошибка: ", error)
      }
    })
  }

  get universityControls() {
    return this.myForm.get('university') as FormArray;
  }

  public add_places_studied() {
    this.number_places_studied++;
    this.universityControls.push(new FormControl('', Validators.required));
  }

  public delete_places_studied() {
    this.number_places_studied--;
    this.universityControls.removeAt(this.universityControls.length - 1);
  }

  public send_form() {
    if (this.myForm.valid) {
      const formData = {
        ...this.myForm.value,
        university: this.universityControls.value // Если указано больше 2 и более ВУЗов
      };
      this.formService.addAnketa(this.myForm.value).subscribe({
        next: (response: any) => {
          console.log("Форма успешно отправлена: ", response);
          this.myForms.push(response);
          this.myForm.reset();
          this.number_places_studied = 1;
          this.universityControls.clear();
          this.universityControls.push(new FormControl('', Validators.required));
        },
        error: (error) => {
          console.log("Ошибка при отправке формы", error);
        }
      })
      console.log("Отправка формы: ", this.myForm.value)
    }

    else console.log("Форма не валидна: ", this.myForm.value)
  }

  public delete_anket(id: string) {
    this.formService.removeAnketa(id).subscribe({
      next: (response) => {
        console.log("Форма успешно удалена");
        this.myForms = this.myForms.filter(form => form._id !== id); // обновляем формы на странице 
      },
      error: (error) => {
        console.log("Ошибка при удалении формы", error);
      }
    });


  }
  public update_anketa() {
    this.isEdit = !this.isEdit
    const updatedData = {
      ...this.myForm.value,
      _id: this.currentEditingId 
    };
  
    console.log("Данные для обновления: ", updatedData);
    this.formService.updateAnketa(updatedData).subscribe({
      next: (response) => {
        console.log("Форма успешно обновлена: ", response);
        this.myForm.reset()
      },
      error: (error) => {
        console.log("Ошибка при обновлении формы", error);
      }
    });

    // получаем все анкеты заново, но это не совсем правильно
    this.formService.getAnkets().subscribe({
      next: (data: UserData[]) => {
        console.log("gg = ", data)
        this.myForms = data
      },
      error: (error) => {
        console.log("Ошибка: ", error)
      }
    })
  }

  public edit_anketa(id: string){
    this.isEdit = !this.isEdit
    this.currentEditingId = id;
    console.log("EDIT_ID = ", id)

    this.formService.getAnketaById(id).subscribe({
      next: (data: UserData) => {
        console.log("Изменение формы...: ", data)
        
        const formData = {
          name: data.name,
          age: data.age, 
          family_status: data.family_status,
          university: data.university,
          place_birth: data.place_birth,
          skills: data.skills
        };
        this.myForm.patchValue(formData);
        this.universityControls.clear()

        data.university.forEach((uni) => {
          this.universityControls.push(new FormControl(uni, Validators.required));
        })

        this.number_places_studied = data.university.length;
      },
      error: (error: string) => {
        console.log("Ошибка при изменении формы 2:" + error)
      }
    })
  }

  public cancelEdit() {
    this.isEdit = !this.isEdit
    this.myForm.reset()

    this.number_places_studied = 1
    
    
  }
}
