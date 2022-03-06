import { Component, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';

import { AgGridAngular } from 'ag-grid-angular';
import { GridOptions } from 'ag-grid-community/main';

import { AvalaibleYearsService } from '../services/avalaibleYears.service';
import { TipoClasificacionService } from 'src/app/services/tipoClasificacion.service';
import { SCREEN_SIZE } from 'src/app/enums/screen-size.enum';
import { GetScreenSizeService } from '../services/get-screen-size.service';

import localeTextESPes from '../../assets/data/localeTextESPes.json';
import { CellRendererOCM } from '../ag-grid/CellRendererOCM';
import { HeaderAgGridComponent } from 'src/app/ag-grid/header-ag-grid/header-ag-grid.component';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html'
})

export class GastosComponent {
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
  public isExpanded = false;
  public DesCapWidth?: number;
  public DesProWidth?: number;
  public CreditosWidth?: number;
  public screenSize?: any;
  public tipoClasificacion: string;
  myGroupName: string;
  myHeaderName: string;
  myField: string;
  columnsIzda: [];
  columnsDcha: [];
  public year: Observable<string>;

  constructor(
    private getScreenSizeService: GetScreenSizeService,
    private avalaibleYearsService: AvalaibleYearsService,
    public tipoclasificacionService: TipoClasificacionService) {
    this.screenSize = this.getScreenSizeService.getIsMobileResolution();

    this.year = avalaibleYearsService.getAvalaibleYear();

    switch (this.screenSize) {
      case (SCREEN_SIZE.XS1):
        // Xiaomi Redmi Note 6 Pro. Jose Luis Moreno 400
        this.DesCapWidth = 140;
        this.DesProWidth = 130;
        this.CreditosWidth = 100;
        break;
      case (SCREEN_SIZE.XS):
        // El Samsung Note 8 mio, dice que es una pantalla XS 427.
        this.DesCapWidth = 150;
        this.DesProWidth = 150;
        this.CreditosWidth = 100;
        break;
      case (SCREEN_SIZE.SM):
        this.DesCapWidth = 270;
        this.DesProWidth = 350;
        this.CreditosWidth = 100;
        break;
      case (SCREEN_SIZE.MD):
        // El Samsung Note 8 mio, apaisado dice que es una pantalla MD 798.
        this.DesCapWidth = 270;
        this.DesProWidth = 350;
        this.CreditosWidth = 100;
        break;
      case (SCREEN_SIZE.LG):
        this.DesCapWidth = 350;
        this.DesProWidth = 350;
        this.CreditosWidth = 100;
        break;
      case (SCREEN_SIZE.XL):
        // En mi portatil a pantalla completa = XL1920
        this.DesCapWidth = 300;
        this.DesProWidth = 525;
        this.CreditosWidth = 220;
        break;
      default:
    }

    this.CreditosWidth = 100;
    this.tipoClasificacion = tipoclasificacionService.getTipoClasificacion();
    switch (this.tipoClasificacion) {
      case 'capítulo':
        this.myGroupName = 'Capítulo-Programa';
        this.myHeaderName = 'Capítulo';
        this.myField = 'DesCap';
        break;
      case 'económico':
        this.myGroupName = 'Económico-Programa';
        this.myHeaderName = 'Económico';
        this.myField = 'DesEco';
        break;
      case 'orgánico':
        this.myGroupName = 'Orgánico-Programa';
        this.myHeaderName = 'Orgánico';
        this.myField = 'DesOrg';
        break;
      case 'programa':
        this.myGroupName = 'Programa-Capítulo-Económico';
        this.myHeaderName = 'Programa';
        this.myField = 'DesPro';
        break;
      default:
        break;
    }

    switch (tipoclasificacionService.getTipoClasificacion()) {
      case 'capítulo':
      case 'económico':
      case 'orgánico':
        this.columnDefs = [
          {
            headerName: this.myGroupName,
            children: [
              {
                headerName: this.myHeaderName,
                field: this.myField,
                showRowGroup: this.myField,
                rowGroup: true,
                filter: true,
                width: 550,
                pinned: 'left',
                columnGroupShow: 'close',
                sortable: true,
                cellRenderer: 'agGroupCellRenderer',
                comparator: (a: number, b: number) => {
                  if (Number(a) == Number(b)) return 0;
                  return (Number(a) > Number(b)) ? 1 : -1;
                },
                valueGetter: params => {
                  switch (tipoclasificacionService.getTipoClasificacion()) {
                    case 'capítulo':
                      if (params.data) {
                        return params.data.CodCap + ' - ' + params.data.DesCap;
                      } else {
                        return null;
                      }
                      break;
                    case 'económico':
                      if (params.data) {
                        return params.data.CodEco + ' - ' + params.data.DesEco;
                      } else {
                        return null;
                      }
                      break;
                    case 'orgánico':
                      if (params.data) {
                        return params.data.CodOrg + ' - ' + params.data.DesOrg;
                      } else {
                        return null;
                      }
                      break;
                    default:
                      return null
                      break;
                  }
                },
                cellRendererParams: {
                  suppressCount: true,
                  innerRenderer: params => params.node.group ? `<span style="color: black; font-size: 12px; margin-left: 0px;">${params.value}</span>` : null,
                  footerValueGetter(params) {
                    switch (params.node.level) {
                      case 0:  // Total capítulo.
                        return `<span style="color: red; font-size: 14px; font-weight: bold; margin-left: 0px;"> Total ${params.value}</span>`;
                      case -1: // Total general.
                        return '<span style="color: red; font-size: 18px; font-weight: bold; margin-right: 0px;"> Total general' + '</span>';
                      default:
                        return 'SIN FORMATO';
                    }
                  }
                }
              },

              /**
               en el caso de gastos por programa
               anular columna Programa ya que en este caso es la primera y hay que añadir dos niveles más:
                  capítulo
                  económico
               pero no se como crear condicion dentro de el array de
              */

              {
                headerName: 'Programa',
                field: 'DesPro',
                cellClass: 'resaltado',
                width: this.DesProWidth,
                pinned: 'left',
                filter: false,
                rowGroup: true,
                showRowGroup: 'DesPro',
                columnGroupShow: 'open',
                valueGetter: params => {
                  if (params.data) {
                    return params.data.CodPro + ' - ' + params.data.DesPro;
                  } else {
                    return null;
                  }
                },
              },
            ]
          },
          // #region Campos comunes
          {
            headerName: 'Créditos',
            children: [
              {
                headerName: 'Iniciales',
                field: 'Iniciales',
                width: this.CreditosWidth,
                // resizable: true,
                columnGroupShow: 'open',
                aggFunc: 'sum',
                cellRenderer: CellRendererOCM
              },
              {
                headerName: 'Modificaciones',
                field: 'Modificaciones',
                width: 130,
                // resizable: true,
                columnGroupShow: 'open',
                aggFunc: 'sum',
                cellRenderer: CellRendererOCM
              },
              {
                headerName: 'Totales',
                field: 'Definitivas',
                width: 123,
                // resizable: true,
                columnGroupShow: 'close',
                aggFunc: 'sum',
                cellRenderer: CellRendererOCM
              },
            ]
          },
          {
            headerName: 'Gastos',
            // headerComponentFramework: HeaderAgGridComponent,
            children: [
              {
                headerName: 'Comprometidos',
                // headerComponentFramework: HeaderAgGridComponent,
                field: 'GastosComprometidos',
                width: 138,
                // resizable: true,
                columnGroupShow: 'open',
                aggFunc: 'sum',
                cellRenderer: CellRendererOCM
              },
              {
                headerName: 'Obligaciones reconocidas netas',
                // headerComponentFramework: HeaderAgGridComponent,
                field: 'ObligacionesReconocidasNetas',
                width: 128,
                // resizable: true,
                columnGroupShow: 'Close',
                aggFunc: 'sum',
                cellRenderer: CellRendererOCM
              },
              {
                headerName: 'Pagos',
                // headerComponentFramework: HeaderAgGridComponent,
                field: 'Pagos',
                width: this.CreditosWidth,
                // resizable: true,
                columnGroupShow: 'open',
                aggFunc: 'sum',
                cellRenderer: CellRendererOCM
              },
              {
                headerName: 'Obligaciones pendientes de pago al 31 diciembre',
                // headerComponentFramework: HeaderAgGridComponent,
                field: 'ObligacionesPendientePago',
                width: this.CreditosWidth + 20,
                // resizable: true,
                columnGroupShow: 'open',
                aggFunc: 'sum',
                cellRenderer: CellRendererOCM
              },
            ]
          },
          {
            headerName: 'Créditos',
            children: [
              {
                headerName: 'Remanentes de crédito',
                field: 'RemanenteCredito',
                width: 140,
                // resizable: false,
                columnGroupShow: 'close',
                aggFunc: 'sum',
                cellRenderer: CellRendererOCM
              },
            ]
          },
          // #endregion
        ];
        break;
      case 'programa':
        this.columnDefs = [
          {
            headerName: 'Programa-Organico-Capítulo-Económico.',
            children: [
              {
                headerName: 'Programa',
                field: 'DesPro',
                rowGroup: true,
                showRowGroup: 'DesPro',
                filter: true,
                width: this.DesProWidth,
                // minWidth: 300,
                // maxWidth: 520,
                pinned: 'left',
                columnGroupShow: 'close',
                cellRenderer: 'agGroupCellRenderer',
                valueGetter: params => {
                  if (params.data) {
                    return params.data.CodPro + ' - ' + params.data.DesPro;
                  } else {
                    return null;
                  }
                },
                cellRendererParams: {
                  suppressCount: true,
                  innerRenderer: params => params.node.group ? `<span style="color: black; font-size: 12px; margin-left: 0px;">${params.value}</span>` : null,
                  footerValueGetter(params) {
                    switch (params.node.level) {
                      case 0:  // Total programa.
                        return `<span style="color: red; font-size: 14px; font-weight: bold; margin-left: 0px;"> Total ${params.value}</span>`;
                      case -1: // Total general.
                        return '<span style="color: red; font-size: 18px; font-weight: bold; margin-right: 0px;"> Total general' + '</span>';
                      default:
                        return 'SIN FORMATO';
                    }
                  }
                }
              },
              {
                headerName: 'Organico',
                field: 'DesOrg',
                rowGroup: true,
                showRowGroup: 'DesOrg',
                filter: false,
                width: this.DesCapWidth,
                pinned: 'left',
                columnGroupShow: 'open',
                cellRenderer: 'agGroupCellRenderer',
                valueGetter: params => {
                  if (params.data) {
                    return params.data.CodOrg + ' - ' + params.data.DesOrg;
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
                      case 1:  // Total orgánico.
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
                headerName: 'Capítulo',
                field: 'DesCap',
                rowGroup: true,
                showRowGroup: 'DesCap',
                filter: false,
                width: this.DesCapWidth,
                pinned: 'left',
                columnGroupShow: 'open',
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
                      case 2:  // Total capítulo.
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
                width: 390,
                pinned: 'left',
                columnGroupShow: 'open',
                filter: false,
                resizable: true,
                valueGetter: params => {
                  if (params.data) {
                    switch (this.screenSize) {
                      case (SCREEN_SIZE.XS):
                        return params.data.DesEco;
                      case (SCREEN_SIZE.SM):
                        return params.data.DesEco;
                      case (SCREEN_SIZE.MD):
                        return params.data.DesEco;
                      case (SCREEN_SIZE.LG):
                        return params.data.CodEco + ' - ' + params.data.DesEco;
                      case (SCREEN_SIZE.XL):
                        return params.data.CodEco + ' - ' + params.data.DesEco;
                      default:
                    }
                  } else {
                    return null;
                  }
                },
              },
            ]
          },
          // #region Campos comunes
          {
            headerName: 'Créditos',
            children: [
              {
                headerName: 'Iniciales',
                field: 'Iniciales',
                width: this.CreditosWidth,
                // resizable: true,
                columnGroupShow: 'open',
                aggFunc: 'sum',
                cellRenderer: CellRendererOCM
              },
              {
                headerName: 'Modificaciones',
                field: 'Modificaciones',
                width: 130,
                // resizable: true,
                columnGroupShow: 'open',
                aggFunc: 'sum',
                cellRenderer: CellRendererOCM
              },
              {
                headerName: 'Totales',
                field: 'Definitivas',
                width: 123,
                // resizable: true,
                columnGroupShow: 'close',
                aggFunc: 'sum',
                cellRenderer: CellRendererOCM
              },
            ]
          },
          {
            headerName: 'Gastos',
            children: [
              {
                headerName: 'Comprometidos',
                field: 'GastosComprometidos',
                width: 138,
                // resizable: true,
                columnGroupShow: 'open',
                aggFunc: 'sum',
                cellRenderer: CellRendererOCM
              },
              {
                headerName: 'Obligaciones reconocidas netas',
                field: 'ObligacionesReconocidasNetas',
                width: 128,
                // resizable: true,
                columnGroupShow: 'Close',
                aggFunc: 'sum',
                cellRenderer: CellRendererOCM
              },
              {
                headerName: 'Pagos',
                field: 'Pagos',
                width: this.CreditosWidth,
                // resizable: true,
                columnGroupShow: 'open',
                aggFunc: 'sum',
                cellRenderer: CellRendererOCM
              },
              {
                headerName: 'Obligaciones pendientes de pago al 31 diciembre',
                field: 'ObligacionesPendientePago',
                width: this.CreditosWidth + 20,
                // resizable: true,
                columnGroupShow: 'open',
                aggFunc: 'sum',
                cellRenderer: CellRendererOCM
              },
            ]
          },
          {
            headerName: 'Créditos',
            children: [
              {
                headerName: 'Remanentes de crédito',
                field: 'RemanenteCredito',
                width: 118,
                // resizable: true,
                columnGroupShow: 'close',
                aggFunc: 'sum',
                cellRenderer: CellRendererOCM
              },
            ]
          },
          // #endregion
        ];
        break;
      default:
        break;
    }

    this.defaultColDef = {
      sortable: true,
      resizable: true,
      filter: true,
      headerComponentParams: {
        template:
          '<div class="ag-cell-label-container" role="presentation">' +
          '  <span ref="eMenu" class="ag-header-icon ag-header-cell-menu-button"></span>' +
          '  <div ref="eLabel" class="ag-header-cell-label" role="presentation">' +
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
    this.rowData = await this.avalaibleYearsService.getDataJson(true);
  }

  expandAll() {
    this.gridApi.expandAll();
    this.isExpanded = true;
  }

  collapseAll() {
    this.gridApi.collapseAll();
    this.isExpanded = false;
  }

  // TODO: Las colummnas disparan su altura
  headerHeightSetter() {
    // var padding = 20;
    // var height = headerHeightGetter() + padding;
    // this.gridApi.setHeaderHeight(height);
    // this.gridApi.resetRowHeights();
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

