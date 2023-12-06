import { Component, OnInit } from '@angular/core';
import { Vehicle } from 'src/app/interfaces/Vehicle';
import { VehicleService } from 'src/app/services/vehicle.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss']
})
export class VehicleComponent implements OnInit {

  titleModal: string = "Crear nuevo vehículo";
  actionButton: string = "Create";
  modalCreateVehicle: boolean = false;
  titleModalInfo: string = "Información de vehículo";
  modalInfoVehicle: boolean = false;
  tableVehicles: Vehicle[] = [];
  vehicle!: Vehicle;
  links: any[] = [];
  requestSearch = {
    'vehicle_type': "",
    'plate': "",
    'owner_names': "",
    'driver_names': ""
  }
  

  constructor(private vehicleService: VehicleService){}

  ngOnInit(){
    this.loadTable();
  }

  /**
   * Función que detecta el cambio del modal usado para guardar el vehículo
   * @param resultChange 
   */
  modalCreateVehicleChange(resultChange: boolean){
    this.modalCreateVehicle = resultChange;
    if(!this.modalCreateVehicle){
      this.loadTable();
    }
  }

  /**
   * Función para crear nuevo vehículo
   */
  createNewVehicle(){
    this.titleModal = "Crear nuevo vehículo";
    this.actionButton = "Create";
    this.modalCreateVehicle = true;
  }

  /**
   * Función para ver el vehículo
   */
  viewVehicle(vehicle: Vehicle){
    this.vehicle = vehicle;
    this.titleModalInfo = "Información de vehículo";
    this.modalInfoVehicle = true;
  }

  /**
   * Función para actualizar el vehículo
   */
  updateVehicle(vehicle: Vehicle){
    this.vehicle = vehicle;
    this.titleModal = "Actualezar Vehículo";
    this.actionButton = "Update";
    this.modalCreateVehicle = true;
  }

  /**
   * Función para eliminar un vehículo
   */
  deleteVehicle(vehicle: Vehicle){
    Swal.fire('Hello world!');
    Swal.fire({
      title: "Eliminar",
      text: "¿Esta seguro de eliminar este vehiculo?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.vehicleService.deleteVehicle(vehicle.id).subscribe( (result: any) => {
          if(result.success){
            this.loadTable();
            Swal.fire({
              title: "Eliminado!",
              text: "Vehiculo eliminado con exito.",
              icon: "success"
            });
          }
        })
        
      }
    });
    
  }

  /**
   * Detecta el cambio para consultar
   */
  selectChange(event: Event, name: string = ""){
    const target = event.target as HTMLSelectElement;
    const selectedValue = target.value;
    const selectName = target.name; 
    switch(selectName){
      case 'plate':
        this.requestSearch.plate = selectedValue;
        break;
      case 'vehicle_type':
        this.requestSearch.vehicle_type = selectedValue;
        break;
      case 'owner_names':
        this.requestSearch.owner_names = selectedValue;
        break;
      case 'driver_names':
        this.requestSearch.driver_names = selectedValue;
        break;
    }
    
    this.loadTable();
  }

  /**
   * Realiza la paginación
   * @param url 
   */
  pagination(url: string){
    this.loadTable(url);
  }

  /**
   * Carga la información de la tabla de vehículos
   */
  loadTable(url: string = ""){
    this.vehicleService.getVehicleParams(this.requestSearch, url).subscribe( (result: any) => {
      this.tableVehicles = result.data.data;
      this.links = result.data.links;
    })
  }
}
