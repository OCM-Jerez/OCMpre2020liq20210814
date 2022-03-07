import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataGraphIngresosService } from '../../../services/data-graph-ingresos.service';
import economicos from '../../../../assets/data/EconomicosIngresos2022.json';

@Component({
  selector: 'app-select-economico-ingreso',
  templateUrl: './select-economico-ingreso.component.html',
  styleUrls: ['./select-economico-ingreso.component.scss']
})
export class SelectEconomicoIngresoComponent implements OnInit {
  ecoArray: { Eco: number, DesEco: string }[] = []
  form = new FormGroup({
    ecoIng: new FormControl('', Validators.required)
  });

  get f() {
    return this.form.controls;
  }

  submit() {
    this.dataGraphIngresosService.ecoIngreso = this.form.value.ecoIng;
    // this.router.navigate(['/Grafico',{}])
    this.router.navigateByUrl('/GraficoEconomicoIngreso')
  }

  // changeEco(e) {
  //   console.log(e.target.value);
  // }

  constructor(
    private router: Router,
    private dataGraphIngresosService: DataGraphIngresosService) {
  }

  ngOnInit(): void {
    this.ecoArray = economicos;
  }

}

