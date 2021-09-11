// TODO:Cambiar ProgramasOCM en angular.json para que no aparezca como nombre de carpeta en dist.

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GetScreenSizeService } from '../services/get-screen-size.service';
import { TipoClasificacionService } from '../services/tipoClasificacion.service';

import { AVALAIBLE_YEARS } from '../avalaible-years-data'

@Component({
  selector: 'app-indice',
  templateUrl: './indice.component.html',
  styleUrls: ['./indice.component.css']
})
export class IndiceComponent implements OnInit {
  pantallaSize!: string;

  radioSel!: any;
  radioSelected?: string;
  radioSelectedString?:
    string;
  yearsList: any[];

  constructor(
    private router: Router,
    private getScreenSizeService: GetScreenSizeService,
    private tipoclasificacionService: TipoClasificacionService
  ) {
    this.yearsList = AVALAIBLE_YEARS;
    this.radioSelected = "todos";
    this.getSelectedItem();
  }

  ngOnInit() {
    this.pantallaSize = this.getScreenSizeService.getIsMobileResolution();
    // console.log(this.pantallaSize);
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

  getSelectedItem() {
    this.radioSel = AVALAIBLE_YEARS.find(Item => Item.year === this.radioSelected)!;
    this.radioSelectedString = JSON.stringify(this.radioSel);
  }

  onItemChange() {
    this.getSelectedItem();
  }

}
