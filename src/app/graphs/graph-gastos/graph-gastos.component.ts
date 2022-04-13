import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Location } from "@angular/common";

import { AgGridAngular } from 'ag-grid-angular';
import { AgChartOptions, GridOptions } from 'ag-grid-community';
import { CellRendererOCM } from '../../ag-grid/CellRendererOCM';

import { accumulate } from '../../commons/util/util';
// import { AvalaibleYearsService } from '../../services/avalaibleYears.service';
import { DataGraphService } from '../../services/data-graph.service';
import { TipoClasificacionService } from '../../services/tipoClasificacion.service';
import { PrepareDataGastosService } from '../../services/prepareDataGastos.service';

@Component({
  selector: 'app-graph-gastos',
  templateUrl: './graph-gastos.component.html',
  styleUrls: ['./graph-gastos.component.scss']
})
export class GraphGastosComponent implements AfterViewInit {
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
  private datos: [] = [];

  constructor(
    private location: Location,
    // private avalaibleYearsService: AvalaibleYearsService,
    private dataGraphService: DataGraphService,
    private tipoclasificacionService: TipoClasificacionService,
    private prepareDataGastosService: PrepareDataGastosService,
  ) {
    this.createData(this.dataGraphService.getCodigoSelect().split(" ")[0]);
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
        aggFunc: 'sum',
        cellRenderer: CellRendererOCM,
      },
      {
        headerName: 'ObligacionesReconocidasNetas',
        field: 'ObligacionesReconocidasNetas',
        width: 200,
        aggFunc: 'sum',
        cellRenderer: CellRendererOCM,
      },
      {
        headerName: 'ObligacionesPendientes',
        field: 'ObligacionesPendientes',
        width: 180,
        aggFunc: 'sum',
        cellRenderer: CellRendererOCM,
      }
    ];

    this.defaultColDef = {
      sortable: true,
      resizable: true,
      filter: false,
    };

  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.options = {
        autoSize: true,
        title: {
          text: `${this.dataGraphService.getTitleSelect()}`,
        },
        subtitle: {
          text: `${this.dataGraphService.getTipoSelect()} ${this.dataGraphService.getCodigoSelect()}`,
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

  async createData(codigo: string) {
    switch (this.tipoclasificacionService.getTipoClasificacion()) {
      case 'gastosOrganicaOrganicos':
        this.rowData = await this.prepareDataGastosService.getDataAllYear('Org', true, 'Org');
        this.datos = this.rowData.filter(x => x.CodOrg == codigo);
        break;

      case 'gastosProgramaAreas':
        this.rowData = await this.prepareDataGastosService.getDataAllYear('Pro', true, 'Pro');
        this.datos = this.rowData.filter(x => Math.round(x.CodPro / 10000) === parseInt(codigo, 10));
        break;
      case 'gastosProgramaPoliticas':
        this.rowData = await this.prepareDataGastosService.getDataAllYear('Pro', true, 'Pro');
        this.datos = this.rowData.filter(x => Math.round(x.CodPro / 1000) === parseInt(codigo, 10));
        break;
      case 'gastosProgramaGrupos':
        this.rowData = await this.prepareDataGastosService.getDataAllYear('Pro', true, 'Pro');
        this.datos = this.rowData.filter(x => Math.round(x.CodPro / 100) === parseInt(codigo, 10));
        break;
      case 'gastosProgramaProgramas':
        this.rowData = await this.prepareDataGastosService.getDataAllYear('Pro', true, 'Pro');
        this.datos = this.rowData.filter(x => x.CodPro == codigo);
        break;

      case 'gastosEconomicaCapitulos':
        this.rowData = await this.prepareDataGastosService.getDataAllYear('Cap', true, 'Cap');
        this.datos = this.rowData.filter(x => x.CodCap == codigo);
        break;
      case 'gastosEconomicaArticulos':
        this.rowData = await this.prepareDataGastosService.getDataAllYear('Eco', true, 'Eco');
        this.datos = this.rowData.filter(x => Math.round(x.CodEco / 1000) === parseInt(codigo, 10));
        break;
      case 'gastosEconomicaConceptos':
        this.rowData = await this.prepareDataGastosService.getDataAllYear('Eco', true, 'Eco');
        this.datos = this.rowData.filter(x => Math.round(x.CodEco / 100) === parseInt(codigo, 10));
        break;
      case 'gastosEconomicaEconomicos':
        this.rowData = await this.prepareDataGastosService.getDataAllYear('Eco', true, 'Eco');
        this.datos = this.rowData.filter(x => x.CodEco == codigo);
        break;
    }

    // const yearsIniciales = accumulate('Iniciales', this.datos);
    const yearsDefinitivas = accumulate('Definitivas', this.datos);
    const yearsObligacionesNetas = accumulate('ObligacionesReconocidasNetas', this.datos);
    const yearsObligacionesPendientes = accumulate('ObligacionesPendientePago', this.datos);

    this.data = [];
    for (let index = 2015; index <= 2021; index++) {
      const value = {
        "year": index,
        "Definitivas": yearsDefinitivas[index],
        "ObligacionesReconocidasNetas": yearsObligacionesNetas[index],
        "ObligacionesPendientes": yearsObligacionesPendientes[index]
      }
      // if (index === 2022) {
      //   value.Definitivas = yearsIniciales[index]  // Se usan las iniciales ya que es el unico dato que existe.
      // }
      this.data.push(value)
    }
    // console.log("Datos Tratados: ", this.data);
    return this.data;
  }

  volver() {
    this.location.back();
  }

}

