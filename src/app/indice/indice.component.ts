// TODO:Cambiar ProgramasOCM en angular.json para que no aparezca como nombre de carpeta en dist.

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AvalaibleYearsService } from '../services/avalaibleYears.service';
import { GetScreenSizeService } from '../services/get-screen-size.service';
import { TipoClasificacionService } from '../services/tipoClasificacion.service';

import { AVALAIBLE_YEARS } from '../../assets/data/avalaible-years-data'
import { DataGraphService } from '../services/data-graph.service';


export interface IData {
  data: string;
  titleSelect: string;
  optionSelect: string;
  errorSelect: string;
  URLSelect: string;
}

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

  sendData: IData = <IData>{};

  ngOnInit() {
    this.pantallaSize = this.getScreenSizeService.getIsMobileResolution();
    this.radioSelected = this.avalaibleYearsService.getCurrentYear();
  }

  porIngresos() {
    this.router.navigateByUrl('/Ingresos')
  }

  graficoIngresoCapitulo() {
    this.sendData.data = "ingresoCapitulo";
    this.sendData.titleSelect = "Selección capítulo de ingresos";
    this.sendData.optionSelect = "Selecciona capítulo de ingresos";
    this.sendData.errorSelect = "Error debes seleccionar un capítulo de ingresos";
    this.sendData.URLSelect = "/GraficoCapituloIngreso";
    //this.router.navigateByUrl('/SelectCodigo')
    this.router.navigate(['/SelectCodigo'], { state: { 'data': this.sendData } })

  }

  graficoIngresoEconomico() {
    // this.dataGraphService.data = "ingresoEconomico";
    // this.dataGraphService.titleSelect = "Selecciona económico de ingreso";
    // this.dataGraphService.optionSelect = "Selecciona económico de ingreso";
    // this.dataGraphService.errorSelect = "Error debes seleccionar un económico ingreso";
    // this.dataGraphService.URLSelect = "/GraficoEconomicoIngreso";
    // this.router.navigateByUrl('/SelectCodigo')
  }

  graficoGastoCapitulo() {
    // this.dataGraphService.data = "gastoCapitulo";
    // this.dataGraphService.titleSelect = "Selecciona capítulo de gasto";
    // this.dataGraphService.optionSelect = "Selecciona capítulo de gasto";
    // this.dataGraphService.errorSelect = "Error debes seleccionar un capítulo de gasto";
    // this.dataGraphService.URLSelect = "/GraficoCapituloGasto";
    // this.router.navigateByUrl('/SelectCodigo')
  }

  graficoGastoOrganico() {
    // this.dataGraphService.data = "Organico";
    // this.dataGraphService.titleSelect = "Selecciona orgánico";
    // this.dataGraphService.optionSelect = "Selecciona orgánico";
    // this.dataGraphService.errorSelect = "Error debes seleccionar un orgánico";
    // this.dataGraphService.URLSelect = "/GraficoOrganicoGasto";
    // this.router.navigateByUrl('/SelectCodigo')
  }

  graficoGastoPrograma() {
    // this.dataGraphService.data = "Programa";
    // this.dataGraphService.titleSelect = "Selecciona programa";
    // this.dataGraphService.optionSelect = "Selecciona programa";
    // this.dataGraphService.errorSelect = "Error debes seleccionar un programa";
    // this.dataGraphService.URLSelect = "/GraficoProgramaGasto";
    // this.router.navigateByUrl('/SelectCodigo')
  }

  graficoGastoEconomico() {
    // this.dataGraphService.data = "gastoEconomico";
    // this.dataGraphService.titleSelect = "Selecciona económico de gasto";
    // this.dataGraphService.optionSelect = "Selecciona económico de gasto";
    // this.dataGraphService.errorSelect = "Error debes seleccionar un económico de gasto";
    // this.dataGraphService.URLSelect = "/GraficoEconomicoGasto";
    // this.router.navigateByUrl('/SelectCodigo')
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
