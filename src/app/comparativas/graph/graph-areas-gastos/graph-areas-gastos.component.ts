import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import { AgChartOptions, GridOptions } from 'ag-grid-community';
import { CellRendererOCM } from '../../../ag-grid/CellRendererOCM';
import { AvalaibleYearsService } from '../../../services/avalaibleYears.service';
import { DataGraphService } from '../../../services/data-graph.service';

@Component({
  selector: 'app-graph-areas-gastos',
  templateUrl: './graph-areas-gastos.component.html',
  styleUrls: ['./graph-areas-gastos.component.scss']
})
export class GraphAreasGastosComponent implements AfterViewInit {


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
    console.log(this.dataGraphService.getCodigoSelect().split(" ")[0]);

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
        headerName: 'ObligacionesReconocidasNetas',
        field: 'ObligacionesReconocidasNetas',
        width: 200,
        cellRenderer: CellRendererOCM,
      },
      {
        headerName: 'ObligacionesPendientes',
        field: 'ObligacionesPendientes',
        width: 180,
        cellRenderer: CellRendererOCM,
      }
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
        autoSize: true,
        title: {
          text: `${this.dataGraphService.getTipoSelect()} ${this.dataGraphService.getCodigoSelect()}`,
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
            yKey: 'ObligacionesReconocidasNetas',
          },
          {
            xKey: 'year',
            yKey: 'ObligacionesPendientes',
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
              }
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

  async createData(pro: string) {
    this.rowData = await this.avalaibleYearsService.getDataAllYear('Pro');
    const datos = this.rowData.filter(x => Math.round(x.CodPro / 10000) === parseInt(pro, 10));

    // const datos = this.rowData.filter(x => {
    //   if (Math.round(x.CodPro / 10000) === parseInt(pro, 10)) {
    //     return x;
    //   }
    // });
    // console.log(datos);

    // Convierto los valores para que sirvan de data al grafico
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

    let ObliNetas2015 = 0;
    let ObliNetas2016 = 0;
    let ObliNetas2017 = 0;
    let ObliNetas2018 = 0;
    let ObliNetas2019 = 0;
    let ObliNetas2020 = 0;
    let ObliNetas2021 = 0;
    let ObliNetas2022 = 0;

    datos.forEach(item => {
      if (item.ObligacionesReconocidasNetas2015 > 0) {
        ObliNetas2015 += item.ObligacionesReconocidasNetas2015;
      }

      if (item.ObligacionesReconocidasNetas2016 > 0) {
        ObliNetas2016 += item.ObligacionesReconocidasNetas2016;
      }

      if (item.ObligacionesReconocidasNetas2017 > 0) {
        ObliNetas2017 += item.ObligacionesReconocidasNetas2017;
      }

      if (item.ObligacionesReconocidasNetas2018 > 0) {
        ObliNetas2018 += item.ObligacionesReconocidasNetas2018;
      }

      if (item.ObligacionesReconocidasNetas2019 > 0) {
        ObliNetas2019 += item.ObligacionesReconocidasNetas2019;
      }

      if (item.ObligacionesReconocidasNetas2020 > 0) {
        ObliNetas2020 += item.ObligacionesReconocidasNetas2020;
      }

      if (item.ObligacionesReconocidasNetas2021 > 0) {
        ObliNetas2021 += item.ObligacionesReconocidasNetas2021;
      }

      if (item.ObligacionesReconocidasNetas2021 > 0) {
        ObliNetas2022 += item.ObligacionesReconocidasNetas2021;
      }

    })

    let ObliPendientes2015 = 0;
    let ObliPendientes2016 = 0;
    let ObliPendientes2017 = 0;
    let ObliPendientes2018 = 0;
    let ObliPendientes2019 = 0;
    let ObliPendientes2020 = 0;
    let ObliPendientes2021 = 0;
    let ObliPendientes2022 = 0;

    datos.forEach(item => {
      if (item.ObligacionesPendientePago2015 > 0) {
        ObliPendientes2015 += item.ObligacionesPendientePago2015;
      }

      if (item.ObligacionesPendientePago2016 > 0) {
        ObliPendientes2016 += item.ObligacionesPendientePago2016;
      }

      if (item.ObligacionesPendientePago2017 > 0) {
        ObliPendientes2017 += item.ObligacionesPendientePago2017;
      }

      if (item.ObligacionesPendientePago2018 > 0) {
        ObliPendientes2018 += item.ObligacionesPendientePago2018;
      }

      if (item.ObligacionesPendientePago2019 > 0) {
        ObliPendientes2019 += item.ObligacionesPendientePago2019;
      }

      if (item.ObligacionesPendientePago2020 > 0) {
        ObliPendientes2020 += item.ObligacionesPendientePago2020;
      }

      if (item.ObligacionesPendientePago2021 > 0) {
        ObliPendientes2021 += item.ObligacionesPendientePago2021;
      }

      if (item.ObligacionesPendientePago2022 > 0) {
        ObliPendientes2015 += item.ObligacionesPendientePago2022;
      }

    })

    const a2015 = {
      "year": "2015",
      "Definitivas": defini2015,
      "ObligacionesReconocidasNetas": ObliNetas2015,
      "ObligacionesPendientes": ObliPendientes2015
    };
    this.data.push(a2015)

    const a2016 = {
      "year": "2016",
      "Definitivas": defini2016,
      "ObligacionesReconocidasNetas": ObliNetas2016,
      "ObligacionesPendientes": ObliPendientes2016
    };
    this.data.push(a2016)

    const a2017 = {
      "year": "2017",
      "Definitivas": defini2017,
      "ObligacionesReconocidasNetas": ObliNetas2017,
      "ObligacionesPendientes": ObliPendientes2017
    };
    this.data.push(a2017)

    const a2018 = {
      "year": "2018",
      "Definitivas": defini2018,
      "ObligacionesReconocidasNetas": ObliNetas2018,
      "ObligacionesPendientes": ObliPendientes2018
    };
    this.data.push(a2018)

    const a2019 = {
      "year": "2019",
      "Definitivas": defini2019,
      "ObligacionesReconocidasNetas": ObliNetas2019,
      "ObligacionesPendientes": ObliPendientes2019
    };
    this.data.push(a2019)

    const a2020 = {
      "year": "2020",
      "Definitivas": defini2020,
      "ObligacionesReconocidasNetas": ObliNetas2020,
      "ObligacionesPendientes": ObliPendientes2020
    };
    this.data.push(a2020)

    const a2021 = {
      "year": "2021",
      "Definitivas": defini2021,
      "ObligacionesReconocidasNetas": ObliNetas2021,
      "ObligacionesPendientes": ObliPendientes2021
    };
    this.data.push(a2021)

    const a2022 = {
      "year": "2022",
      "Definitivas": defini2022,                       // Se usan las iniciales ya que es el unico dato que existe-
      "ObligacionesReconocidasNetas": ObliNetas2022,   // Se utiliza la recaudación neta del último año conocido para no desfigurar el grafico, ya que de lo contrario seria 0.
      "ObligacionesPendientes": ObliPendientes2022
    };
    this.data.push(a2022)
    console.log("Datos Tratados: ", this.data);
    return this.data;
  }

  volver() {
    this.router.navigateByUrl('/SelectCodigo')
  }

}
