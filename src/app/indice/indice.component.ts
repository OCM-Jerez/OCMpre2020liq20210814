import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AvalaibleYearsService } from '../services/avalaibleYears.service';
import { TipoClasificacionService } from '../services/tipoClasificacion.service';
import { DataGraphService } from '../services/data-graph.service';

import { IDataGraph } from '../commons/interfaces/dataGraph.interface';

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
    private _dataGraphService: DataGraphService
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

  ingresosEconomicaCapitulos() {
    this._tipoclasificacionService.tipoClasificacion = 'ingresosEconomicaCapitulos'
    this.getSelectedItem();
    this._sendData = <IDataGraph>{
      titleSelect: "Gráfico capítulo de ingresos",
    };
    this._dataGraphService.sendData = this._sendData;
    this._router.navigateByUrl('/tableIngresos')
  }

  ingresosEconomicaArticulos() {
    this._tipoclasificacionService.tipoClasificacion = 'ingresosEconomicaArticulos'
    this.getSelectedItem();
    this._sendData = <IDataGraph>{
      titleSelect: "Gráfico articulo de ingresos",
    };
    this._dataGraphService.sendData = this._sendData;
    this._router.navigateByUrl('/tableIngresos')
  }

  ingresosEconomicaConceptos() {
    this._tipoclasificacionService.tipoClasificacion = 'ingresosEconomicaConceptos'
    this.getSelectedItem();
    this._sendData = <IDataGraph>{
      titleSelect: "Gráfico concepto de ingresos",
    };
    this._dataGraphService.sendData = this._sendData;
    this._router.navigateByUrl('/tableIngresos')
  }

  ingresosEconomicaEconomicos() {
    this._tipoclasificacionService.tipoClasificacion = 'ingresosEconomicaEconomicos'
    this.getSelectedItem();
    this._sendData = <IDataGraph>{
      titleSelect: "Gráfico económico de ingresos",
    };
    this._dataGraphService.sendData = this._sendData;
    this._router.navigateByUrl('/tableIngresos')
  }

  gastosOrganicaOrganicos() {
    this._tipoclasificacionService.tipoClasificacion = 'gastosOrganicaOrganicos'
    this.getSelectedItem();
    this._sendData = <IDataGraph>{
      titleSelect: "Orgánico de gastos",
    };
    this._dataGraphService.sendData = this._sendData;
    this._router.navigateByUrl('/tableGastos')
  }

  gastosProgramaAreas() {
    this._tipoclasificacionService.tipoClasificacion = 'gastosProgramaAreas'
    this.getSelectedItem();
    this._sendData = <IDataGraph>{
      titleSelect: "Area de gastos",
    };
    this._dataGraphService.sendData = this._sendData;
    this._router.navigateByUrl('/tableGastos')
  }

  gastosProgramaPoliticas() {
    this._tipoclasificacionService.tipoClasificacion = 'gastosProgramaPoliticas'
    this.getSelectedItem();
    this._sendData = <IDataGraph>{
      titleSelect: "Política de gastos",
    };
    this._dataGraphService.sendData = this._sendData;
    this._router.navigateByUrl('/tableGastos')
  }

  gastosProgramaGrupos() {
    this._tipoclasificacionService.tipoClasificacion = 'gastosProgramaGrupos'
    this.getSelectedItem();
    this._sendData = <IDataGraph>{
      titleSelect: "Grupo de prográmas de gastos",
    };
    this._dataGraphService.sendData = this._sendData;
    this._router.navigateByUrl('/tableGastos')
  }

  gastosProgramaProgramas() {
    this._tipoclasificacionService.tipoClasificacion = 'gastosProgramaProgramas'
    this.getSelectedItem();
    this._sendData = <IDataGraph>{
      titleSelect: "Prográma de gastos",
    };
    this._dataGraphService.sendData = this._sendData;
    this._router.navigateByUrl('/tableGastos')
  }

  gastosEconomicaCapitulos() {
    this._tipoclasificacionService.tipoClasificacion = 'gastosEconomicaCapitulos'
    this.getSelectedItem();
    this._sendData = <IDataGraph>{
      titleSelect: "Capítulo económicos de gastos",
    };
    this._dataGraphService.sendData = this._sendData;
    this._router.navigateByUrl('/tableGastos')
  }

  gastosEconomicaArticulos() {
    this._tipoclasificacionService.tipoClasificacion = 'gastosEconomicaArticulos'
    this.getSelectedItem();
    this._sendData = <IDataGraph>{
      titleSelect: "Artículo económicos de gastos",
    };
    this._dataGraphService.sendData = this._sendData;
    this._router.navigateByUrl('/tableGastos')
  }

  gastosEconomicaConceptos() {
    this._tipoclasificacionService.tipoClasificacion = 'gastosEconomicaConceptos'
    this.getSelectedItem();
    this._sendData = <IDataGraph>{
      titleSelect: "Concepto económicos de gastos",
    };
    this._dataGraphService.sendData = this._sendData;
    this._router.navigateByUrl('/tableGastos')
  }

  gastosEconomicaEconomicos() {
    this._tipoclasificacionService.tipoClasificacion = 'gastosEconomicaEconomicos'
    this.getSelectedItem();
    this._sendData = <IDataGraph>{
      titleSelect: "Económico de gastos",
    };
    this._dataGraphService.sendData = this._sendData;
    this._router.navigateByUrl('/tableGastos')
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

}
