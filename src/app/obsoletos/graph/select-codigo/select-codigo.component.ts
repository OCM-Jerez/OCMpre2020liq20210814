import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataGraphService } from '../../../services/data-graph.service';
import { IDataGraph } from '../../../commons/interfaces/dataGraph.interface';

// Con import unicamente se crea un enlace, no siginifica que cargue los datos.
// Por tanto es una forma eficiente de preparar importación de datos
// https://medium.com/codeptivesolutions/how-to-import-json-file-in-angular-a2e012948479
// import ingresosEconomicaCapitulos from '../../../../assets/data/ingresosEconomicaCapitulos.json';
// import ingresosEconomicaArticulos from '../../../../assets/data/ingresosEconomicaArticulos.json';
// import ingresosEconomicaConceptos from '../../../../assets/data/ingresosEconomicaConceptos.json';
// import ingresosEconomicaEconomicos from '../../../../assets/data/ingresosEconomicaEconomicos.json';

import gastosOrganicaOrganicos from '../../../../assets/data/gastosOrganicaOrganicos.json';

import gastosProgramaAreas from '../../../../assets/data/gastosProgramaAreas.json';
import gastosProgramaPoliticas from '../../../../assets/data/gastosProgramaPoliticas.json';
import gastosProgramaGruposProgramas from '../../../../assets/data/gastosProgramaGruposProgramas.json';
import gastosProgramaProgramas from '../../../../assets/data/gastosProgramaProgramas.json';

import gastosEconomicaCapitulos from '../../../../assets/data/gastosEconomicaCapitulos.json';
import gastosEconomicaArticulos from '../../../../assets/data/gastosEconomicaArticulos.json';
import gastosEconomicaConceptos from '../../../../assets/data/gastosEconomicaConceptos.json';
import gastosEconomicaEconomicos from '../../../../assets/data/gastosEconomicaEconomicos.json';

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
    // { key: 'ingresosEconomicaCapitulos', data: { tipoSelect: 'Capítulo ingresos', dataJSON: ingresosEconomicaCapitulos } },
    // { key: 'ingresosEconomicaArticulos', data: { tipoSelect: 'Articulos ingresos', dataJSON: ingresosEconomicaArticulos } },
    // { key: 'ingresosEconomicaConceptos', data: { tipoSelect: 'Caonceptos ingresos', dataJSON: ingresosEconomicaConceptos } },
    // { key: 'ingresosEconomicaEconomicos', data: { tipoSelect: 'Económico ingresos', dataJSON: ingresosEconomicaEconomicos } },

    { key: 'gastosOrganicaOrganicos', data: { tipoSelect: 'Orgánico', dataJSON: gastosOrganicaOrganicos } },

    { key: 'gastosProgramaAreas', data: { tipoSelect: 'Area de gasto', dataJSON: gastosProgramaAreas } },
    { key: 'gastosProgramaPoliticas', data: { tipoSelect: 'Política de gasto', dataJSON: gastosProgramaPoliticas } },
    { key: 'gastosProgramaGruposProgramas', data: { tipoSelect: 'Grupo programas', dataJSON: gastosProgramaGruposProgramas } },
    { key: 'gastosProgramaProgramas', data: { tipoSelect: 'Programa', dataJSON: gastosProgramaProgramas } },

    { key: 'gastosEconomicaCapitulos', data: { tipoSelect: 'Capítulo gastos', dataJSON: gastosEconomicaCapitulos } },
    { key: 'gastosEconomicaArticulos', data: { tipoSelect: 'Articulos ingresos', dataJSON: gastosEconomicaArticulos } },
    { key: 'gastosEconomicaConceptos', data: { tipoSelect: 'Conceptos ingresos', dataJSON: gastosEconomicaConceptos } },
    { key: 'gastosEconomicaEconomicos', data: { tipoSelect: 'Económico gastos', dataJSON: gastosEconomicaEconomicos } },
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
