
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormGeneratorService } from './form-generator.service';
import { HttpClient } from '@angular/common/http';
import { TestInputComponent } from './form-element/test-input/test-input.component';
import { TestSelectComponent } from "./form-element/test-select/test-select.component";
import { TestCheckboxComponent } from "./form-element/test-checkbox/test-checkbox.component";
import { TestNumberComponent } from "./form-element/test-number/test-number.component";
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';


interface UserData {
  name: string;
  age: number;
  family_status: string;
  university: string;
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
  formConfig: any;
  number_places_studied: number = 1;
  myForms: UserData[] = [];
  isEdit:boolean = false;
  currentEditingId:string = "";
  formEdit: UserData[] = []
  public myForm = new FormGroup({
    name: new FormControl('', Validators.required),
    age: new FormControl('', Validators.required),
    family_status: new FormControl('', Validators.required),
    university: new FormControl('', Validators.required),
    place_birth: new FormControl('', Validators.required),
    skills: new FormControl<string[] | null>([]),
  })



  constructor(private formService: FormGeneratorService) { }

  public ngOnInit(): void {
    const data = this.formService.getAnkets().subscribe({
      next: (data: UserData[]) => {
        console.log("gg = ", data)
        console.log("gg = ",)
        this.myForms = data

        console.log("ff = ", this.myForms)
      },
      error: (error) => {
        console.log("Ошибка: ", error)
      }
    })
  }

  public add_places_studied() {
    console.log("dkmdf")
    this.number_places_studied++;
  }

  public delete_places_studied() {
    this.number_places_studied--;
  }

  public send_form() {
    if (this.myForm.valid) {
      this.formService.addAnketa(this.myForm.value).subscribe({
        next: (response: any) => {
          console.log("Форма успешно отправлена: ", response);
          this.myForms.push(response);
          this.myForm.reset();
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
    console.log("ID для удаления: ", id);
    this.formService.removeAnketa(id).subscribe({
      next: (response) => {
        console.log("Форма успешно удалена");
        this.myForms = this.myForms.filter(form => form._id !== id);
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
          age: data.age.toString(), 
          family_status: data.family_status,
          university: data.university,
          place_birth: data.place_birth,
          skills: data.skills
        };
        this.myForm.patchValue(formData);
      },
      error: (error: string) => {
        console.log("Ошибка при изменении формы 2:" + error)
      }
    })
  }

  public cancelEdit() {
    this.isEdit = !this.isEdit
    const formData = {
      name: "",
      age: null, 
      family_status: "",
      university: "",
      place_birth: null,
      skills: []
    };
    this.myForm.patchValue(formData);
  }
}
