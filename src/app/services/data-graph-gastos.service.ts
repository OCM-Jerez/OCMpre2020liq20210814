import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataGraphGastosService {
  ecoGasto = "";
  programa = "";
  organico = "";
  capituloGasto = "";
  capituloIngreso = "";

  public getEcoGasto(): string {
    return this.ecoGasto;
  }

  public getPrograma(): string {
    return this.programa;
  }

  public getOrganico(): string {
    return this.organico;
  }

  public getCapituloGasto(): string {
    return this.capituloGasto;
  }

  public getCapituloIngreso(): string {
    return this.capituloIngreso;
  }

  constructor() { }
}
