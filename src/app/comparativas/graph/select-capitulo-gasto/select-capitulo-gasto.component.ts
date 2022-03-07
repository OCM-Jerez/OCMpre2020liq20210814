import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataGraphGastosService } from '../../../services/data-graph-gastos.service';
import capitulosGastos from '../../../../assets/data/capitulosGastos.json'

@Component({
  selector: 'app-select-capitulo-gasto',
  templateUrl: './select-capitulo-gasto.component.html',
  styleUrls: ['./select-capitulo-gasto.component.scss']
})
export class SelectCapituloGastoComponent {
  constructor(
    private router: Router,
    private dataGraphGastosService: DataGraphGastosService
  ) { }

  datosSelect: { CodCap: number, Capitulo: string }[] = []
  form = new FormGroup({
    seleccion: new FormControl('', Validators.required)
  });

  get f() {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.datosSelect = capitulosGastos;
  }

  submit() {
    this.dataGraphGastosService.capituloGasto = this.form.value.seleccion;
    this.router.navigateByUrl('/GraficoCapituloGasto')
  }

}
