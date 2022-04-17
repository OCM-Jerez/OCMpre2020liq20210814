import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AvalaibleYearsService } from '../services/avalaibleYears.service';
import { TipoClasificacionService } from '../services/tipoClasificacion.service';
import { DataTableGraphService } from '../services/data-graph.service';

import { IDataGraph, IDataTableGraph } from '../commons/interfaces/dataGraph.interface';
import { TIPO_CLASIFICACION } from '../commons/enums/tiposClasificacion.enum';
import { getClasificacion } from '../tables/data-table';
import { PrepareDataIngresosService } from '../services/prepareDataIngresos.service';
import { PrepareDataGastosService } from '../services/prepareDataGastos.service';

@Component({
  selector: 'app-indice-new',
  templateUrl: './indice.component.html',
  styleUrls: ['./indice.component.scss']
})
export class IndiceComponent implements OnInit {
  private _sendData: IDataGraph = <IDataGraph>{};
  list: any[] = [];

  constructor(
    private _router: Router,
    private _tipoclasificacionService: TipoClasificacionService,
    private _avalaibleYearsService: AvalaibleYearsService,
    private _dataGraphService: DataTableGraphService,
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
        checked: false,
      },
      // {
      //   year: "Todos",
      //   checked: false,
      // }
    ]
  }


  ingresosEconomicaCapitulos() {
    // this.openTable('ingresosEconomicaCapitulos', 'Capitulo de ingresos');
    this.openTable(TIPO_CLASIFICACION.IE_CAPITULO, 'Capitulo de ingresos');
  }


  ingresosEconomicaArticulos() {
    this.openTable('ingresosEconomicaArticulos', 'Artículo de ingresos');
  }

  ingresosEconomicaConceptos() {
    this.openTable('ingresosEconomicaConceptos', 'Concepto de ingresos');
  }

  ingresosEconomicaEconomicos() {
    this.openTable('ingresosEconomicaEconomicos', 'Económico de ingresos');
  }


  gastosOrganicaOrganicos() {
    this.openTable('gastosOrganicaOrganicos', 'Orgánico de gastos');
  }

  gastosProgramaAreas() {
    this.openTable('gastosProgramaAreas', 'Area de gastos');
  }

  gastosProgramaPoliticas() {
    this.openTable('gastosProgramaPoliticas', 'Política de gastos');
  }

  gastosProgramaGrupos() {
    this.openTable('gastosProgramaGrupos', 'Grupo de prográmas de gastos');
  }

  gastosProgramaProgramas() {
    this.openTable('gastosProgramaProgramas', 'Prográma de gastos');
  }


  gastosEconomicaCapitulos() {
    this.openTable('gastosEconomicaCapitulos', 'Capítulo económicos de gastos');
  }

  gastosEconomicaArticulos() {
    this.openTable('gastosEconomicaArticulos', 'Artículo económicos de gastos');
  }

  gastosEconomicaConceptos() {
    this.openTable('gastosEconomicaConceptos', 'Concepto económicos de gastos');
  }

  gastosEconomicaEconomicos() {
    this.openTable('gastosEconomicaEconomicos', 'Económico de gastos');
  }

  private getSelectedItem(tipo?: string) {
    const years = this.result.map((year) => year.year);
    console.log(years);

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

  async openTable(tipoClasificacion: string, title: string): Promise<void> {
    this.getSelectedItem();

    const isIncome = tipoClasificacion.startsWith('ingresos');
    const dataPropertyTable = getClasificacion(tipoClasificacion);

    let data;
    if (isIncome) {
      data = await this._prepareDataIngresosService.getDataAllYear(tipoClasificacion, false, dataPropertyTable.sufijo);

    } else {
      data = await this._prepareDataGastosService.getDataAllYear(tipoClasificacion, false, dataPropertyTable.sufijo);
    }


    const sendData: IDataTableGraph = {
      dataPropertyTable,
      clasificationType: tipoClasificacion,
      title,
      data
    }


    this._dataGraphService.dataTableGraph = sendData;

    if (isIncome) {
      this._router.navigateByUrl('/tableIngresos')
    } else {
      this._router.navigateByUrl('/tableGastos')
    }

  }

}