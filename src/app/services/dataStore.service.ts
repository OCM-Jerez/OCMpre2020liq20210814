import { Injectable } from '@angular/core';
import { IDataStore } from '../commons/interfaces/dataStore.interface';


@Injectable({
  providedIn: 'root'
})
export class DataStoreService {
  constructor() { }

  dataStore: IDataStore = <IDataStore>
    {
      tipoClasificación: '',
      titleSelect: '',
      sufijo: '',
      headerName: '',
      subHeaderName: '',
      codField: '',
      desField: '',
      width: 0,
      data: {},
    };
}
