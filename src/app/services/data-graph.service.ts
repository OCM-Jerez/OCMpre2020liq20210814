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

  tipoSelect = "";
  codigoSelect = "";

  public getTipoSelect(): string {
    return this.tipoSelect;
  }

  public getCodigoSelect(): string {
    return this.codigoSelect;
  }

}
