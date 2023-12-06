import { Component, Input, Output, EventEmitter, SimpleChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Person } from 'src/app/interfaces/Person';
import { Vehicle } from 'src/app/interfaces/Vehicle';
import { CityService } from 'src/app/services/city.service';
import { PersonService } from 'src/app/services/person.service';
import { VehicleService } from 'src/app/services/vehicle.service';

import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'modal-create-person',
  templateUrl: './create-person.component.html',
  styleUrls: ['./create-person.component.scss']
})
export class CreatePersonComponent implements OnInit {
  
  formulario: FormGroup;
  cities: any[] = [];
  @Input() title: string = "";
  @Input() visible: boolean = false;
  @Input() action!: string;
  @Input() person!: Person;
  
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();


  constructor(private formBuilder: FormBuilder,
    private personService: PersonService,
    private cityService: CityService) { 

    //Inicializa el formulario
    this.formulario = this.formBuilder.group({
        identification_number: ['', Validators.required],
        first_name: ['', Validators.required],
        middle_name: '',
        last_name: ['', Validators.required],
        phone: ['', Validators.required],
        address: ['', Validators.required],
        city: ['', Validators.required],
    });
  }

  ngOnInit(){
    this.cityService.getCities().subscribe( (result: any) => {
      this.cities = result.data;
    })
  }


  /**
   * Detecta el cambio cuano carga el modal
   * @param changes 
   */
  ngOnChanges(changes: SimpleChanges) {
    
    if(this.visible && (this.action == "Info" || this.action == "Update")){
      this.person = this.person;

      // Actualizar los valores del formulario con la nueva información.
      this.formulario.patchValue(this.person);
    } else if(this.visible) {
      this.formulario.reset();
    }
  }

  /**
   * Función para enviar el formulario
   */
  submit(){
    
    if (this.formulario.valid) {
      const personData: Person = this.formulario.value;

      switch(this.action){
        case 'Create':
          this.saveNewPerson(personData);
          break;
        case 'Update':
          this.updatePerson(this.person.id, personData);
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
        
        this.formulario.controls['first_name'].setValue(dataPerson.first_name);
        this.formulario.controls['middle_name'].setValue(dataPerson.middle_name);
        this.formulario.controls['last_name'].setValue(dataPerson.last_name);
        this.formulario.controls['address'].setValue(dataPerson.address);
        this.formulario.controls['phone'].setValue(dataPerson.phone);
        this.formulario.controls['city'].setValue(dataPerson.city);
        
      } else {
        this.formulario.controls['first_name'].reset();
        this.formulario.controls['middle_name'].reset();
        this.formulario.controls['last_name'].reset();
        this.formulario.controls['address'].reset();
        this.formulario.controls['phone'].reset();
        this.formulario.controls['city'].reset();
      }
    });
       
  }

  /**
   * Función para guardar una nueva persona
   * @param personData 
   */
  saveNewPerson(personData: Person){
    this.personService.createPerson(personData).subscribe(
      (response: any) => {
        if(response.success){
          this.closeModal();
          Swal.fire({
            title: "Guardado!",
            text: "Persona guardada con exito.",
            icon: "success"
          });
          
        }
      },
      (error) => {
        console.error('Error al crear la persona', error);
      }
    );
  }

  /**
   * Función para actualizar una persona
   * @param personData 
   */
  updatePerson(id: number, personData: Person){
    this.personService.updatePerson(id, personData).subscribe(
      (response: any) => {
        if(response.success){
          this.closeModal();
        
          Swal.fire({
            title: "Actualizado!",
            text: "Persona actualizada con exito.",
            icon: "success"
          });
        
        }
      },
      (error) => {
        console.error('Error al actualizar la persona', error);
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
