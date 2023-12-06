import { Component, Input, Output, SimpleChanges, EventEmitter} from '@angular/core';
import { Vehicle } from 'src/app/interfaces/Vehicle';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'modal-info-vehicle',
  templateUrl: './info-vehicle.component.html',
  styleUrls: ['./info-vehicle.component.scss']
})
export class InfoVehicleComponent {
  
  @Input() title: string = "";
  @Input() visible: boolean = false;
  @Input() vehicle!: Vehicle;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();


  constructor() {}

  /**
   * Detecta el cambio cuanod carga el modal
   * @param changes 
   */
  ngOnChanges(changes: SimpleChanges) {
    
    if(this.visible){
      this.vehicle = this.vehicle;
    }
  }

 
  /**
   * Función para ocultar el modal
   */
  closeModal() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }
}
