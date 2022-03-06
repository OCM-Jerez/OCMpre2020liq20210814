import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataGraphGastosService } from '../../../services/data-graph-gastos.service';
import organicos from '../../../../assets/data/organicos.json';

@Component({
  selector: 'app-select-organico-gasto',
  templateUrl: './select-organico-gasto.component.html',
  styleUrls: ['./select-organico-gasto.component.scss']
})
export class SelectOrganicoGastoComponent {
  constructor(
    private router: Router,
    private dataGraphGastosService: DataGraphGastosService
  ) { }

  orgArray: { CodOrg: number, DesOrg: string }[] = []
  form = new FormGroup({
    orgGasto: new FormControl('', Validators.required)
  });

  get f() {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.orgArray = organicos;
  }

  submit() {
    this.dataGraphGastosService.organico = this.form.value.orgGasto;
    this.router.navigateByUrl('/GraficoOrganicoGasto')
  }

}
