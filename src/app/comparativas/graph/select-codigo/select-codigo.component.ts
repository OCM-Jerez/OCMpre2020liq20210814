import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataGraphService } from '../../../services/data-graph.service';
import { IDataGraph } from '../../../commons/interfaces/dataGraph.interface';

// Con import unicamente se crea un enlace, no siginifica que cargue los datos.
// Por tanto es una forma eficiente de preparar importación de datos
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
  private tipoSelect = '';
  sendData: IDataGraph = <IDataGraph>{};
  datosSelect: { codigo: number, descripcion: string }[] = []

  constructor(
    private router: Router,
    private dataGraphService: DataGraphService,
  ) {
    this.sendData.data = this.dataGraphService.getData();
    this.sendData.titleSelect = this.dataGraphService.getTitleSelect();
    this.sendData.optionSelect = this.dataGraphService.getOptionSelect();
    this.sendData.errorSelect = this.dataGraphService.getErrorSelect();
    this.sendData.URLSelect = this.dataGraphService.getURLSelect();

    // this.dataIndice = router.getCurrentNavigation().extras.state.data
  }
  array = [
    { key: 'ingresoCapitulo', data: { tipoSelect: 'Capítulo ingresos', dataJSON: capitulosIngresos } },
    { key: 'ingresoEconomico', data: { tipoSelect: 'Económico ingresos', dataJSON: economicosIngresos } },
    { key: 'gastoCapitulo', data: { tipoSelect: 'Capítulo gastos', dataJSON: capitulosGastos } },
    { key: 'Organico', data: { tipoSelect: 'Orgánico', dataJSON: organicos } },
    { key: 'Programa', data: { tipoSelect: 'Programa', dataJSON: programas } },
    { key: 'gastoEconomico', data: { tipoSelect: 'Económico gastos', dataJSON: economicosGastos } }
  ]

  form = new FormGroup({
    seleccion: new FormControl('', Validators.required)
  });

  get f() {
    return this.form.controls;
  }

  ngOnInit(): void {
    const value = this.array.find((item) => item.key === this.sendData.data);
    this.datosSelect = value.data.dataJSON;
    this.tipoSelect = value.data.tipoSelect;
  }

  submit() {
    this.dataGraphService.codigoSelect = this.form.value.seleccion;
    this.dataGraphService.tipoSelect = this.tipoSelect
    this.router.navigateByUrl(this.sendData.URLSelect)
    // this.router.navigate([this.dataIndice.URLSelect], { state: { data: { tipo: this.tipoSelect, codigo: this.form.value.seleccion } } });
  }

}
