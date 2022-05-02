import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AvalaibleYearsService } from '../services/avalaibleYears.service';
import { DataStoreService } from '../services/dataStore.service';

import { IDataTable } from '../commons/interfaces/dataTable.interface';

import { getClasificacion } from '../tables/data-table';
import { PrepareDataIngresosService } from '../services/prepareDataIngresos.service';
import { PrepareDataGastosService } from '../services/prepareDataGastos.service';

@Component({
  selector: 'app-indice-new',
  templateUrl: './indice.component.html',
  styleUrls: ['./indice.component.scss']
})
export class IndiceComponent implements OnInit {
  list: any[] = [];

  constructor(
    private _router: Router,
    private _avalaibleYearsService: AvalaibleYearsService,
    private _dataStoreService: DataStoreService,
    private _prepareDataIngresosService: PrepareDataIngresosService,
    private _prepareDataGastosService: PrepareDataGastosService
  ) { }

  ngOnInit() {
    this.list = [
      {
        year: 2015,
        checked: true,
      },
      {
        year: 2016,
        checked: true,
      }, {
        year: 2017,
        checked: true,
      }, {
        year: 2018,
        checked: true,
      },
      {
        year: 2019,
        checked: true,
      }, {
        year: 2020,
        checked: true,
      }, {
        year: 2021,
        checked: true,
      }, {
        year: 2022,
        checked: true,
      },
      // {
      //   year: "Todos",

      //   checked: false,
      // }
    ]
  }

  private getSelectedItem(tipo?: string) {
    const years = this.result.map((year) => year.year);
    this._avalaibleYearsService.setAvalaibleYear(years);
  }

  onItemChange() {
    this.getSelectedItem();
  }

  get result(): {
    year: number,
    checked: boolean,
  }[] {
    return this.list.filter(item => item.checked);
  }

  changeCheckbox(event: Event) {
    this.getSelectedItem();
  }

  async openTable(tipoClasificacion: string): Promise<void> {
    this.getSelectedItem();
    const isIncome = tipoClasificacion.startsWith('ingresos');
    const dataPropertyTable = getClasificacion(tipoClasificacion);
    let rowData: any[];
    if (isIncome) {
      rowData = await this._prepareDataIngresosService.getDataAllYear(tipoClasificacion, dataPropertyTable.sufijo);
    } else {
      rowData = await this._prepareDataGastosService.getDataAllYear(tipoClasificacion, dataPropertyTable.sufijo);
    }

    const sendData: IDataTable = {
      dataPropertyTable,
      clasificationType: tipoClasificacion,
      rowData
    }
    // Uso el setter
    this._dataStoreService.setDataTable = sendData;

    if (isIncome) {
      this._router.navigateByUrl('/tableIngresos')
    } else {
      this._router.navigateByUrl('/tableGastos')
    }

  }

}