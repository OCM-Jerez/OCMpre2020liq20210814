import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import { AgChartOptions, GridOptions } from 'ag-grid-community';
import { CellRendererOCM } from '../../../../app/ag-grid/CellRendererOCM';
import { AvalaibleYearsService } from '../../../services/avalaibleYears.service';
import { DataGraphIngresosService } from '../../../services/data-graph-ingresos.service';

@Component({
  selector: 'app-graph-economico-ingreso',
  templateUrl: './graph-economico-ingreso.component.html',
  styleUrls: ['./graph-economico-ingreso.component.scss']
})
export class GraphEconomicoIngresoComponent implements AfterViewInit {
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

  constructor(
    private avalaibleYearsService: AvalaibleYearsService,
    private dataGraphIngresosService: DataGraphIngresosService,
    private router: Router,
  ) {
    this.createData(this.dataGraphIngresosService.getEcoIngreso().substring(0, 5))

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
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.options = {
        // theme: 'ag-default-dark',
        autoSize: true,
        title: {
          text: `Económico ingreso ${this.data[0].CodEco} ${this.data[0].DesEco}`,
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
    }, 500);
  }

  async onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  async createData(eco: string) {
    this.rowData = await this.avalaibleYearsService.getDataAllYearIng('Eco');
    const datos = this.getObjects(await this.rowData, 'CodEco', eco);
    // console.log("Datos: ", datos);

    // Convierto los valores para que sirvan de data al grafico
    this.data = [];
    const a2015 = {
      "year": "2015",
      "CodEco": datos[0].CodEco,
      "DesEco": datos[0].DesEco,
      "Definitivas": datos[0].Definitivas2015,
      "RecaudacionNeta": datos[0].RecaudacionNeta2015
    };
    this.data.push(a2015)

    const a2016 = {
      "year": "2016",
      "Definitivas": datos[1].Definitivas2016,
      "RecaudacionNeta": datos[1].RecaudacionNeta2016
    };
    this.data.push(a2016)

    const a2017 = {
      "year": "2017",
      "Definitivas": datos[2].Definitivas2017,
      "RecaudacionNeta": datos[2].RecaudacionNeta2017
    };
    this.data.push(a2017)

    const a2018 = {
      "year": "2018",
      "Definitivas": datos[3].Definitivas2018,
      "RecaudacionNeta": datos[3].RecaudacionNeta2018
    };
    this.data.push(a2018)

    const a2019 = {
      "year": "2019",
      "Definitivas": datos[4].Definitivas2019,
      "RecaudacionNeta": datos[4].RecaudacionNeta2019
    };
    this.data.push(a2019)

    const a2020 = {
      "year": "2020",
      "Definitivas": datos[5].Definitivas2020,
      "RecaudacionNeta": datos[5].RecaudacionNeta2020
    };
    this.data.push(a2020)

    const a2021 = {
      "year": "2021",
      "Definitivas": datos[6].Definitivas2021,
      "RecaudacionNeta": datos[6].RecaudacionNeta2021
    };
    this.data.push(a2021)

    const a2022 = {
      "year": "2022",
      "Definitivas": datos[7].Iniciales2022,               // Se usan las iniciales ya que es el unico dato que existe-
      "RecaudacionNeta": datos[6].RecaudacionNeta2021      // Se utiliza la recaudación neta del último año conocido para no desfigurar el grafico, ya que de lo contrario seria 0. 
    };
    this.data.push(a2022)
    // console.log("Datos Tratados: ", this.data);
    return this.data;
  }

  // https://gist.github.com/iwek/3924925#file-find-in-json-js
  getObjects(obj, key, val) {
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
    this.router.navigateByUrl('/SelectIngreso')
  }

}


