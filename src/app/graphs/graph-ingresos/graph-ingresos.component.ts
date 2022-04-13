import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Location } from "@angular/common";

import { AgGridAngular } from 'ag-grid-angular';
import { AgChartOptions, GridOptions } from 'ag-grid-community';
import { CellRendererOCM } from '../../ag-grid/CellRendererOCM';

import { accumulate } from '../../commons/util/util';

import { DataGraphService } from '../../services/data-graph.service';
import { PrepareDataIngresosService } from '../../services/prepareDataIngresos.service';
import { TipoClasificacionService } from '../../services/tipoClasificacion.service';

@Component({
  selector: 'app-graph-ingresos',
  templateUrl: './graph-ingresos.component.html',
  styleUrls: ['./graph-ingresos.component.scss']
})
export class GraphIngresosComponent {
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
    private dataGraphService: DataGraphService,
    private prepareDataIngresosService: PrepareDataIngresosService,
    private tipoclasificacionService: TipoClasificacionService,
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
          text: `${this.dataGraphService.getTitleSelect()}`,
        },
        subtitle: {
          text: `${this.dataGraphService.getTipoSelect()} ${this.dataGraphService.getCodigoSelect()}`,
        },
        data: [...this.data],
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
          aggFunc: 'sum',
          cellRenderer: CellRendererOCM,
        },
        {
          headerName: 'RecaudacionNeta',
          field: 'RecaudacionNeta',
          width: 200,
          aggFunc: 'sum',
          cellRenderer: CellRendererOCM,
        },
      ];

      this.defaultColDef = {
        sortable: true,
        resizable: true,
        filter: false,
      };
    }, 500);
  }

  async onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  async createData(codigo: string) {
    switch (this.tipoclasificacionService.getTipoClasificacion()) {
      case 'ingresosEconomicaCapitulos':
        this.rowData = await this.prepareDataIngresosService.getDataAllYear('Cap', false, 'Cap');
        this.datos = this.rowData.filter(x => x.CodCap == codigo);
        break;
      case 'ingresosEconomicaArticulos':
        this.rowData = await this.prepareDataIngresosService.getDataAllYear('Eco', false, 'Eco');
        this.datos = this.rowData.filter(x => Math.round(x.CodEco / 1000) === parseInt(codigo, 10));
        break;
      case 'ingresosEconomicaConceptos':
        this.rowData = await this.prepareDataIngresosService.getDataAllYear('Eco', false, 'Eco');
        this.datos = this.rowData.filter(x => Math.round(x.CodEco / 100) === parseInt(codigo, 10));
        break;
      case 'ingresosEconomicaEconomicos':
        this.rowData = await this.prepareDataIngresosService.getDataAllYear('Eco', false, 'Eco');
        this.datos = this.rowData.filter(x => x.CodEco == codigo);
        break;
    }

    const yearsDefinitivas = accumulate('Definitivas', this.datos);
    // const yearsIniciales = accumulate('Iniciales', this.datos);
    const yearsNetas = accumulate('RecaudacionNeta', this.datos);

    // Convierto los valores para que sirvan de data al grafico
    this.data = [];
    for (let index = 2015; index <= 2021; index++) {
      const value = {
        "year": index,
        "Definitivas": yearsDefinitivas[index],
        "RecaudacionNeta": yearsNetas[index]
      }
      // if (index === 2022) {
      //   value.Definitivas = yearsIniciales[index]
      //   value.RecaudacionNeta = yearsNetas[index - 1]
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

