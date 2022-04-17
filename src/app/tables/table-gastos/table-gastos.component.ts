import { Component, ViewChild } from '@angular/core';

import { AgGridAngular } from 'ag-grid-angular';
import { GridOptions } from 'ag-grid-community/main';

import { AvalaibleYearsService } from '../../services/avalaibleYears.service';
import localeTextESPes from '../../../assets/data/localeTextESPes.json';
import { CellRendererOCM, CellRendererOCMtext } from '../../ag-grid/CellRendererOCM';
import { headerHeightGetter } from '../../ag-grid/headerHeightGetter';
import { TipoClasificacionService } from 'src/app/services/tipoClasificacion.service';

import { DataTableGraphService } from '../../services/data-graph.service';
import { Router } from '@angular/router';
import { PrepareDataGastosService } from '../../services/prepareDataGastos.service';
import { IDataTableGraph } from '../../commons/interfaces/dataGraph.interface';

@Component({
  selector: 'app-compara-gas',
  templateUrl: './table-gastos.component.html',
})
export class TableGastosComponent {
  @ViewChild('agGrid', { static: false }) agGrid: AgGridAngular;
  private gridApi;
  public gridColumnApi;
  public columnDefs;
  public defaultColDef;
  public gridOptions: GridOptions;
  public localeText;
  public rowData: any;
  public groupHeaderHeight = 25;
  public headerHeight = 54;
  public CreditosWidth?: number = 110;
  public tipoClasificacion: string;
  public rowSelection = 'single';

  private _dataTableGraph: IDataTableGraph;

  constructor(
    private _router: Router,
    private _avalaibleYearsService: AvalaibleYearsService,
    private _tipoclasificacionService: TipoClasificacionService,
    private _prepareDataGastosService: PrepareDataGastosService,
    private _dataTableGraphService: DataTableGraphService

  ) {
    this._dataTableGraph = _dataTableGraphService.dataTableGraph;

    // this.tipoClasificacion = this._tipoclasificacionService.getTipoClasificacion();

    // switch (this.tipoClasificacion) {
    //   case 'gastosOrganicaOrganicos':
    //     this._sufijo = 'Org';
    //     this._headerName = 'Clasificado por orgánico';
    //     this._subHeaderName = 'Orgánico';
    //     this._codField = 'CodOrg';
    //     this._desField = 'DesOrg';
    //     this._width = 250;
    //     break;

    //   case 'gastosProgramaAreas':
    //     this._sufijo = 'Pro';
    //     this._headerName = 'Clasificado por areas de programas de gasto';
    //     this._subHeaderName = 'Area de gasto';
    //     this._codField = 'CodPro';
    //     this._desField = 'DesPro';
    //     this._width = 550;
    //     break;
    //   case 'gastosProgramaPoliticas':
    //     this._sufijo = 'Pro';
    //     this._headerName = 'Clasificado por políticas de gasto';
    //     this._subHeaderName = 'Política de gasto';
    //     this._codField = 'CodPro';
    //     this._desField = 'DesPro';
    //     this._width = 550;
    //     break;
    //   case 'gastosProgramaGrupos':
    //     this._sufijo = 'Pro';
    //     this._headerName = 'Clasificado por grupos programas de gasto';
    //     this._subHeaderName = 'Grupo programas de gasto';
    //     this._codField = 'CodPro';
    //     this._desField = 'DesPro';
    //     this._width = 550;
    //     break;
    //   case 'gastosProgramaProgramas':
    //     this._sufijo = 'Pro';
    //     this._headerName = 'Clasificado por programa';
    //     this._subHeaderName = 'Programa';
    //     this._codField = 'CodPro';
    //     this._desField = 'DesPro';
    //     this._width = 550;
    //     break;

    //   case 'gastosEconomicaCapitulos':
    //     this._sufijo = 'Cap';
    //     this._headerName = 'Clasificado por capítulo';
    //     this._subHeaderName = 'Capítulo';
    //     this._codField = 'CodCap';
    //     this._desField = 'DesCap';
    //     this._width = 250;
    //     break;
    //   case 'gastosEconomicaArticulos':
    //     this._sufijo = 'Eco';
    //     this._headerName = 'Clasificado por articulo';
    //     this._subHeaderName = 'Articulo';
    //     this._codField = 'CodEco';
    //     this._desField = 'DesEco';
    //     this._width = 250;
    //     break;
    //   case 'gastosEconomicaConceptos':
    //     this._sufijo = 'Eco';
    //     this._headerName = 'Clasificado por concepto';
    //     this._subHeaderName = 'Concepto';
    //     this._codField = 'CodEco';
    //     this._desField = 'DesEco';
    //     this._width = 250;
    //     break;
    //   case 'gastosEconomicaEconomicos':
    //     this._sufijo = 'Eco';
    //     this._headerName = 'Clasificado por económico';
    //     this._subHeaderName = 'Económico';
    //     this._codField = 'CodEco';
    //     this._desField = 'DesEco';
    //     this._width = 400;
    //     break;
    // }

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

      ...this._avalaibleYearsService.getYearsSelected().map(year => {
        return {
          headerName: year,
          children: this.createColumnsChildren(year),
        }
      })

    ];

    this.defaultColDef = {
      width: this.CreditosWidth,
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
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.rowData = this._dataTableGraph.data
  }

  // TODO: Las colummnas disparan su altura
  headerHeightSetter() {
    // var padding = 20;
    // var height = headerHeightGetter() + padding;
    // this.gridApi.setHeaderHeight(height);
    // this.gridApi.resetRowHeights();
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
        // hide: true,
      },
    ];
  }

  showGraph() {
    const selectedRows = this.agGrid.api.getSelectedNodes();
    this._dataTableGraphService.selectedCodeRow = selectedRows[0].key;
    this._router.navigateByUrl("/graphGastos")
  }

}

// function headerHeightGetter() {
//   var columnHeaderTexts = document.querySelectorAll('.ag-header-cell-text');
//   var columnHeaderTextsArray: Element[] = [];
//   columnHeaderTexts.forEach(node => columnHeaderTextsArray.push(node));
//   var clientHeights = columnHeaderTextsArray.map(
//     headerText => headerText.clientHeight
//   );
//   var tallestHeaderTextHeight = Math.max(...clientHeights);
//   return tallestHeaderTextHeight;
// }