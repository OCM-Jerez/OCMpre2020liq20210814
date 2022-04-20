import { Component, ViewChild } from '@angular/core';

import { AgGridAngular } from 'ag-grid-angular';
import { GridOptions } from 'ag-grid-community/main';

import { AvalaibleYearsService } from '../../services/avalaibleYears.service';
import localeTextESPes from '../../../assets/data/localeTextESPes.json';
import { CellRendererOCM, CellRendererOCMtext } from '../../ag-grid/CellRendererOCM';
import { headerHeightGetter } from '../../ag-grid/headerHeightGetter';

import { DataTableGraphService } from '../../services/data-graph.service';
import { Router } from '@angular/router';
import { IDataTableGraph } from '../../commons/interfaces/dataGraph.interface';

import { accumulateOneYear } from '../../commons/util/util';
import gastosOrganicaOrganicos from '../../../assets/data/gastosOrganicaOrganicos.json';



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
    public _avalaibleYearsService: AvalaibleYearsService,
    private _dataTableGraphService: DataTableGraphService

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
    // console.log(this.rowData);

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
      },
    ];
  }

  showGraph() {
    const selectedRows = this.agGrid.api.getSelectedNodes();
    this._dataTableGraphService.selectedCodeRow = selectedRows[0].key;
    this._router.navigateByUrl("/graphGastos")
  }

  showGraphTree() {
    const dataGraphTree = gastosOrganicaOrganicos.map(item => {
      const dataLastYear = this.rowData.filter(x => x.CodOrg == item.codigo);
      const sumDefinitivas = dataLastYear.filter((item) => item["Definitivas2015"]).reduce((prev, current) => prev + current["Definitivas2015"], 0);
      return { ...item, total: sumDefinitivas }
    })
    console.log(dataGraphTree);
    this._dataTableGraphService.dataGraphTree = dataGraphTree;


    // const dataGraphTree = [];
    // for (let index = 0; index <= 25; index++) {
    //   const dataLastYear = this.rowData.filter(x => x.CodOrg == index);
    //   switch (index) {
    //     case 0:
    //       const sum0 = dataLastYear.filter((item) => item["Definitivas2015"]).reduce((prev, current) => prev + current["Definitivas2015"], 0);
    //       const value0 = {
    //         "Organico": index,
    //         "Definitivas": sum0,
    //       }
    //       dataGraphTree.push(value0);
    //       break;
    //     case 1:
    //       const sum1 = dataLastYear.filter((item) => item["Definitivas2015"]).reduce((prev, current) => prev + current["Definitivas2015"], 0);
    //       const value1 = {
    //         "Organico": index,
    //         "Definitivas": sum1,
    //       }
    //       dataGraphTree.push(value1);
    //       break;
    //     case 2:
    //       const sum2 = dataLastYear.filter((item) => item["Definitivas2015"]).reduce((prev, current) => prev + current["Definitivas2015"], 0);
    //       const value2 = {
    //         "Organico": index,
    //         "Definitivas": sum2,
    //       }
    //       dataGraphTree.push(value2);
    //       break;
    //     case 3:
    //       const sum3 = dataLastYear.filter((item) => item["Definitivas2015"]).reduce((prev, current) => prev + current["Definitivas2015"], 0);
    //       const value3 = {
    //         "Organico": index,
    //         "Definitivas": sum3,
    //       }
    //       dataGraphTree.push(value3);
    //       break;
    //     case 4:
    //       const sum4 = dataLastYear.filter((item) => item["Definitivas2015"]).reduce((prev, current) => prev + current["Definitivas2015"], 0);
    //       const value4 = {
    //         "Organico": index,
    //         "Definitivas": sum4,
    //       }
    //       dataGraphTree.push(value4);
    //       break;
    //     case 5:
    //       const sum5 = dataLastYear.filter((item) => item["Definitivas2015"]).reduce((prev, current) => prev + current["Definitivas2015"], 0);
    //       const value5 = {
    //         "Organico": index,
    //         "Definitivas": sum5,
    //       }
    //       dataGraphTree.push(value5);
    //       break;
    //     case 6:
    //       const sum6 = dataLastYear.filter((item) => item["Definitivas2015"]).reduce((prev, current) => prev + current["Definitivas2015"], 0);
    //       const value6 = {
    //         "Organico": index,
    //         "Definitivas": sum6,
    //       }
    //       dataGraphTree.push(value6);
    //       break;
    //   }

    // }
    // console.log(dataGraphTree);




    this._router.navigateByUrl("/graphTree")
  }

}
