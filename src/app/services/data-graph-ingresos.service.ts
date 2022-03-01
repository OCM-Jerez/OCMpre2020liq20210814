import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataGraphIngresosService {
  ecoIngreso = "";

  public getEcoIngreso(): string {
    return this.ecoIngreso;
  }

  constructor() { }
}
