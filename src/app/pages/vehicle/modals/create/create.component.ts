import { Component, Input, Output, EventEmitter, SimpleChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Person } from 'src/app/interfaces/Person';
import { Vehicle } from 'src/app/interfaces/Vehicle';
import { CityService } from 'src/app/services/city.service';
import { PersonService } from 'src/app/services/person.service';
import { VehicleService } from 'src/app/services/vehicle.service';

import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'modal-create-vehicle',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  
  formulario: FormGroup;
  cities: any[] = [];
  @Input() title: string = "";
  @Input() visible: boolean = false;
  @Input() action!: string;
  @Input() vehicle!: Vehicle;
  
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();


  constructor(private formBuilder: FormBuilder,
    private vehicleService: VehicleService,
    private personService: PersonService,
    private cityService: CityService) { 

    //Inicializa el formulario
    this.formulario = this.formBuilder.group({
      // Información de Vehiculos
      plate: ['', Validators.required],
      color: ['', Validators.required],
      brand: ['', Validators.required],
      vehicle_type: ['', [Validators.required, Validators.pattern(/^(particular|publico)$/)]],

      // Información del Conductor
      driver: this.formBuilder.group({
        identification_number: ['', Validators.required],
        first_name: ['', Validators.required],
        middle_name: '',
        last_name: ['', Validators.required],
        phone: ['', Validators.required],
        address: ['', Validators.required],
        city: ['', Validators.required],
      }),

      // Información del propietario
      owner: this.formBuilder.group({
        identification_number: ['', Validators.required],
        first_name: ['', Validators.required],
        middle_name: '',
        last_name: ['', Validators.required],
        phone: ['', Validators.required],
        address: ['', Validators.required],
        city: ['', Validators.required],
      }),
    });
  }

  ngOnInit(){
    this.cityService.getCities().subscribe( (result: any) => {
      this.cities = result.data;
    })
  }


  /**
   * Detecta el cambio cuanod carga el modal
   * @param changes 
   */
  ngOnChanges(changes: SimpleChanges) {
    
    if(this.visible && (this.action == "Info" || this.action == "Update")){
      this.vehicle = this.vehicle;

      // Actualizar los valores del formulario con la nueva información.
      this.formulario.patchValue(this.vehicle);
    } else if(this.visible) {
      this.formulario.reset();
    }
  }

  /**
   * Función para enviar el formulario
   */
  submit(){
    
    if (this.formulario.valid) {
      const vehicleData: Vehicle = this.formulario.value;

      switch(this.action){
        case 'Create':
          this.saveNewVehicle(vehicleData);
          break;
        case 'Update':
          console.log(this.vehicle);
          this.updateVehicle(this.vehicle.id, vehicleData);
          break;
      }
      
    } else {
      console.log('Formulario inválido. Revise los campos marcados como obligatorios.');
    }

  }


  /**
   * Función que detecta al salir del input de documento
   */
  onInputBlur(event: Event, person: string){
    const target = event.target as HTMLSelectElement;
    const selectedValue = target.value;

    
    this.personService.getPersonFindDocument(selectedValue).subscribe( (result: any) => {
      
      if(result.data != null){
        let dataPerson: Person = result.data;
        
        this.formulario.controls[person].get('first_name')!.setValue(dataPerson.first_name);
        this.formulario.controls[person].get('middle_name')!.setValue(dataPerson.middle_name);
        this.formulario.controls[person].get('last_name')!.setValue(dataPerson.last_name);
        this.formulario.controls[person].get('address')!.setValue(dataPerson.address);
        this.formulario.controls[person].get('phone')!.setValue(dataPerson.phone);
        this.formulario.controls[person].get('city')!.setValue(dataPerson.city);
        
      } else {
        this.formulario.controls[person].get('first_name')!.reset();
        this.formulario.controls[person].get('middle_name')!.reset();
        this.formulario.controls[person].get('last_name')!.reset();
        this.formulario.controls[person].get('address')!.reset();
        this.formulario.controls[person].get('phone')!.reset();
        this.formulario.controls[person].get('city')!.reset();
      }
    });
       
  }

  /**
   * Función para guardar un nuevo vehiculo
   * @param vehicleData 
   */
  saveNewVehicle(vehicleData: Vehicle){
    this.vehicleService.createVehicle(vehicleData).subscribe(
      (response: any) => {
        if(response.success){
          this.closeModal();
          Swal.fire({
            title: "Guardado!",
            text: "Vehiculo guardado con exito.",
            icon: "success"
          });
          
        }
      },
      (error) => {
        console.error('Error al crear el vehículo', error);
      }
    );
  }

  /**
   * Función para actualizar el vehiculo
   * @param vehicleData 
   */
  updateVehicle(id: number, vehicleData: Vehicle){
    this.vehicleService.updateVehicle(id, vehicleData).subscribe(
      (response: any) => {
        if(response.success){
          this.closeModal();
        
          Swal.fire({
            title: "Actualizado!",
            text: "Vehiculo actualizado con exito.",
            icon: "success"
          });
        
        }
      },
      (error) => {
        console.error('Error al actualizar el vehículo', error);
      }
    );
  }

  /**
   * Función para ocultar el modal
   */
  closeModal() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }
}
