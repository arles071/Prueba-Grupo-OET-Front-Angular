// vehicle.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vehicle } from '../interfaces/Vehicle';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  private apiUrl = "";

  constructor(private http: HttpClient) {
    this.apiUrl = environment.url  + "vehicles";
  }

  getVehicles(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(this.apiUrl);
  }

  /**
   * Obtiene la consulta en tipo get pero me permite enviar parametros
   */
  getVehicleParams(object: any, url: string = ""): Observable<Vehicle[]> {

    let params = new HttpParams().set('vehicle_type', object.vehicle_type)
                                  .set('plate', object.plate)
                                  .set('owner_names', object.owner_names)
                                  .set('driver_names', object.driver_names);
                                  

    if(url != "")
        return this.http.get<Vehicle[]>(url, { params: params });

    // Realizar la solicitud GET con los parámetros
    return this.http.get<Vehicle[]>(this.apiUrl, { params: params });
  
  }

  getVehicle(id: number): Observable<Vehicle> {
    return this.http.get<Vehicle>(`${this.apiUrl}/${id}`);
  }

  createVehicle(vehicleData: Vehicle): Observable<Vehicle> {
    return this.http.post<Vehicle>(this.apiUrl, vehicleData);
  }

  updateVehicle(id: number, vehicleData: Vehicle): Observable<Vehicle> {
    return this.http.put<Vehicle>(`${this.apiUrl}/${id}`, vehicleData);
  }

  deleteVehicle(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}