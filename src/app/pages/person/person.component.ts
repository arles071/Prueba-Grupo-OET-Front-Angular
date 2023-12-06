import { Component, OnInit } from '@angular/core';
import { Person } from 'src/app/interfaces/Person';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {

  titleModal: string = "Crear nueva persona";
  actionButton: string = "Create";
  modalCreatePerson: boolean = false;
  tablePerson: Person[] = [];
  person!: Person;
  links: any[] = [];
  requestSearch = {
    'number_document': ""
  }

  constructor(private personService: PersonService){}

  ngOnInit(){
    this.loadTable();
  }

  
  /**
   * Obtiene el cambio del modal que genera la creación o actualización de la persona
   * @param resultChange 
   */
  modalCreatePersonChange(resultChange: boolean){
    this.modalCreatePerson = resultChange;
    if(!this.modalCreatePerson){
      this.loadTable();
    }
  }

  /**
   * Abre el modal para crear nueva persona
   */
  createNewPerson(){
    this.titleModal = "Crear nueva persona";
    this.actionButton = "Create";
    this.modalCreatePerson = true;
  }


  /**
   * Abre el modal para actualizar persona
   * @param person 
   */
  updatePerson(person: Person){
    this.person = person;
    this.titleModal = "Actualezar Persona";
    this.actionButton = "Update";
    this.modalCreatePerson = true;
  }

  /**
   * Detecta el cambio para consultar solo por documentos que coinsidan
   */
  selectChange(event: Event, name: string = ""){
    const target = event.target as HTMLSelectElement;
    const selectedValue = target.value;
    const selectName = target.name; 
    this.requestSearch.number_document = selectedValue;
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
   * Carga la data de las personas registradas
   */
  loadTable(url: string = ""){
    this.personService.getPeopleParams(this.requestSearch, url).subscribe((result: any) => {
      this.tablePerson = result.data.data;
      this.links = result.data.links;
    });
  }

}
