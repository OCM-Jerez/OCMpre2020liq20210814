import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataGraphGastosService {
  ecoGasto = "";
  programa = "";
  capituloGasto = "";

  public getEcoGasto(): string {
    return this.ecoGasto;
  }

  public getPrograma(): string {
    return this.programa;
  }

  public getCapituloGasto(): string {
    return this.capituloGasto;
  }

  constructor() { }
}
