import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  formLogin: FormGroup;
  constructor(
    public formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router
    ) {
    
    this.formLogin = this.formBuilder.group({
      usuario: ['administrator@example.com', Validators.required],
      password: ['admin', Validators.required]
    });
   }

  ngOnInit() {

    if(this.auth.getToken() != null){
      this.router.navigate(['vehiculos/']);
    }
    
  }

  /**
   * Función para realizar el login
   */
  submit() {
    let params = {
      "email" : this.formLogin.value.usuario,
      "password" : this.formLogin.value.password
    };
    
    this.auth.login(params).subscribe( res => {

      //asigno el valor a una variable
      let token = res.data.token;
      localStorage.setItem('token', token);

      if(this.auth.getToken() != null)
        this.router.navigate(['vehiculos/']);
      
    }, (error: any) => {
      alert('Usuario o contraseña incorrecto');
      console.log(error);
    });
  }
}
