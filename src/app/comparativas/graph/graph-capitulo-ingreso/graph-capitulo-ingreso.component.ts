import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import { AgChartOptions, GridOptions } from 'ag-grid-community';
import { CellRendererOCM } from '../../../ag-grid/CellRendererOCM';
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

  constructor(
    private avalaibleYearsService: AvalaibleYearsService,
    private dataGraphService: DataGraphService,
    private router: Router,
  ) {
    this.createData(this.dataGraphService.getCodigoSelect().split(" ")[0]);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      // grafico
      this.options = {
        // theme: 'ag-default-dark',
        autoSize: true,
        title: {
          text: `Capítulo ingreso ${this.dataGraphService.getCodigoSelect()}`,
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
    }, 225);
  }

  async onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  async createData(cap: string) {
    this.rowData = await this.avalaibleYearsService.getDataAllYearIng('Cap');
    const datos = this.getObjects(await this.rowData, 'CodCap', cap);
    // console.log("Datos: ", datos);
    // Sumo todos los economicos de cada capítulo
    this.data = [];

    let defini2015 = 0;
    let defini2016 = 0;
    let defini2017 = 0;
    let defini2018 = 0;
    let defini2019 = 0;
    let defini2020 = 0;
    let defini2021 = 0;
    let defini2022 = 0;

    datos.forEach(item => {
      if (item.Definitivas2015 > 0) {
        defini2015 += item.Definitivas2015;
      }

      if (item.Definitivas2016 > 0) {
        defini2016 += item.Definitivas2016;
      }

      if (item.Definitivas2017 > 0) {
        defini2017 += item.Definitivas2017;
      }

      if (item.Definitivas2018 > 0) {
        defini2018 += item.Definitivas2018;
      }

      if (item.Definitivas2019 > 0) {
        defini2019 += item.Definitivas2019;
      }

      if (item.Definitivas2020 > 0) {
        defini2020 += item.Definitivas2020;
      }

      if (item.Definitivas2021 > 0) {
        defini2021 += item.Definitivas2021;
      }

      if (item.Iniciales2022 > 0) {
        defini2022 += item.Iniciales2022;
      }
    })

    let neta2015 = 0;
    let neta2016 = 0;
    let neta2017 = 0;
    let neta2018 = 0;
    let neta2019 = 0;
    let neta2020 = 0;
    let neta2021 = 0;
    let neta2022 = 0;

    datos.forEach(item => {
      if (item.RecaudacionNeta2015 > 0) {
        neta2015 += item.RecaudacionNeta2015;
      }

      if (item.RecaudacionNeta2016 > 0) {
        neta2016 += item.RecaudacionNeta2016;
      }

      if (item.RecaudacionNeta2017 > 0) {
        neta2017 += item.RecaudacionNeta2017;
      }

      if (item.RecaudacionNeta2018 > 0) {
        neta2018 += item.RecaudacionNeta2018;
      }

      if (item.RecaudacionNeta2019 > 0) {
        neta2019 += item.RecaudacionNeta2019;
      }

      if (item.RecaudacionNeta2020 > 0) {
        neta2020 += item.RecaudacionNeta2020;
      }

      if (item.RecaudacionNeta2021 > 0) {
        neta2021 += item.RecaudacionNeta2021;
      }

      if (item.RecaudacionNeta2022 > 0) {
        neta2022 += item.Iniciales2022;
      }
    })

    // Convierto los valores para que sirvan de data al grafico
    this.data = [];
    const a2015 = {
      "year": "2015",
      "Definitivas": defini2015,
      "RecaudacionNeta": neta2015
    };
    this.data.push(a2015)

    const a2016 = {
      "year": "2016",
      "Definitivas": defini2016,
      "RecaudacionNeta": neta2016
    };
    this.data.push(a2016)

    const a2017 = {
      "year": "2017",
      "Definitivas": defini2017,
      "RecaudacionNeta": neta2017
    };
    this.data.push(a2017)

    const a2018 = {
      "year": "2018",
      "Definitivas": defini2018,
      "RecaudacionNeta": neta2018
    };
    this.data.push(a2018)

    const a2019 = {
      "year": "2019",
      "Definitivas": defini2019,
      "RecaudacionNeta": neta2019
    };
    this.data.push(a2019)

    const a2020 = {
      "year": "2020",
      "Definitivas": defini2020,
      "RecaudacionNeta": neta2020
    };
    this.data.push(a2020)

    const a2021 = {
      "year": "2021",
      "Definitivas": defini2021,
      "RecaudacionNeta": neta2021
    };
    this.data.push(a2021)

    const a2022 = {
      "year": "2022",
      "Definitivas": defini2022,       // Se usan las iniciales ya que es el unico dato que existe-
      "RecaudacionNeta": neta2021      // Se utiliza la recaudación neta del último año conocido para no desfigurar el grafico, ya que de lo contrario seria 0. 
    };
    this.data.push(a2022)
    // console.log("Datos Tratados: ", this.data);
    return this.data;
  }

  // https://gist.github.com/iwek/3924925#file-find-in-json-js
  getObjects(obj: any, key: string, val: string) {
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


