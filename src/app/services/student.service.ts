import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Student } from '../domain/students';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private baseUrl: string = "http://localhost:8090/api/student";
  private loggedInStudent: Student | null = null; // Variable para almacenar el estudiante logueado
  autenticado: Subject<Student | null> = new Subject<Student | null>(); // Subject para notificar cambios en la autenticación

  constructor(private http: HttpClient) { }

  createStudent(student: Student): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/create`, student);
  }

  getAllStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.baseUrl}/all`);
  }

  getStudentById(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.baseUrl}/search/${id}`);
  }

  getStudentsByCourseId(courseId: number): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.baseUrl}/search-by-course/${courseId}`);
  }

  login(credentials: Student): Observable<Student | null> {
    return this.http.post<Student>(`${this.baseUrl}/login`, credentials)
      .pipe(
        tap(
          student => {
            this.loggedInStudent = student;
            this.autenticado.next(student);
          },
          error => {
            // Manejar el error de autenticación aquí si es necesario
            this.loggedInStudent = null;
            this.autenticado.next(null);
          }
        ),
        catchError(() => {
          // Manejar el error de autenticación aquí si es necesario
          this.loggedInStudent = null;
          this.autenticado.next(null);
          return of(null);
        })
      );
  }

  getLoggedInStudent(): Student | null {
    return this.loggedInStudent;
  }

  // Método para obtener la información completa del estudiante logueado
  getCompleteLoggedInStudent(): Observable<Student | null> {
    if (this.loggedInStudent) {
      return this.http.get<Student>(`${this.baseUrl}/search/${this.loggedInStudent.id}`);
    } else {
      return of(null); // Envuelve el valor null en un Observable
    }
  }

  // Método para desloguear al estudiante
  logout(): void {
    this.loggedInStudent = null;
    this.autenticado.next(null);
  }
}
