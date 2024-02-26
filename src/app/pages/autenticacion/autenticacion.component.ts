import { Component, Output, EventEmitter } from '@angular/core';
import { Student } from 'src/app/domain/students';
import { StudentService } from 'src/app/services/student.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-autenticacion',
  templateUrl: './autenticacion.component.html',
  styleUrls: ['./autenticacion.component.css']
})
export class AutenticacionComponent {
  usuario: Student = new Student();
  @Output() autenticado: EventEmitter<Student | null> = new EventEmitter<Student | null>();
  errorAutenticacion?: string;

  constructor(private studentService: StudentService, private router: Router) {}

  login() {
    // Limpiar el mensaje de error al intentar iniciar sesión nuevamente
    this.clearError();

    this.studentService.login(this.usuario)
      .pipe(
        catchError((error) => {
          // Manejar el error de autenticación
          console.error('Error de autenticación:', error);
          this.errorAutenticacion = 'Credenciales inválidas';
          this.autenticado.emit(null); // Emitir null en caso de error
          return throwError(error);
        })
      )
// ... (código previo)

.subscribe(
  (estudiante: Student | null) => {
    // Emitir el evento de autenticación con el estudiante logueado
    console.log('Estudiante logueado:', estudiante);

    this.autenticado.emit(estudiante);

    // Redirigir a la página de gestión
    if (estudiante) {
      this.router.navigate(['pages/gestion']);
    }
  },
        (error) => {
          // Manejar el error de autenticación
          console.error('Error al intentar autenticar:', error);
          this.errorAutenticacion = 'Credenciales inválidas';
          this.autenticado.emit(null); // Emitir null en caso de error
        }
      );
  }

  register() {
    // Redirige a la página de registro
    this.router.navigate(['pages/registro']);
  }

  private clearError() {
    // Método para limpiar el mensaje de error
    this.errorAutenticacion = undefined;
  }
}
