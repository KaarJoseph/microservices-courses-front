import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/domain/students';
import { StudentService } from 'src/app/services/student.service';
import { Course } from 'src/app/domain/course';
import { CourseService } from 'src/app/services/course.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inscripcion',
  templateUrl: './inscripcion.component.html',
  styleUrls: ['./inscripcion.component.css']
})
export class InscripcionComponent implements OnInit {
  loggedInStudent: Student | null = null;
  allCourses: Course[] = [];

  constructor(private studentService: StudentService, private courseService: CourseService, private router: Router) {}

  ngOnInit() {
    // Obtener directamente el estudiante logueado
    this.loggedInStudent = this.studentService.getLoggedInStudent();

    // Loguea en la consola para verificar si se recibió correctamente el estudiante
    console.log('Estudiante logueado en InscripcionComponent:', this.loggedInStudent);

    // Obtener todos los cursos
    this.courseService.getAllCourses().subscribe(
      (courses: Course[]) => {
        // Al recibir los cursos, almacenarlos en la variable allCourses
        this.allCourses = courses;
      },
      (error) => {
        // Manejar el error al obtener los cursos, si es necesario
        console.error('Error al obtener los cursos:', error);
      }
    );
  }
  atras(): void{
    this.router.navigate(['pages/gestion']);
  }
}
