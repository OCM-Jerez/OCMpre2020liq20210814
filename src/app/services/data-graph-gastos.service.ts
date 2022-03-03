import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataGraphGastosService {
  ecoGasto = "";

  public getEcoGasto(): string {
    return this.ecoGasto;
  }

  constructor() { }
}
