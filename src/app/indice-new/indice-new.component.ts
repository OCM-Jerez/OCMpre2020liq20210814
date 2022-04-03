import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AvalaibleYearsService } from '../services/avalaibleYears.service';
import { TipoClasificacionService } from '../services/tipoClasificacion.service';

// import { AVALAIBLE_YEARS } from '../../assets/data/avalaible-years-data'
import { DataGraphService } from '../services/data-graph.service';
import { IDataGraph } from '../commons/interfaces/dataGraph.interface';

@Component({
  selector: 'app-indice-new',
  templateUrl: './indice-new.component.html',
  styleUrls: ['./indice-new.component.scss']
})
export class IndiceNewComponent implements OnInit {

  // private radioSel!: any;
  private sendData: IDataGraph = <IDataGraph>{};

  radioSelected?: string;
  // yearsList: any[];
  list: any[] = [];

  constructor(
    private router: Router,
    private tipoclasificacionService: TipoClasificacionService,
    private avalaibleYearsService: AvalaibleYearsService,
    private dataGraphService: DataGraphService
  ) {
    // this.yearsList = AVALAIBLE_YEARS;
    // this.radioSelected = "2021";
  }

  ngOnInit() {
    this.radioSelected = this.avalaibleYearsService.getCurrentYear();
    this.list = [
      {
        year: 2015,
        checked: true,
      },
      {
        year: 2016,
        checked: true,
      }, {
        year: 2017,
        checked: true,
      }, {
        year: 2018,
        checked: true,
      },
      {
        year: 2019,
        checked: true,
      }, {
        year: 2020,
        checked: true,
      }, {
        year: 2021,
        checked: true,
      }, {
        year: 2022,
        checked: true,
      },
      // {
      //   year: "Todos",
      //   checked: false,
      // }
    ]
  }

  ingresosEconomicaCapitulos() {
    this.tipoclasificacionService.tipoClasificacion = 'Cap'
    this.getSelectedItem();
    this.router.navigateByUrl('/ComparaIng')
  }

  ingresosEconomicaEconomicos() {
    this.tipoclasificacionService.tipoClasificacion = 'Eco'
    this.getSelectedItem();
    this.router.navigateByUrl('/ComparaIng')
  }


  gastosOrganicaOrganicos() {
    this.tipoclasificacionService.tipoClasificacion = 'gastosOrganicaOrganicos'
    this.getSelectedItem();
    this.router.navigateByUrl('/ComparaGas')
  }

  gastosProgramaAreas() {
    this.tipoclasificacionService.tipoClasificacion = 'gastosProgramaAreas'
    this.getSelectedItem();
    this.router.navigateByUrl('/ComparaGas')
  }

  gastosProgramaPoliticas() {
    this.tipoclasificacionService.tipoClasificacion = 'gastosProgramaPoliticas'
    this.getSelectedItem();
    this.router.navigateByUrl('/ComparaGas')
  }

  gastosProgramaGrupos() {
    this.tipoclasificacionService.tipoClasificacion = 'gastosProgramaGrupos'
    this.getSelectedItem();
    this.router.navigateByUrl('/ComparaGas')
  }

  gastosProgramaProgramas() {
    this.tipoclasificacionService.tipoClasificacion = 'gastosProgramaProgramas'
    this.getSelectedItem();
    this.router.navigateByUrl('/ComparaGas')
  }

  gastosEconomicaCapitulos() {
    this.tipoclasificacionService.tipoClasificacion = 'gastosEconomicaCapitulos'
    this.getSelectedItem();
    this.router.navigateByUrl('/ComparaGas')
  }

  gastosEconomicaArticulos() {
    this.tipoclasificacionService.tipoClasificacion = 'Eco'
    this.getSelectedItem();
    this.router.navigateByUrl('/ComparaGas')
  }

  gastosEconomicaConceptos() {
    this.tipoclasificacionService.tipoClasificacion = 'Eco'
    this.getSelectedItem();
    this.router.navigateByUrl('/ComparaGas')
  }

  gastosEconomicaEconomicos() {
    this.tipoclasificacionService.tipoClasificacion = 'gastosEconomicaEconomicos'
    this.getSelectedItem();
    this.router.navigateByUrl('/ComparaGas')
  }

  private getSelectedItem() {
    const years = this.result.map((year) => year.year);
    this.avalaibleYearsService.setAvalaibleYear(years);
  }

  onItemChange() {
    this.getSelectedItem();
  }

  get result(): {
    year: number,
    checked: boolean,
  }[] {
    return this.list.filter(item => item.checked);
  }

  changeCheckbox(event: Event) {
    this.getSelectedItem();
    // console.log(event.target);
  }

}
