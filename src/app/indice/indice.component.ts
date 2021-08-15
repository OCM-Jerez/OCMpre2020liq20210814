// TODO:Cambiar ProgramasOCM en angular.json para que no aparezca como nombre de carpeta en dist.

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GetScreenSizeService } from '../services/get-screen-size.service';
import { TipoClasificacionService } from '../services/tipoClasificacion.service';

@Component({
  selector: 'app-indice',
  templateUrl: './indice.component.html',
  styleUrls: ['./indice.component.css']
})
export class IndiceComponent implements OnInit {
  pantallaSize!: string;
  constructor(
    private router: Router,
    private getScreenSizeService: GetScreenSizeService,
    private tipoclasificacionService: TipoClasificacionService
  ) { }

  ngOnInit() {
    this.pantallaSize = this.getScreenSizeService.getIsMobileResolution();
    // console.log(this.pantallaSize);
  }

  porCapitulo() {
    this.tipoclasificacionService.tipoClasificacion = 'capitulo'
    this.router.navigate(['/GastosPorCapitulo'])
  }

  porEconomico() {
    this.tipoclasificacionService.tipoClasificacion = 'economico'
    this.router.navigate(['/GastosPorCapitulo'])
  }

  porOrganico() {
    this.tipoclasificacionService.tipoClasificacion = 'organico'
    this.router.navigate(['/GastosPorCapitulo'])
  }

  porPrograma() {
    this.tipoclasificacionService.tipoClasificacion = 'programa'
    this.router.navigate(['/GastosPorCapitulo'])
  }
}
