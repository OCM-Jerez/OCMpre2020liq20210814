import { Component, ViewChild, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { AgGridAngular } from 'ag-grid-angular';
import { GridOptions } from 'ag-grid-community/main';

import { AvalaibleYearsService } from '../services/avalaibleYears.service';
import { GetScreenSizeService } from '../services/get-screen-size.service';

import localeTextESPes from '@presu/json/localeTextESPes.json';
import { SCREEN_SIZE } from 'src/app/enums/screen-size.enum';
import { CellRendererOCM } from '../ag-grid/CellRendererOCM';

@Component({
  selector: 'app-ingresos',
  templateUrl: './ingresos.component.html'
})
export class IngresosComponent {
  @ViewChild('agGrid', { static: false }) agGrid: AgGridAngular;
  private gridApi;
  public gridColumnApi;
  public columnDefs;
  public defaultColDef;
  public gridOptions: GridOptions;
  public localeText;
  public rowData: any;
  public groupHeaderHeight = 25;
  public headerHeight = 25;
  public isExpanded = false;
  public DesCapWidth?: number;
  public DesEcoWidth?: number;
  public CreditosWidth?: number;
  public screenSize?: any;
  columnasWidth = 130;
  public year: Observable<string>;

  constructor(private getScreenSizeService: GetScreenSizeService,
    private avalaibleYearsService: AvalaibleYearsService) {
    this.screenSize = this.getScreenSizeService.getIsMobileResolution();

    this.year = avalaibleYearsService.getAvalaibleYear();

    switch (this.screenSize) {
      case (SCREEN_SIZE.XS1):
        // Xiaomi Redmi Note 6 Pro. Jose Luis Moreno 400
        this.DesCapWidth = 120;
        this.DesEcoWidth = 150;
        this.CreditosWidth = 100;
        break;
      case (SCREEN_SIZE.XS):
        // El Samsung Note 8 mio, dice que es una pantalla XS 427.
        this.DesCapWidth = 130;
        this.DesEcoWidth = 140;
        this.CreditosWidth = 100;
        break;
      case (SCREEN_SIZE.SM):
        this.DesCapWidth = 250;
        this.DesEcoWidth = 370;
        this.CreditosWidth = 100;
        break;
      case (SCREEN_SIZE.MD1):
        // Xiaomi Redmi Note 6 Pro apaisado. Jose Luis Moreno 700
        this.DesCapWidth = 300;
        this.DesEcoWidth = 270;
        this.CreditosWidth = 100;
        break;
      case (SCREEN_SIZE.MD):
        // El Samsung Note 8 mio, apaisado dice que es una pantalla MD 798.
        this.DesCapWidth = 300;
        this.DesEcoWidth = 270;
        this.CreditosWidth = 100;
        break;
      case (SCREEN_SIZE.LG):
        this.DesCapWidth = 250;
        this.DesEcoWidth = 350;
        this.CreditosWidth = 100;
        break;
      case (SCREEN_SIZE.XL):
        // En mi portatil a pantalla completa = XL1920
        this.DesCapWidth = 525;
        this.DesEcoWidth = 500;
        this.CreditosWidth = 220;
        break;
      default:
    }

    this.columnDefs = [
      {
        children: [
          {
            headerName: 'Capitulo',
            field: 'DesCap',
            width: 265,
            rowGroup: true,
            filter: false,
            pinned: 'left',
            showRowGroup: 'DesCap',
            cellRenderer: 'agGroupCellRenderer',
            valueGetter: params => {
              if (params.data) {
                return params.data.CodCap + ' - ' + params.data.DesCap;
              } else {
                return null;
              }
            },
            cellRendererParams: {
              suppressCount: true,
              innerRenderer: params => {
                if (params.node.group) {
                  return params.value;
                } else {
                  return '';
                }
              },
              footerValueGetter(params) {
                const val = params.value.split(' - ')[1];
                switch (params.node.level) {
                  case 0:  // Total capítulo.
                    return `<span style="color: red; font-size: 12px;  font-weight: bold; margin-left: 0px;"> Total ${val}</span>`;
                  case -1: // Total general.
                    return '';
                  default:
                    return 'SIN FORMATO';
                }
              }
            }
          },

          {
            headerName: 'Económico',
            field: 'DesEco',
            cellClass: 'resaltado',
            width: this.DesEcoWidth,
            pinned: 'left',
            filter: false,
            valueGetter: params => {
              if (params.data) {
                return params.data.CodEco + ' - ' + params.data.DesEco;
              } else {
                return null;
              }
            },
          },
        ]
      },
      {
        headerName: 'Previsiones Iniciales',
        field: 'Iniciales',
      },
      {
        headerName: 'Total Modificaciones',
        field: 'Modificaciones',
      },
      {
        headerName: 'Previsiones definitivas',
        field: 'Definitivas',
      },
      {
        headerName: 'Derechos Reconocidos',
        field: 'DerechosReconocidos',
      },
      {
        headerName: 'Derechos anulados',
        field: 'DerechosAnulados',
      },
      {
        headerName: 'Derechos cancelados',
        field: 'DerechosCancelados',
      },
      {
        headerName: 'Derechos Reconocidos Netos',
        field: 'DerechosReconocidosNetos',
      },
      {
        headerName: 'Recaudación neta',
        field: 'RecaudacionNeta',
      },
      {
        headerName: 'Derechos Pendientes de cobro al 31 diciembre',
        field: 'DerechosPendienteCobro',
      },
      {
        headerName: 'Exceso/defecto previsión',
        field: 'DiferenciaPrevision',
      },
    ];

    this.defaultColDef = {
      width: this.columnasWidth,
      sortable: true,
      resizable: true,
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

    // we pass an empty gridOptions in, so we can grab the api out
    this.gridOptions = {} as GridOptions;
    this.localeText = localeTextESPes;
  }

  async onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.rowData = await this.avalaibleYearsService.getDataJson(false);
  }

  expandAll() {
    this.gridApi.expandAll();
    this.isExpanded = true;
  }

  collapseAll() {
    this.gridApi.collapseAll();
    this.isExpanded = false;
  }

  headerHeightSetter() {
    var padding = 20;
    var height = headerHeightGetter() + padding;
    this.gridApi.setHeaderHeight(height);
    this.gridApi.resetRowHeights();
  }

}

function headerHeightGetter() {
  var columnHeaderTexts = document.querySelectorAll('.ag-header-cell-text');
  var columnHeaderTextsArray: Element[] = [];
  columnHeaderTexts.forEach(node => columnHeaderTextsArray.push(node));
  var clientHeights = columnHeaderTextsArray.map(
    headerText => headerText.clientHeight
  );
  var tallestHeaderTextHeight = Math.max(...clientHeights);
  return tallestHeaderTextHeight;
}
