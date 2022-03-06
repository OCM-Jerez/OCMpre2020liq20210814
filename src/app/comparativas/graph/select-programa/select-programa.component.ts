import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataGraphGastosService } from '../../../services/data-graph-gastos.service';
import programas from '../../../../assets/data/programas2022.json';

@Component({
  selector: 'app-select-programa',
  templateUrl: './select-programa.component.html',
  styleUrls: ['./select-programa.component.scss']
})
export class SelectProgramaComponent {
  constructor(
    private router: Router,
    private dataGraphGastosService: DataGraphGastosService
  ) { }

  proArray: { CodPro: number, DesPro: string }[] = []
  form = new FormGroup({
    proGasto: new FormControl('', Validators.required)
  });

  get f() {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.proArray = programas;
  }

  submit() {
    this.dataGraphGastosService.programa = this.form.value.proGasto;
    this.router.navigateByUrl('/GraficoProgramaGasto')
  }

}
