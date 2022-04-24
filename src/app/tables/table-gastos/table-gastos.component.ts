import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { AgGridAngular } from 'ag-grid-angular';
import { GridOptions } from 'ag-grid-community/main';
import { CellRendererOCM, CellRendererOCMtext } from '../../ag-grid/CellRendererOCM';
import { headerHeightGetter } from '../../ag-grid/headerHeightGetter';
import localeTextESPes from '../../../assets/data/localeTextESPes.json';

import { AvalaibleYearsService } from '../../services/avalaibleYears.service';
import { DataTableGraphService } from '../../services/data-graph.service';
import { PrepareDataGraphTreeService } from '../../services/prepareDataGraphTree.service';

import { IDataTableGraph } from '../../commons/interfaces/dataGraph.interface';

@Component({
  selector: 'app-compara-gas',
  templateUrl: './table-gastos.component.html',
})
export class TableGastosComponent {
  @ViewChild('agGrid', { static: false }) agGrid: AgGridAngular;
  public gridColumnApi;
  public columnDefs;
  public defaultColDef;
  public gridOptions: GridOptions;
  public localeText;
  public rowData: any;
  public groupHeaderHeight = 25;
  public headerHeight = 54;
  public rowSelection = 'single';

  private _gridApi;
  private _creditosWidth?: number = 110;
  private _dataTableGraph: IDataTableGraph;

  constructor(
    public avalaibleYearsService: AvalaibleYearsService,
    private _router: Router,
    private _dataTableGraphService: DataTableGraphService,
    private _prepareDataGraphTreeService: PrepareDataGraphTreeService

  ) {
    this._dataTableGraph = _dataTableGraphService.dataTableGraph;

    this.columnDefs = [
      {
        headerName: this._dataTableGraph.dataPropertyTable.headerName,
        children: [
          {
            headerName: this._dataTableGraph.dataPropertyTable.subHeaderName,
            field: this._dataTableGraph.dataPropertyTable.codField,
            cellClass: 'resaltado',
            width: this._dataTableGraph.dataPropertyTable.width,
            pinned: 'left',
            rowGroup: true,
            showRowGroup: this._dataTableGraph.dataPropertyTable.codField,
            columnGroupShow: 'open',
            cellRenderer: CellRendererOCMtext,
            valueGetter: params => {
              if (params.data) {
                return params.data[this._dataTableGraph.dataPropertyTable.codField] + ' - ' + params.data[this._dataTableGraph.dataPropertyTable.desField];
              } else {
                return null;
              }
            }
          },
        ]
      },

      ...this.avalaibleYearsService.getYearsSelected().map(year => {
        return {
          headerName: year,
          children: this.createColumnsChildren(year),
        }
      })

    ];

    this.defaultColDef = {
      width: this._creditosWidth,
      sortable: true,
      resizable: false,
      filter: true,
      aggFunc: 'sum',
      cellRenderer: CellRendererOCM,
      headerComponentParams: {
        template:
          '<div class="ag-cell-label-container" role="presentation">' +
          '  <span ref="eMenu" class="ag-header-icon ag-header-cell-menu-button" ></span>' +
          '  <div ref="eLabel" class="ag-header-cell-label" role="presentation" >' +
          '    <span ref="eSortOrder" class="ag-header-icon ag-sort-order"></span>' +
          '    <span ref="eSortAsc" class="ag-header-icon ag-sort-ascending-icon"></span>' +
          '    <span ref="eSortDesc" class="ag-header-icon ag-sort-descending-icon"></span>' +
          '    <span ref="eSortNone" class="ag-header-icon ag-sort-none-icon"></span>' +
          '    <span ref="eText" class="ag-header-cell-text" role="columnheader" style="white-space: normal;"></span>' +
          '    <span ref="eFilter" class="ag-header-icon ag-filter-icon"></span>' +
          '  </div>' +
          '</div>',
      },
    };
    this.gridOptions = {} as GridOptions;
    this.localeText = localeTextESPes;
  }

  async onGridReady(params) {
    this._gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.rowData = this._dataTableGraph.data
  }

  // TODO: Las colummnas disparan su altura
  headerHeightSetter() {
    // var padding = 20;
    // var height = headerHeightGetter() + padding;
    // this._gridApi.setHeaderHeight(height);
    // this._gridApi.resetRowHeights();
  }

  createColumnsChildren(year: number) {
    return [
      {
        headerName: 'Créditos',
        children: [
          {
            headerName: 'Previsiones Iniciales',
            field: `Iniciales${year}`,
            columnGroupShow: 'open'
          },
          {
            headerName: 'Total Modificaciones',
            field: `Modificaciones${year}`,
            width: 140,
            columnGroupShow: 'open'
          },
          {
            headerName: 'Creditos definitivos',
            field: `Definitivas${year}`,
            width: 140,
            columnGroupShow: 'close'
          },
        ]
      },
      {
        headerName: 'Gastos',
        children: [
          {
            headerName: 'Gastos Comprometidos',
            field: `GastosComprometidos${year}`,
            width: 140,
            columnGroupShow: 'open',
          },
          {
            headerName: 'Obligaciones reconocidas netas',
            field: `ObligacionesReconocidasNetas${year}`,
            width: 135,
            columnGroupShow: 'close'
          },
          {
            headerName: 'Pagos',
            field: `Pagos${year}`,
            columnGroupShow: 'open'
          },
          {
            headerName: 'Obligaciones pendientes de pago al 31 diciembre',
            field: `ObligacionesPendientePago${year}`,
            width: 120,
            columnGroupShow: 'open'
          },
        ]
      },
      {
        headerName: 'Remanente Credito',
        field: `RemanenteCredito${year}`,
      },
    ];
  }

  showGraph() {
    const selectedRows = this.agGrid.api.getSelectedNodes();
    this._dataTableGraphService.selectedCodeRow = selectedRows[0].key;
    this._router.navigateByUrl("/graphGastos")
  }

  showProgramaDetails() {
    const selectedRows = this.agGrid.api.getSelectedNodes();
    if (selectedRows.length > 0) {
      this._dataTableGraphService.selectedCodeRow = selectedRows[0].key;
      this._router.navigateByUrl("/tableProgramaDetails")
    } else {
      alert('Selecciona un programa');
    }
  }

  showGraphTree() {
    this._prepareDataGraphTreeService.prepareDataGraphTree(this.rowData);
    this._router.navigateByUrl("/graphTree")
  }

}
