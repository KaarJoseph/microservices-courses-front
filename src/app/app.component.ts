import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cursos';

  usuarioAutenticado: boolean = false;

  onAutenticado(autenticado: boolean) {
    this.usuarioAutenticado = autenticado;
  }

}
