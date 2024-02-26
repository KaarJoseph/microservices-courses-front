import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutenticacionComponent } from './pages/autenticacion/autenticacion.component';
import { GestionComponent } from './pages/gestion/gestion.component';
import { InscripcionComponent } from './pages/inscripcion/inscripcion.component';
import { RegistroComponent } from './pages/registro/registro.component';

const routes: Routes = [
  { path: '', redirectTo: 'pages/autenticacion', pathMatch: 'full' },
  {path:"pages/autenticacion",component: AutenticacionComponent},
  {path:"pages/gestion",component: GestionComponent},
  {path:"pages/inscripcion",component: InscripcionComponent},
  {path:"pages/registro",component: RegistroComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
