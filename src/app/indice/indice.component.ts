// TODO:Cambiar ProgramasOCM en angular.json para que no aparezca como nombre de carpeta en dist.

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AvalaibleYearsService } from '../services/avalaibleYears.service';
import { GetScreenSizeService } from '../services/get-screen-size.service';
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
  pantallaSize!: string;
  radioSel!: any;
  radioSelected?: string;
  yearsList: any[];

  constructor(
    private router: Router,
    private getScreenSizeService: GetScreenSizeService,
    private tipoclasificacionService: TipoClasificacionService,
    private avalaibleYearsService: AvalaibleYearsService,
    private dataGraphService: DataGraphService
  ) {
    this.yearsList = AVALAIBLE_YEARS;
    this.radioSelected = "2021";
  }

  sendData: IDataGraph = <IDataGraph>{};

  ngOnInit() {
    this.pantallaSize = this.getScreenSizeService.getIsMobileResolution();
    this.radioSelected = this.avalaibleYearsService.getCurrentYear();
  }

  porIngresos() {
    this.router.navigateByUrl('/Ingresos')
  }

  graficoIngresoCapitulo() {
    this.dataGraphService.sendData.data = "ingresoCapitulo";
    this.dataGraphService.sendData.titleSelect = "Selección capítulo de ingresos";
    this.dataGraphService.sendData.optionSelect = "Selecciona capítulo de ingresos";
    this.dataGraphService.sendData.errorSelect = "Error debes seleccionar un capítulo de ingresos";
    this.dataGraphService.sendData.URLSelect = "/GraficoCapituloIngreso";
    this.router.navigateByUrl('/SelectCodigo')

    // Es posible pasar parametros a traves de la ruta.
    // Para ello se cre una interfaz IData y se le asigna un objeto sendData con los datos.
    // Con este metodo no hace falta crear un service.
    // El problema es cuando estos mismos datos hay que pasarlos a una segund ruta.
    // Por ejemplo al volver desde una seleccion habria que incluir los datos en la rutay.

    // this.sendData.data = "ingresoCapitulo";
    // this.sendData.titleSelect = "Selección capítulo de ingresos";
    // this.sendData.optionSelect = "Selecciona capítulo de ingresos";
    // this.sendData.errorSelect = "Error debes seleccionar un capítulo de ingresos";
    // this.sendData.URLSelect = "/GraficoCapituloIngreso";
    // this.router.navigate(['/SelectCodigo'], { state: { 'data': this.sendData } })
  }

  graficoIngresoEconomico() {
    this.dataGraphService.sendData.data = "ingresoEconomico";
    this.dataGraphService.sendData.titleSelect = "Selecciona económico de ingreso";
    this.dataGraphService.sendData.optionSelect = "Selecciona económico de ingreso";
    this.dataGraphService.sendData.errorSelect = "Error debes seleccionar un económico ingreso";
    this.dataGraphService.sendData.URLSelect = "/GraficoEconomicoIngreso";
    this.router.navigateByUrl('/SelectCodigo')
  }

  graficoGastoCapitulo() {
    this.dataGraphService.sendData.data = "gastoCapitulo";
    this.dataGraphService.sendData.titleSelect = "Selecciona capítulo de gasto";
    this.dataGraphService.sendData.optionSelect = "Selecciona capítulo de gasto";
    this.dataGraphService.sendData.errorSelect = "Error debes seleccionar un capítulo de gasto";
    this.dataGraphService.sendData.URLSelect = "/GraficoCapituloGasto";
    this.router.navigateByUrl('/SelectCodigo')
  }

  graficoGastoOrganico() {
    this.dataGraphService.sendData.data = "Organico";
    this.dataGraphService.sendData.titleSelect = "Selecciona orgánico";
    this.dataGraphService.sendData.optionSelect = "Selecciona orgánico";
    this.dataGraphService.sendData.errorSelect = "Error debes seleccionar un orgánico";
    this.dataGraphService.sendData.URLSelect = "/GraficoOrganicoGasto";
    this.router.navigateByUrl('/SelectCodigo')
  }

  graficoGastoPrograma() {
    this.dataGraphService.sendData.data = "Programa";
    this.dataGraphService.sendData.titleSelect = "Selecciona programa";
    this.dataGraphService.sendData.optionSelect = "Selecciona programa";
    this.dataGraphService.sendData.errorSelect = "Error debes seleccionar un programa";
    this.dataGraphService.sendData.URLSelect = "/GraficoProgramaGasto";
    this.router.navigateByUrl('/SelectCodigo')
  }

  graficoGastoEconomico() {
    this.dataGraphService.sendData.data = "gastoEconomico";
    this.dataGraphService.sendData.titleSelect = "Selecciona económico de gasto";
    this.dataGraphService.sendData.optionSelect = "Selecciona económico de gasto";
    this.dataGraphService.sendData.errorSelect = "Error debes seleccionar un económico de gasto";
    this.dataGraphService.sendData.URLSelect = "/GraficoEconomicoGasto";
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
