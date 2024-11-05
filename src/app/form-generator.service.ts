import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserData } from './app.component';
@Injectable({
  providedIn: 'root'
})
// any :(
export class FormGeneratorService {
  private base_url = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getAnkets(): Observable<any> {
    return this.http.get(`${this.base_url}/getAnkets`);

  }

  getAnketaById(id: string): Observable<any> {
    return this.http.get(`${this.base_url}/getAnketaById?id=${id}`)
  }

  addAnketa(data: any) {
    return this.http.post(`${this.base_url}/addAnketa`, data)
  }

  removeAnketa(id: string) {
    return this.http.post(`${this.base_url}/removeAnketa`, {_id: id})
  }

  updateAnketa( data: any) {
    return this.http.post(`${this.base_url}/updateAnketa`, data)
  }
}
