import { Injectable } from '@angular/core';
import { IDataTableGraph } from '../commons/interfaces/dataGraph.interface';

@Injectable({
  providedIn: 'root'
})
export class DataTableGraphService {

  private _data: IDataTableGraph;
  private _selectedCodeRow: string;
  private _dataGraphTree: any[];

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

  get dataGraphTree(): any[] {
    return this._dataGraphTree
  }

  set dataGraphTree(dateGraphTree: any[]) {
    this._dataGraphTree = dateGraphTree
  }

}
