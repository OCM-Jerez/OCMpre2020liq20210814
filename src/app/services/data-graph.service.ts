import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IDataGraph, IDataTable } from '../commons/interfaces/dataGraph.interface';

@Injectable({
  providedIn: 'root'
})
export class DataTableGraphService {

  private _dataSource = new Subject<IDataGraph>();
  dataSource$ = this._dataSource.asObservable();

  private _data: IDataTable;
  private _selectedCodeRow: string;
  private _dataGraphTree: any[];


  private _selectedCodeRowFirstLevel: string;


  get dataTableGraph(): IDataTable {
    return this._data
  }

  set dataTableGraph(data: IDataTable) {
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


  set selectedCodeRowFirstLevel(codeRow: string) {
    this._selectedCodeRowFirstLevel = codeRow;
  }

  get selectedCodeRowFirstLevel(): string {
    return this._selectedCodeRowFirstLevel
  }


  setData(data: IDataGraph) {
    this._dataSource.next(data)
  }
}
