import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import { AgChartOptions, GridOptions } from 'ag-grid-community';
import { CellRendererOCM } from '../../../ag-grid/CellRendererOCM';
import { IYears } from '../../../commons/interfaces/components.interface';
import { accumulate, initYears } from '../../../commons/util/util';
import { AvalaibleYearsService } from '../../../services/avalaibleYears.service';
import { DataGraphService } from '../../../services/data-graph.service';



@Component({
  selector: 'app-graph-capitulo-ingreso',
  templateUrl: './graph-capitulo-ingreso.component.html',
  styleUrls: ['./graph-capitulo-ingreso.component.scss']
})
export class GraphCapituloIngresoComponent implements AfterViewInit {
  options: AgChartOptions;
  rowData: any;
  data: any;

  @ViewChild('agGrid', { static: false }) agGrid: AgGridAngular;
  private gridApi;
  public gridColumnApi;
  public columnDefs;
  public defaultColDef;
  public gridOptions: GridOptions;
  public localeText;
  public rowDataTable: any;
  public groupHeaderHeight = 25;
  public headerHeight = 25;

  text = '';
  codigo = '';

  constructor(
    private avalaibleYearsService: AvalaibleYearsService,
    private dataGraphService: DataGraphService,
    private router: Router,
  ) {
    this.createData(this.dataGraphService.getCodigoSelect().split(" ")[0]);
    // this.text = router.getCurrentNavigation().extras.state.data.tipo;
    // this.codigo = router.getCurrentNavigation().extras.state.data.codigo;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      // grafico
      this.options = {
        // theme: 'ag-default-dark',
        autoSize: true,
        title: {
          text: `${this.dataGraphService.getTipoSelect()} ${this.dataGraphService.getCodigoSelect()}`,
          // text: `${this.text} ${this.codigo}`,
        },
        subtitle: {
          text: 'Los valores de recaudación neta del año 2022 se igualan a los del 2021, hasta tener los datos definitivos.'
        },
        data: this.data,
        series: [
          {
            xKey: 'year',
            yKey: 'Definitivas',
          },
          {
            xKey: 'year',
            yKey: 'RecaudacionNeta',
          },
        ],
        axes: [
          {
            type: 'category',
            position: 'bottom',
            title: {
              text: 'Años',
              enabled: true,
            },
          },
          {
            type: 'number',
            position: 'left',
            title: {
              text: 'en miles de Euros',
              enabled: true,
            },
            label: {
              formatter: function (params) {
                return params.value / 1000 + '';
              },
            },
          },
        ],
        legend: {
          enabled: true,
          position: 'bottom',
        },
      }

      // tabla
      this.columnDefs = [
        {
          headerName: 'Año',
          field: 'year',
          width: 70,
        },
        {
          headerName: 'Previsiones definitivas',
          field: 'Definitivas',
          width: 180,
          cellRenderer: CellRendererOCM,
        },
        {
          headerName: 'RecaudacionNeta',
          field: 'RecaudacionNeta',
          width: 200,
          cellRenderer: CellRendererOCM,
        },
      ];

      this.defaultColDef = {
        sortable: true,
        resizable: true,
        filter: false,
        aggFunc: 'sum',
      };
    }, 500);
  }

  async onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  async createData(cap: string) {
    this.rowData = await this.avalaibleYearsService.getDataAllYearIng('Cap');
    const datos = this.getObjects(await this.rowData, 'CodCap', cap);
    // console.log("Datos: ", datos);
    // Sumo todos los economicos por año de cada capítulo
    // this.data = [];

    // const yearsDefinitivas: IYears = { 2015: 0, 2016: 0, 2017: 0, 2018: 0, 2019: 0, 2020: 0, 2021: 0, 2022: 0, }
    //this.getAccumulate(yearsDefinitivas, 'Definitivas', datos)



    const yearsDefinitivas = accumulate('Definitivas', datos);
    const yearsIniciales = accumulate('Iniciales', datos, <IYears>{ 2022: 0 });
    const yearsNetas = accumulate('RecaudacionNeta', datos);


    // const yearsIniciales: IYears = <IYears>{ 2022: 0 };
    // this.getAccumulate(yearsIniciales, 'Iniciales', datos)

    // const yearsNetas: IYears = { 2015: 0, 2016: 0, 2017: 0, 2018: 0, 2019: 0, 2020: 0, 2021: 0, 2022: 0, }
    // this.getAccumulate(yearsNetas, 'RecaudacionNeta', datos)

    // Convierto los valores para que sirvan de data al grafico
    this.data = [];
    for (let index = 2015; index <= 2022; index++) {
      const value = {
        "year": index,
        "Definitivas": yearsDefinitivas[index],
        "RecaudacionNeta": yearsNetas[index]
      }
      if (index === 2022) {
        value.Definitivas = yearsIniciales[index]
        value.RecaudacionNeta = yearsNetas[index - 1]
      }
      this.data.push(value)
    }
    // console.log("Datos Tratados: ", this.data);
    return this.data;
  }

  private getAccumulate(years: IYears, identity: string, datos: any[]): IYears {
    Object.keys(years).forEach((key) => {
      const sum = datos.filter((item) => item[identity + key]).reduce((prev, current) => prev + current[identity + key], 0);
      years[key] = sum;
    })
    return years;
  }

  // https://gist.github.com/iwek/3924925#file-find-in-json-js
  private getObjects(obj: any, key: string, val: string) {
    var objects = [];
    for (var i in obj) {
      if (!obj.hasOwnProperty(i)) continue;
      if (typeof obj[i] == 'object') {
        objects = objects.concat(this.getObjects(obj[i], key, val));
      } else
        //if key matches and value matches or if key matches and value is not passed (eliminating the case where key matches but passed value does not)
        if (i == key && obj[i] == val || i == key && val == '') { //
          objects.push(obj);
        } else if (obj[i] == val && key == '') {
          //only add if the object is not already in the array
          if (objects.lastIndexOf(obj) == -1) {
            objects.push(obj);
          }
        }
    }
    return objects;
  }

  volver() {
    this.router.navigateByUrl('/SelectCodigo')
  }

}


