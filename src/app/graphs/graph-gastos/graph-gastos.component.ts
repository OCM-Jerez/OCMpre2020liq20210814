import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { Location } from "@angular/common";

import { AgGridAngular } from 'ag-grid-angular';
import { AgChartOptions, GridOptions } from 'ag-grid-community';
import { CellRendererOCM } from '../../ag-grid/CellRendererOCM';

import { accumulate } from '../../commons/util/util';
import { DataTableGraphService } from '../../services/data-graph.service';
import { IDataPropertyTableGraph, IDataTable, IDataGraph } from '../../commons/interfaces/dataGraph.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-graph-gastos',
  templateUrl: './graph-gastos.component.html',
  styleUrls: ['./graph-gastos.component.scss']
})
export class GraphGastosComponent implements OnDestroy {
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
  private datos: any[] = [];
  private _dataTableGraph: IDataGraph;
  private _subscription: Subscription;
  constructor(
    private location: Location,
    private _dataTableGraphService: DataTableGraphService,
  ) {

    this._subscription = this._dataTableGraphService.dataSource$.subscribe((data) => {

      this._dataTableGraph = data;
      this._createData();
      this._createColumns()
      this._showGraph()
    });



  }
  ngOnDestroy(): void {
    if (this._subscription) {
      this._subscription.unsubscribe()
    }
  }


  private _showGraph(): void {
    this.options = {
      autoSize: true,
      title: {
        text: this._dataTableGraph.dataPropertyTable.titleGraph,
      },
      subtitle: {
        text: `${this._dataTableGraph.dataPropertyTable.subHeaderName} ${this._dataTableGraphService.selectedCodeRow}`,
      },
      data: [...this.data],
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
  }


  private _createColumns(): void {

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

  async onGridReady(params) {
    // this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  private async _createData() {
    if (this._dataTableGraph.clasificationType != "aplicacion") {
      const codigo = this._dataTableGraphService.selectedCodeRow.split(" ")[0];
      switch (this._dataTableGraph.clasificationType) {
        case 'gastosOrganicaOrganicos':
          this.datos = this._dataTableGraph.data.filter(x => x.CodOrg == codigo);
          break;
        case 'gastosProgramaAreas':
        case 'gastosProgramaPoliticas':
        case 'gastosProgramaGrupos':
        case 'gastosProgramaProgramas':
          this.datos = this._dataTableGraph.data.filter(x => x.CodPro == codigo);
          break;
        // case 'gastosProgramaPoliticas':
        //   this.datos = this._dataTableGraph.data.filter(x => x.CodPro == codigo);
        //   break;
        // case 'gastosProgramaGrupos':
        //   this.datos = this._dataTableGraph.data.filter(x => x.CodPro == codigo);
        //   break;
        // case 'gastosProgramaProgramas':
        //   this.datos = this._dataTableGraph.data.filter(x => x.CodPro == codigo);
        //   break;
        case 'gastosEconomicaCapitulos':
          this.datos = this._dataTableGraph.data.filter(x => x.CodCap == codigo);
          break;
        case 'gastosEconomicaArticulos':
          this.datos = this._dataTableGraph.data.filter(x => x.CodEco == codigo);
          break;
        case 'gastosEconomicaConceptos':
          this.datos = this._dataTableGraph.data.filter(x => x.CodEco == codigo);
          break;
        case 'gastosEconomicaEconomicos':
          this.datos = this._dataTableGraph.data.filter(x => x.CodEco == codigo);
          break;
      }
    } else {
      this.datos = this._dataTableGraph.data
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

