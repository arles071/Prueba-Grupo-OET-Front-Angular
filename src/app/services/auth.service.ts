import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = "";

  constructor(private http: HttpClient) {
    this.apiUrl = environment.url  + "login";
  }

  /**
   * login
   * @param data 
   * @returns 
   */
  login(data: any){
    return this.http.post<any>(this.apiUrl, data)
  }

  /**
   * Validar si el usuario tiene un tequen guardado en localStore
   * @returns 
   */
  getToken(){
    let token = localStorage.getItem('token');
    if(token !== undefined){
      return token       
    }
    return null;
  }

  /**
   * Eliminar el token de localStore
   */
  logout(){
    localStorage.removeItem('token');
  }

}