import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentService } from 'src/app/services/student.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  registrationForm!: FormGroup; // Agrega el signo de exclamación para indicar que puede ser undefined

  constructor(private fb: FormBuilder, private studentService: StudentService, private router: Router) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.registrationForm = this.fb.group({
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      // Puedes agregar más form controls según sea necesario
    });
  }

  register(): void {
    if (this.registrationForm && this.registrationForm.valid) {
      const newStudent = this.registrationForm.value;

      // Aquí puedes llamar al método del servicio para registrar al nuevo estudiante
      this.studentService.createStudent(newStudent).subscribe(
        () => {
          console.log('Estudiante registrado con éxito');
          // Puedes realizar acciones adicionales si es necesario
          this.router.navigate(['pages/autenticacion']);
        },
        error => {
          console.error('Error al registrar estudiante', error);
        }
      );
    } else {
      console.error('Formulario de registro no válido');
    }
  }

  atras(): void{
    this.router.navigate(['pages/autenticacion']);
  }
}
