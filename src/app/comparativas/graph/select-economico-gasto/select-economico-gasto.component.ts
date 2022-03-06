import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataGraphGastosService } from '../../../services/data-graph-gastos.service';
import economicos from '../../../../assets/data/Economicos2022.json';

@Component({
  selector: 'app-select-economico-gasto',
  templateUrl: './select-economico-gasto.component.html',
  styleUrls: ['./select-economico-gasto.component.scss']
})
export class SelectEconomicoGastoComponent {
  constructor(
    private router: Router,
    private dataGraphGastosService: DataGraphGastosService
  ) { }

  ecoArray: { CodEco: number, DesEco: string }[] = []
  form = new FormGroup({
    ecoGasto: new FormControl('', Validators.required)
  });

  get f() {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.ecoArray = economicos;
  }

  submit() {
    this.dataGraphGastosService.ecoGasto = this.form.value.ecoGasto;
    this.router.navigate(['/GraficoEconomicoGasto'])
  }

}
