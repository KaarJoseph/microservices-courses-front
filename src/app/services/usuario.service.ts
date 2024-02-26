import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../domain/students';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private baseUrl: string = "http://localhost:8080/api/student/";

  constructor(private http: HttpClient) { }

  login(credentials: Student): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/login`, credentials);
  }

}
