import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AvalaibleYearsService } from '../services/avalaibleYears.service';
import { TipoClasificacionService } from '../services/tipoClasificacion.service';

import { IDataGraph } from '../commons/interfaces/dataGraph.interface';
import { DataGraphService } from '../services/data-graph.service';

@Component({
  selector: 'app-indice-new',
  templateUrl: './indice.component.html',
  styleUrls: ['./indice.component.scss']
})
export class IndiceComponent implements OnInit {
  private sendData: IDataGraph = <IDataGraph>{};
  list: any[] = [];

  constructor(
    private router: Router,
    private tipoclasificacionService: TipoClasificacionService,
    private avalaibleYearsService: AvalaibleYearsService,
    private dataGraphService: DataGraphService
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
    this.tipoclasificacionService.tipoClasificacion = 'ingresosEconomicaCapitulos'
    this.getSelectedItem();
    this.sendData = <IDataGraph>{
      titleSelect: "Gráfico capítulo de ingresos",
    };
    this.dataGraphService.sendData = this.sendData;
    this.router.navigateByUrl('/tableIngresos')
  }

  ingresosEconomicaArticulos() {
    this.tipoclasificacionService.tipoClasificacion = 'ingresosEconomicaArticulos'
    this.getSelectedItem();
    this.sendData = <IDataGraph>{
      titleSelect: "Gráfico articulo de ingresos",
    };
    this.dataGraphService.sendData = this.sendData;
    this.router.navigateByUrl('/tableIngresos')
  }

  ingresosEconomicaConceptos() {
    this.tipoclasificacionService.tipoClasificacion = 'ingresosEconomicaConceptos'
    this.getSelectedItem();
    this.sendData = <IDataGraph>{
      titleSelect: "Gráfico concepto de ingresos",
    };
    this.dataGraphService.sendData = this.sendData;
    this.router.navigateByUrl('/tableIngresos')
  }

  ingresosEconomicaEconomicos() {
    this.tipoclasificacionService.tipoClasificacion = 'ingresosEconomicaEconomicos'
    this.getSelectedItem();
    this.sendData = <IDataGraph>{
      titleSelect: "Gráfico económico de ingresos",
    };
    this.dataGraphService.sendData = this.sendData;
    this.router.navigateByUrl('/tableIngresos')
  }

  gastosOrganicaOrganicos() {
    this.tipoclasificacionService.tipoClasificacion = 'gastosOrganicaOrganicos'
    this.getSelectedItem();
    this.sendData = <IDataGraph>{
      titleSelect: "Orgánico de gastos",
    };
    this.dataGraphService.sendData = this.sendData;
    this.router.navigateByUrl('/tableGastos')
  }

  gastosProgramaAreas() {
    this.tipoclasificacionService.tipoClasificacion = 'gastosProgramaAreas'
    this.getSelectedItem();
    this.sendData = <IDataGraph>{
      titleSelect: "Area de gastos",
    };
    this.dataGraphService.sendData = this.sendData;
    this.router.navigateByUrl('/tableGastos')
  }

  gastosProgramaPoliticas() {
    this.tipoclasificacionService.tipoClasificacion = 'gastosProgramaPoliticas'
    this.getSelectedItem();
    this.sendData = <IDataGraph>{
      titleSelect: "Política de gastos",
    };
    this.dataGraphService.sendData = this.sendData;
    this.router.navigateByUrl('/tableGastos')
  }

  gastosProgramaGrupos() {
    this.tipoclasificacionService.tipoClasificacion = 'gastosProgramaGrupos'
    this.getSelectedItem();
    this.sendData = <IDataGraph>{
      titleSelect: "Grupo de prográmas de gastos",
    };
    this.dataGraphService.sendData = this.sendData;
    this.router.navigateByUrl('/tableGastos')
  }

  gastosProgramaProgramas() {
    this.tipoclasificacionService.tipoClasificacion = 'gastosProgramaProgramas'
    this.getSelectedItem();
    this.sendData = <IDataGraph>{
      titleSelect: "Prográma de gastos",
    };
    this.dataGraphService.sendData = this.sendData;
    this.router.navigateByUrl('/tableGastos')
  }

  gastosEconomicaCapitulos() {
    this.tipoclasificacionService.tipoClasificacion = 'gastosEconomicaCapitulos'
    this.getSelectedItem();
    this.sendData = <IDataGraph>{
      titleSelect: "Capítulo económicos de gastos",
    };
    this.dataGraphService.sendData = this.sendData;
    this.router.navigateByUrl('/tableGastos')
  }

  gastosEconomicaArticulos() {
    this.tipoclasificacionService.tipoClasificacion = 'gastosEconomicaArticulos'
    this.getSelectedItem();
    this.sendData = <IDataGraph>{
      titleSelect: "Artículo económicos de gastos",
    };
    this.dataGraphService.sendData = this.sendData;
    this.router.navigateByUrl('/tableGastos')
  }

  gastosEconomicaConceptos() {
    this.tipoclasificacionService.tipoClasificacion = 'gastosEconomicaConceptos'
    this.getSelectedItem();
    this.sendData = <IDataGraph>{
      titleSelect: "Concepto económicos de gastos",
    };
    this.dataGraphService.sendData = this.sendData;
    this.router.navigateByUrl('/tableGastos')
  }

  gastosEconomicaEconomicos() {
    this.tipoclasificacionService.tipoClasificacion = 'gastosEconomicaEconomicos'
    this.getSelectedItem();
    this.sendData = <IDataGraph>{
      titleSelect: "Económico de gastos",
    };
    this.dataGraphService.sendData = this.sendData;
    this.router.navigateByUrl('/tableGastos')
  }

  private getSelectedItem(tipo?: string) {
    const years = this.result.map((year) => year.year);
    this.avalaibleYearsService.setAvalaibleYear(years);
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
