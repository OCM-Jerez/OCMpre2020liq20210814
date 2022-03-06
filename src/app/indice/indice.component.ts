// TODO:Cambiar ProgramasOCM en angular.json para que no aparezca como nombre de carpeta en dist.

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AvalaibleYearsService } from '../services/avalaibleYears.service';
import { GetScreenSizeService } from '../services/get-screen-size.service';
import { TipoClasificacionService } from '../services/tipoClasificacion.service';

import { AVALAIBLE_YEARS } from '../../assets/data/avalaible-years-data'

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
    private avalaibleYearsService: AvalaibleYearsService
  ) {
    this.yearsList = AVALAIBLE_YEARS;
    this.radioSelected = "2021";
  }

  ngOnInit() {
    this.pantallaSize = this.getScreenSizeService.getIsMobileResolution();
    this.radioSelected = this.avalaibleYearsService.getCurrentYear();
  }

  porIngresos() {
    this.router.navigateByUrl('/Ingresos')
  }

  graficoIngresoCapitulo() {
    this.router.navigateByUrl('/SelectIngresoCapitulo')
  }

  grafico() {
    this.router.navigateByUrl('/SelectIngreso')
  }

  graficoGastoOrganico() {
    this.router.navigateByUrl('/SelectGastoOrganico')
  }

  graficoGastoPrograma() {
    this.router.navigateByUrl('/SelectGastoPrograma')
  }

  graficoGastoEconomico() {
    this.router.navigateByUrl('/SelectGastoEconomico')
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
  graficoGastoCapitulo() {
    this.router.navigateByUrl('/SelectGastoCapitulo')
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
