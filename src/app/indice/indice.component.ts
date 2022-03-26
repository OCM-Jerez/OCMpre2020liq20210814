// TODO:Cambiar ProgramasOCM en angular.json para que no aparezca como nombre de carpeta en dist.

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AvalaibleYearsService } from '../services/avalaibleYears.service';
// import { GetScreenSizeService } from '../services/get-screen-size.service';
import { TipoClasificacionService } from '../services/tipoClasificacion.service';

import { AVALAIBLE_YEARS } from '../../assets/data/avalaible-years-data'
import { DataGraphService } from '../services/data-graph.service';
import { IDataGraph } from '../commons/interfaces/dataGraph.interface';

@Component({
  selector: 'app-indice',
  templateUrl: './indice.component.html',
  styleUrls: ['./indice.component.scss']
})
export class IndiceComponent implements OnInit {
  // pantallaSize!: string;
  private radioSel!: any;
  radioSelected?: string;
  yearsList: any[];
  sendData: IDataGraph = <IDataGraph>{};

  constructor(
    private router: Router,
    // private getScreenSizeService: GetScreenSizeService,
    private tipoclasificacionService: TipoClasificacionService,
    private avalaibleYearsService: AvalaibleYearsService,
    private dataGraphService: DataGraphService
  ) {
    this.yearsList = AVALAIBLE_YEARS;
    this.radioSelected = "2021";
  }

  ngOnInit() {
    // this.pantallaSize = this.getScreenSizeService.getIsMobileResolution();
    this.radioSelected = this.avalaibleYearsService.getCurrentYear();
  }

  porIngresos() {
    this.router.navigateByUrl('/Ingresos')
  }

  graficoIngresoCapitulo() {
    this.sendData = <IDataGraph>{
      data: "ingresoCapitulo",
      titleSelect: "Selección capítulo de ingreso",
      optionSelect: "Selecciona capítulo de ingreso",
      errorSelect: "Error debes seleccionar un capítulo de ingreso",
      URLSelect: "/GraficoCapituloIngreso"
    };
    this.dataGraphService.sendData = this.sendData;
    this.router.navigateByUrl('/SelectCodigo')

    // Es posible pasar parametros a traves de la ruta.
    // Para ello se cre una interfaz IData y se le asigna un objeto sendData con los datos.
    // Con este metodo no hace falta crear un service.
    // El problema es cuando estos mismos datos hay que pasarlos a una segund ruta.
    // Por ejemplo al volver desde una seleccion habria que incluir los datos en la rutay.

    // this.router.navigate(['/SelectCodigo'], { state: { 'data': this.sendData } })
  }

  graficoIngresoEconomico() {
    this.sendData = <IDataGraph>{
      data: "ingresoEconomico",
      titleSelect: "Selección económico de ingreso",
      optionSelect: "Selecciona económico de ingreso",
      errorSelect: "Error debes seleccionar un económico de ingreso",
      URLSelect: "/GraficoEconomicoIngreso"
    };
    this.dataGraphService.sendData = this.sendData;
    this.router.navigateByUrl('/SelectCodigo')
  }

  graficoGastoCapitulo() {
    this.sendData = <IDataGraph>{
      data: "gastoCapitulo",
      titleSelect: "Selección capítulo de gasto",
      optionSelect: "Selecciona capítulo de gasto",
      errorSelect: "Error debes seleccionar un capítulo de gasto",
      URLSelect: "/GraficoCapituloGasto"
    };
    this.dataGraphService.sendData = this.sendData;
    this.router.navigateByUrl('/SelectCodigo')
  }

  graficoGastoOrganico() {
    this.sendData = <IDataGraph>{
      data: "Organico",
      titleSelect: "Selección orgánico",
      optionSelect: "Selecciona orgánico",
      errorSelect: "Error debes seleccionar un orgánico",
      URLSelect: "/GraficoOrganicoGasto"
    };
    this.dataGraphService.sendData = this.sendData;
    this.router.navigateByUrl('/SelectCodigo')
  }

  graficoGastoPrograma() {
    this.sendData = <IDataGraph>{
      data: "Programa",
      titleSelect: "Selección programa",
      optionSelect: "Selecciona programa",
      errorSelect: "Error debes seleccionar un programa",
      URLSelect: "/GraficoProgramaGasto"
    };
    this.dataGraphService.sendData = this.sendData;
    this.router.navigateByUrl('/SelectCodigo')
  }

  graficoGastoEconomico() {
    this.sendData = <IDataGraph>{
      data: "gastoEconomico",
      titleSelect: "Selección económico de gasto",
      optionSelect: "Selecciona económico de gasto",
      errorSelect: "Error debes seleccionar un económico de gasto",
      URLSelect: "/GraficoEconomicoGasto"
    };
    this.dataGraphService.sendData = this.sendData;
    this.router.navigateByUrl('/SelectCodigo')
  }


  graficoGastoGruposProgramas() {
    this.sendData = <IDataGraph>{
      data: "gruposProgramas",
      titleSelect: "Selección grupo programas",
      optionSelect: "Selecciona grupo de programas",
      errorSelect: "Error debes seleccionar un grupo de programas",
      URLSelect: "/GraficoGruposProgramas"
    };
    this.dataGraphService.sendData = this.sendData;
    this.router.navigateByUrl('/SelectCodigo')
  }

  graficoGastoPoliticas() {
    this.sendData = <IDataGraph>{
      data: "politicasGastos",
      titleSelect: "Selección política gasto",
      optionSelect: "Selecciona política de gasto",
      errorSelect: "Error debes seleccionar una política de gasto",
      URLSelect: "/GraficoPoliticasGastos"
    };
    this.dataGraphService.sendData = this.sendData;
    this.router.navigateByUrl('/SelectCodigo')
  }


  porCapitulo() {
    this.tipoclasificacionService.tipoClasificacion = 'capítulo'
    this.router.navigateByUrl('/Gastos')
  }

  porEconomico() {
    this.tipoclasificacionService.tipoClasificacion = 'económico'
    this.router.navigateByUrl('/Gastos')
  }

  porOrganico() {
    this.tipoclasificacionService.tipoClasificacion = 'orgánico'
    this.router.navigateByUrl('/Gastos')
  }

  porPrograma() {
    this.tipoclasificacionService.tipoClasificacion = 'programa'
    this.router.navigateByUrl('/Gastos')
  }

  comparaIng() {
    this.tipoclasificacionService.tipoClasificacion = 'Cap'
    this.router.navigateByUrl('/ComparaIng')
  }

  comparaIngEco() {
    this.tipoclasificacionService.tipoClasificacion = 'Eco'
    this.router.navigateByUrl('/ComparaIng')
  }

  comparaCap() {
    this.tipoclasificacionService.tipoClasificacion = 'Cap'
    this.router.navigateByUrl('/ComparaGas')
  }

  comparaOrg() {
    this.tipoclasificacionService.tipoClasificacion = 'Org'
    this.router.navigateByUrl('/ComparaGas')
  }

  comparaPro() {
    this.tipoclasificacionService.tipoClasificacion = 'Pro'
    this.router.navigateByUrl('/ComparaGas')
  }

  comparaEco() {
    this.tipoclasificacionService.tipoClasificacion = 'Eco'
    this.router.navigateByUrl('/ComparaGas')
  }

  getSelectedItem() {
    this.radioSel = AVALAIBLE_YEARS.find(Item => Item === this.radioSelected)!;
    this.avalaibleYearsService.setAvalaibleYear(this.radioSel);
  }

  onItemChange() {
    this.getSelectedItem();
  }

}
