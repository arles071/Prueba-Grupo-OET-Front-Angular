import { Person } from "./Person";

export interface Vehicle {
    id: number;
    plate: string;
    color: string;
    brand: string;
    vehicle_type: string;
    driver: Person; //conductor
    owner: Person; //propietario
  }
