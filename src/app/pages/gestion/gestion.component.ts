// gestion.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from 'src/app/domain/course';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.css']
})
export class GestionComponent implements OnInit {

  courses: Course[] = [];

  constructor(private courseService: CourseService, private router: Router) { }

  ngOnInit(): void {
    this.getCourses();
  }

  getCourses(): void {
    this.courseService.getAllCourses().subscribe(courses => this.courses = courses);
  }

  logout(): void {
    // Lógica para cerrar la sesión, por ejemplo, limpiar token, etc.
    // Redirigir a la página de autenticación
    this.router.navigate(['pages/autenticacion']);
  }

  verMisCursos(): void {
    // Redirigir a la página de mis cursos
    this.router.navigate(['pages/inscripcion']); // Asegúrate de tener la ruta configurada
  }

}
