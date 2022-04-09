import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Location } from "@angular/common";

import { AgGridAngular } from 'ag-grid-angular';
import { AgChartOptions, GridOptions } from 'ag-grid-community';
import { CellRendererOCM } from '../../ag-grid/CellRendererOCM';

import { accumulate } from '../../commons/util/util';

import { DataGraphService } from '../../services/data-graph.service';
import { PrepareDataIngresosService } from '../../services/prepareDataIngresos.service';

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
    private location: Location,
    private dataGraphService: DataGraphService,
    private prepareDataIngresosService: PrepareDataIngresosService,
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

  async createData(cap: string) {
    this.rowData = await this.prepareDataIngresosService.getDataAllYear('Cap', true, 'Cap');
    const datos = this.rowData.filter(x => x.CodCap == cap);
    const yearsDefinitivas = accumulate('Definitivas', datos);
    const yearsIniciales = accumulate('Iniciales', datos);
    const yearsNetas = accumulate('RecaudacionNeta', datos);

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

  volver() {
    this.location.back();
  }

}