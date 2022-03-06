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

  capArray: { CodCap: number, Capitulo: string }[] = []
  form = new FormGroup({
    capGasto: new FormControl('', Validators.required)
  });

  get f() {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.capArray = capitulosGastos;
  }

  submit() {
    console.log(this.form.value.capGasto);

    this.dataGraphGastosService.capituloGasto = this.form.value.capGasto;
    this.router.navigateByUrl('/GraficoCapituloGasto')
  }

}
