import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AvalaibleYearsService } from '../services/avalaibleYears.service';
import { TipoClasificacionService } from '../services/tipoClasificacion.service';

import { IDataGraph } from '../commons/interfaces/dataGraph.interface';
import { DataGraphService } from '../services/data-graph.service';

@Component({
  selector: 'app-indice-new',
  templateUrl: './indice-new.component.html',
  styleUrls: ['./indice-new.component.scss']
})
export class IndiceNewComponent implements OnInit {
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
      URLSelect: "/GraficoCapituloIngreso"
    };
    this.dataGraphService.sendData = this.sendData;
    this.router.navigateByUrl('/ComparaIng')
  }

  ingresosEconomicaArticulos() {
    this.tipoclasificacionService.tipoClasificacion = 'ingresosEconomicaArticulos'
    this.getSelectedItem();
    this.sendData = <IDataGraph>{
      titleSelect: "Gráfico articulo de ingreso",
      URLSelect: "/ingresosEconomicaArticulos"
    };
    this.dataGraphService.sendData = this.sendData;
    this.router.navigateByUrl('/ComparaIng')
  }

  ingresosEconomicaConceptos() {
    this.tipoclasificacionService.tipoClasificacion = 'ingresosEconomicaConceptos'
    this.getSelectedItem();
    this.sendData = <IDataGraph>{
      URLSelect: "/ingresosEconomicaConceptos"
    };
    this.dataGraphService.sendData = this.sendData;
    this.router.navigateByUrl('/ComparaIng')
  }

  ingresosEconomicaEconomicos() {
    this.tipoclasificacionService.tipoClasificacion = 'ingresosEconomicaEconomicos'
    this.getSelectedItem();
    this.sendData = <IDataGraph>{
      URLSelect: "/GraficoEconomicoIngreso"
    };
    this.dataGraphService.sendData = this.sendData;
    this.router.navigateByUrl('/ComparaIng')
  }


  gastosOrganicaOrganicos() {
    this.tipoclasificacionService.tipoClasificacion = 'gastosOrganicaOrganicos'
    this.getSelectedItem();
    this.router.navigateByUrl('/ComparaGas')
  }

  gastosProgramaAreas() {
    this.tipoclasificacionService.tipoClasificacion = 'gastosProgramaAreas'
    this.getSelectedItem();
    this.router.navigateByUrl('/ComparaGas')
  }

  gastosProgramaPoliticas() {
    this.tipoclasificacionService.tipoClasificacion = 'gastosProgramaPoliticas'
    this.getSelectedItem();
    this.router.navigateByUrl('/ComparaGas')
  }

  gastosProgramaGrupos() {
    this.tipoclasificacionService.tipoClasificacion = 'gastosProgramaGrupos'
    this.getSelectedItem();
    this.router.navigateByUrl('/ComparaGas')
  }

  gastosProgramaProgramas() {
    this.tipoclasificacionService.tipoClasificacion = 'gastosProgramaProgramas'
    this.getSelectedItem();
    this.router.navigateByUrl('/ComparaGas')
  }

  gastosEconomicaCapitulos() {
    this.tipoclasificacionService.tipoClasificacion = 'gastosEconomicaCapitulos'
    this.getSelectedItem();
    this.router.navigateByUrl('/ComparaGas')
  }

  gastosEconomicaArticulos() {
    this.tipoclasificacionService.tipoClasificacion = 'gastosEconomicaArticulos'
    this.getSelectedItem();
    this.router.navigateByUrl('/ComparaGas')
  }

  gastosEconomicaConceptos() {
    this.tipoclasificacionService.tipoClasificacion = 'gastosEconomicaConceptos'
    this.getSelectedItem();
    this.router.navigateByUrl('/ComparaGas')
  }

  gastosEconomicaEconomicos() {
    this.tipoclasificacionService.tipoClasificacion = 'gastosEconomicaEconomicos'
    this.getSelectedItem();
    this.router.navigateByUrl('/ComparaGas')
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
    // console.log(event.target);
  }

  graphIngresosEconomicaCapitulos() {
    this.sendData = <IDataGraph>{
      data: "ingresosEconomicaCapitulos",
      titleSelect: "Selección capítulo de ingreso",
      optionSelect: "Selecciona capítulo de ingreso",
      errorSelect: "Error debes seleccionar un capítulo de ingreso",
      URLSelect: "/GraficoCapituloIngreso"
    };
    this.dataGraphService.sendData = this.sendData;
    const years = this.result.map((year) => year.year);
    this.avalaibleYearsService.setAvalaibleYear(years);
    this.router.navigateByUrl('/SelectCodigo')
  }

}
