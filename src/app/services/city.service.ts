import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  private apiUrl = "";

  constructor(private http: HttpClient) {
    this.apiUrl = environment.url  + "cities";
  }

  // Obtener todas las ciudades
  getCities(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Obtener una ciudad por ID
  getCity(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url);
  }

}