import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './pages/includes/navbar/navbar.component';
import { VehicleComponent } from './pages/vehicle/vehicle.component';
import { CreateComponent } from './pages/vehicle/modals/create/create.component';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { SpinnerInterceptor } from './interceptors/spinner.interceptor';
import { SpinnerModule } from './pages/includes/spinner/spinner.module';
import { PersonComponent } from './pages/person/person.component';
import { LoginComponent } from './pages/login/login.component';
import { CreatePersonComponent } from './pages/person/modals/create-person/create-person.component';
import { InfoVehicleComponent } from './pages/vehicle/modals/info-vehicle/info-vehicle.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    VehicleComponent,
    CreateComponent,
    PersonComponent,
    CreatePersonComponent,
    LoginComponent,
    InfoVehicleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SpinnerModule,
    SweetAlert2Module.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
