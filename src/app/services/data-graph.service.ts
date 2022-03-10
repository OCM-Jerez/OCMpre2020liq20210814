import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataGraphService {
  data = "";
  titleSelect = "";
  optionSelect = "";
  errorSelect = "";
  URLSelect = "";

  getData(): string {
    return this.data;
  }

  getTitleSelect(): string {
    return this.titleSelect;
  }

  getOptionSelect(): string {
    return this.optionSelect;
  }

  getErrorSelect(): string {
    return this.errorSelect;
  }

  getURLSelect(): string {
    return this.URLSelect;
  }

  capituloIngreso = "";
  ecoIngreso = "";

  ecoGasto = "";
  programa = "";
  organico = "";
  capituloGasto = "";

  public getCapituloIngreso(): string {
    return this.capituloIngreso;
  }

  public getEcoIngreso(): string {
    return this.ecoIngreso;
  }

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




  constructor() { }
}
