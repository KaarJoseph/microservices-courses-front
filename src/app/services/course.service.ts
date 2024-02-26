// course.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../domain/course';
import { Student } from '../domain/students';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private baseUrl: string = "http://localhost:9090/api/course";

  constructor(private http: HttpClient) { }

  createCourse(course: Course): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/create`, course);
  }

  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.baseUrl}/all`);
  }

  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.baseUrl}/search/${id}`);
  }

  getStudentsByCourseId(courseId: number): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.baseUrl}/search-student/${courseId}`);
  }
}
