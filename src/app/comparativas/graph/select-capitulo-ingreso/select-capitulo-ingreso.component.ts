import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataGraphGastosService } from '../../../services/data-graph-gastos.service';
import capitulosIngresos from '../../../../assets/data/capitulosIngresos.json';

@Component({
  selector: 'app-select-capitulo-ingreso',
  templateUrl: './select-capitulo-ingreso.component.html',
  styleUrls: ['./select-capitulo-ingreso.component.scss']
})
export class SelectCapituloIngresoComponent {
  constructor(
    private router: Router,
    private dataGraphGastosService: DataGraphGastosService
  ) { }

  capArray: { Cap: number, DesCap: string }[] = []
  form = new FormGroup({
    capIngreso: new FormControl('', Validators.required)
  });

  get f() {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.capArray = capitulosIngresos;
  }

  submit() {
    this.dataGraphGastosService.capituloIngreso = this.form.value.capIngreso;
    this.router.navigateByUrl('/GraficoCapituloIngreso')
  }

}
