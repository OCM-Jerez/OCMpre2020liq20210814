import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataGraphService } from '../../../services/data-graph.service';

import capitulosIngresos from '../../../../assets/data/capitulosIngresos.json';
import economicosIngresos from '../../../../assets/data/EconomicosIngresos2022.json';
import capitulosGastos from '../../../../assets/data/capitulosGastos.json'
import organicos from '../../../../assets/data/organicos.json';
import programas from '../../../../assets/data/programas2022.json';
import economicosGastos from '../../../../assets/data/Economicos2022.json';

@Component({
  selector: 'app-select-codigo',
  templateUrl: './select-codigo.component.html',
  styleUrls: ['./select-codigo.component.scss']
})
export class SelectCodigoComponent {
  title = "";
  option = "";
  error = "";
  data = "";
  URL = "";

  datosSelect: { codigo: number, descripcion: string }[] = []

  constructor(
    private router: Router,
    private dataGraphService: DataGraphService,
  ) {
    this.data = this.dataGraphService.getData();
    this.title = this.dataGraphService.getTitleSelect();
    this.option = this.dataGraphService.getOptionSelect();
    this.error = this.dataGraphService.getErrorSelect();
    this.URL = this.dataGraphService.getURLSelect();
  }

  form = new FormGroup({
    seleccion: new FormControl('', Validators.required)
  });

  get f() {
    return this.form.controls;
  }

  ngOnInit(): void {
    switch (this.data) {
      case "ingresoCapitulo":
        this.datosSelect = capitulosIngresos;
        this.dataGraphService.tipoSelect = "Capítulo ingresos";
        break;
      case "ingresoEconomico":
        this.datosSelect = economicosIngresos;
        this.dataGraphService.tipoSelect = "Económico ingresos";
        break;
      case "gastoCapitulo":
        this.datosSelect = capitulosGastos;
        this.dataGraphService.tipoSelect = "Capítulo gastos";
        break;
      case "Organico":
        this.datosSelect = organicos;
        this.dataGraphService.tipoSelect = "Orgánico";
        break;
      case "Programa":
        this.datosSelect = programas;
        this.dataGraphService.tipoSelect = "Programa";
        break;
      case "gastoEconomico":
        this.datosSelect = economicosGastos;
        this.dataGraphService.tipoSelect = "Económico gastos";
        break;
      default:
        break;
    }
  }

  submit() {
    this.dataGraphService.codigoSelect = this.form.value.seleccion;
    this.router.navigateByUrl(this.URL)
  }

}
