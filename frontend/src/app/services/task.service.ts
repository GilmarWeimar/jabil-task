import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private api = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getTasks() {
    return this.http.get<any>(this.api);
  }

  getById(id: string) {
    return this.http.get<any>(`${this.api}/${id}`);
  }

  create(data: any) {
    return this.http.post(this.api, data);
  }

  update(id: string, data: any) {
    return this.http.put(`${this.api}/${id}`, data);
  }

  delete(id: string) {
    return this.http.delete(`${this.api}/${id}`);
  }
}