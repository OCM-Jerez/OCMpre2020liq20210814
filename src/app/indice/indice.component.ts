// TODO:Cambiar ProgramasOCM en angular.json para que no aparezca como nombre de carpeta en dist.

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AvalaibleYearsService } from '../services/avalaibleYears.service';
import { GetScreenSizeService } from '../services/get-screen-size.service';
import { TipoClasificacionService } from '../services/tipoClasificacion.service';

import { AVALAIBLE_YEARS } from '../avalaible-years-data'

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
    this.radioSelected = "2020";
  }

  ngOnInit() {
    this.pantallaSize = this.getScreenSizeService.getIsMobileResolution();
    this.radioSelected = this.avalaibleYearsService.getCurrentYear();
  }

  porCapitulo() {
    this.tipoclasificacionService.tipoClasificacion = 'capítulo'
    this.router.navigate(['/Gastos'])
  }

  porEconomico() {
    this.tipoclasificacionService.tipoClasificacion = 'económico'
    this.router.navigate(['/Gastos'])
  }

  porOrganico() {
    this.tipoclasificacionService.tipoClasificacion = 'orgánico'
    this.router.navigate(['/Gastos'])
  }

  porPrograma() {
    this.tipoclasificacionService.tipoClasificacion = 'programa'
    this.router.navigate(['/Gastos'])
  }

  comparativas() {
    this.router.navigate(['/Comparativas'])
  }

  getSelectedItem() {
    this.radioSel = AVALAIBLE_YEARS.find(Item => Item.year === this.radioSelected)!;
    this.avalaibleYearsService.setAvalaibleYear(this.radioSel.year);
  }

  onItemChange() {
    this.getSelectedItem();
  }

}
