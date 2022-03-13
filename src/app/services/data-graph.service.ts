import { Injectable } from '@angular/core';
import { IDataGraph } from '../commons/interfaces/dataGraph.interface';

@Injectable({
  providedIn: 'root'
})
export class DataGraphService {
  sendData: IDataGraph = <IDataGraph>
    {
      data: '',
      titleSelect: '',
      optionSelect: '',
      errorSelect: '',
      URLSelect: '',
    };

  // data = "";
  // titleSelect = "";
  // optionSelect = "";
  // errorSelect = "";
  // URLSelect = "";

  getData(): string {
    return this.sendData.data;
  }

  getTitleSelect(): string {
    return this.sendData.titleSelect;
  }

  getOptionSelect(): string {
    return this.sendData.optionSelect;
  }

  getErrorSelect(): string {
    return this.sendData.errorSelect;
  }

  getURLSelect(): string {
    return this.sendData.URLSelect;
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
