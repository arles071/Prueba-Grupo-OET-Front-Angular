import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Person } from '../interfaces/Person';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private apiUrl = "";

  constructor(private http: HttpClient) {
    this.apiUrl = environment.url  + "people";
  }

  // Obtener todas las personas
  getPeople(): Observable<Person[]> {
    return this.http.get<Person[]>(this.apiUrl);
  }

  /**
   * Obtiene la consulta en tipo get pero me permite enviar parametros
   * @returns 
   */
  getPeopleParams(object: any, url: string = ""): Observable<Person[]> {

    let params = new HttpParams()
      .set('number_document', object.number_document);

    if(url != ""){
        // Realizar la solicitud GET con los parámetros
        return this.http.get<Person[]>(url, { params: params });
    }
    // Realizar la solicitud GET con los parámetros
    return this.http.get<Person[]>(this.apiUrl, { params: params });
  
  }

  // Obtener una persona por ID
  getPerson(id: number): Observable<Person> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Person>(url);
  }

  // Obtener una persona por ID
  getPersonFindDocument(document: string): Observable<Person> {
    const url = `${this.apiUrl}/document/${document}`;
    return this.http.get<Person>(url);
  }

  // Crear una nueva persona
  createPerson(person: Person): Observable<Person> {
    return this.http.post<Person>(this.apiUrl, person);
  }

  // Actualizar una persona existente
  updatePerson(id: number, person: Person): Observable<Person> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Person>(url, person);
  }

  // Eliminar una persona por ID
  deletePerson(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}