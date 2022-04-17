import { Injectable } from '@angular/core';
import { IDataGraph, IDataTableGraph } from '../commons/interfaces/dataGraph.interface';

@Injectable({
  providedIn: 'root'
})
export class DataTableGraphService {

  private _data: IDataTableGraph;
  private _selectedCodeRow: string;

  get dataTableGraph(): IDataTableGraph {
    return this._data
  }

  set dataTableGraph(data: IDataTableGraph) {
    this._data = data
  }

  get selectedCodeRow(): string {
    return this._selectedCodeRow
  }

  set selectedCodeRow(code: string) {
    this._selectedCodeRow = code
  }
  // sendData: IDataGraph = <IDataGraph>
  //   {
  //     data: '',
  //     titleSelect: '',
  //     optionSelect: '',
  //     errorSelect: '',
  //     URLSelect: '',
  //     get getData(): string {
  //       return this.data;
  //     }
  //   };

  // getData(): string {
  //   return this.sendData.data;
  // }

  // getTitleSelect(): string {
  //   return this.sendData.titleSelect;
  // }

  // getOptionSelect(): string {
  //   return this.sendData.optionSelect;
  // }

  // getErrorSelect(): string {
  //   return this.sendData.errorSelect;
  // }

  // getURLSelect(): string {
  //   return this.sendData.URLSelect;
  // }

  // tipoSelect = "";
  // codigoSelect = "";

  // public getTipoSelect(): string {
  //   return this.tipoSelect;
  // }

  // public getCodigoSelect(): string {
  //   return this.codigoSelect;
  // }

}
