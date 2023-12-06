import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehicleComponent } from './pages/vehicle/vehicle.component';
import { PersonComponent } from './pages/person/person.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './guards/AuthGuard';

const routes: Routes = [
  { path: "", redirectTo: 'login', pathMatch: 'full'},
  {path: "login", component: LoginComponent },
  {path: "vehiculos", component: VehicleComponent, canActivate: [authGuard] },
  { path: "personas", component: PersonComponent, canActivate: [authGuard] },
  { path: "**", redirectTo: 'vehiculos' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
