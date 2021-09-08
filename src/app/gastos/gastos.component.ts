import { Component, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { GridOptions } from 'ag-grid-community/main';

import { TipoClasificacionService } from 'src/app/services/tipoClasificacion.service';
import { SCREEN_SIZE } from 'src/app/screen-size.enum';
import { GetScreenSizeService } from '../services/get-screen-size.service';
import dataJSON from '@presu/json/202020210814LiqGas.json';
// import dataJSON from '@presu/json/2019LiqGas.json';

import localeTextESPes from '../../assets/data/localeTextESPes.json';
import { CellRendererOCM } from '../shared/utils/utils';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.css']
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
  public headerHeight = 25;
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

  constructor(
    private getScreenSizeService: GetScreenSizeService,
    public tipoclasificacionService: TipoClasificacionService) {
    this.screenSize = this.getScreenSizeService.getIsMobileResolution();
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
        // console.log(this.tipoClasificacion);
        this.myGroupName = 'Capítulo-Programa';
        this.myHeaderName = 'Capítulo';
        this.myField = 'DesCap';
        break;
      case 'económico':
        // console.log(this.tipoClasificacion);
        this.myGroupName = 'Económico-Programa';
        this.myHeaderName = 'Económico';
        this.myField = 'DesEco';
        break;
      case 'organico':
        // console.log(this.tipoClasificacion);
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
      case 'organico':
        // console.log(this.tipoClasificacion);
        // console.log('por el iffffffffffffffffffffffffffffff');
        this.columnDefs = [
          {
            headerName: this.myGroupName,
            // totales = realizados + ordenados + reconocidos
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
                cellRenderer: 'agGroupCellRenderer',
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
                      // console.log('en el casse: ', tipoclasificacionService.getTipoClasificacion());
                      if (params.data) {
                        return params.data.CodEco + ' - ' + params.data.DesEco;
                      } else {
                        return null;
                      }
                      break;
                    case 'organico':
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


              // en el caso de gastos por programa
              // anular columna Programa ya que en este caso es la primera y hay que añadir dos niveles más:
              //      capítulo
              //      económico

              // pero no se como crear condicion dentro de el array de
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
          //************************* campos comunes ***************************
          {
            headerName: 'Créditos',
            children: [
              {
                headerName: 'Totales',
                field: 'definitivas',
                width: 120,
                resizable: true,
                columnGroupShow: 'close',
                aggFunc: 'sum',
                cellRenderer: CellRendererOCM
              },
              {
                headerName: 'Iniciales',
                field: 'Iniciales',
                width: this.CreditosWidth,
                resizable: true,
                columnGroupShow: 'open',
                aggFunc: 'sum',
                cellRenderer: CellRendererOCM
              },
              {
                headerName: 'Modificaciones',
                field: 'Modificaciones',
                width: this.CreditosWidth,
                resizable: true,
                columnGroupShow: 'open',
                aggFunc: 'sum',
                cellRenderer: CellRendererOCM
              },
            ]
          },
          // #region Columnas sin ningun dato en el Excel original.
          // {
          //   headerName: 'Saldo de Créditos Retenidos pdtes de utilización',
          //   field: 'Saldo de Créditos Retenidos pdtes de utilización',
          //   width: this.CreditosWidth,
          //   resizable: true,
          //   aggFunc: 'sum',
          //   cellRenderer: CellRendererOCM
          // },
          // {
          //   headerName: 'Saldo de Créditos Retenidos para Trans',
          //   field: 'Saldo de Créditos Retenidos para Trans',
          //   width: this.CreditosWidth,
          //   resizable: true,
          //   aggFunc: 'sum',
          //   cellRenderer: CellRendererOCM
          // },
          // {
          //   headerName: 'Saldo de Acuerd Créd para No DisponibilIdad',
          //   field: 'Saldo de Acuerd Créd para No DisponibilIdad',
          //   width: this.CreditosWidth,
          //   resizable: true,
          //   aggFunc: 'sum',
          //   cellRenderer: CellRendererOCM
          // },
          // {
          //   headerName: 'Saldo de Gastos Autorizados',
          //   field: 'Saldo de Gastos Autorizados',
          //   width: this.CreditosWidth,
          //   resizable: true,
          //   aggFunc: 'sum',
          //   cellRenderer: CellRendererOCM
          // },
          // {
          //   headerName: 'Saldo de Gastos Comprometidos',
          //   field: 'Saldo de Gastos Comprometidos',
          //   width: this.CreditosWidth,
          //   resizable: true,
          //   aggFunc: 'sum',
          //   cellRenderer: CellRendererOCM
          // },
          // #endregion
          {
            headerName: 'Pagos',
            // totales = realizados + ordenados + reconocidos
            children: [
              {
                headerName: 'Totales',
                // field: 'ObligacionesReconocidasNetas',
                field: 'Pagos',
                width: this.CreditosWidth,
                resizable: true,
                columnGroupShow: 'close',
                aggFunc: 'sum',
                cellRenderer: CellRendererOCM
              },
              // {
              //   headerName: 'Realizados',
              //   field: 'Pagos',
              //   width: this.CreditosWidth,
              //   resizable: true,
              //   columnGroupShow: 'open',
              //   aggFunc: 'sum',
              //   cellRenderer: CellRendererOCM
              // },
              // {
              //   headerName: 'Ordenados',
              //   field: 'Saldo de Pagos Ordenados',
              //   width: this.CreditosWidth,
              //   resizable: true,
              //   columnGroupShow: 'open',
              //   aggFunc: 'sum',
              //   cellRenderer: CellRendererOCM
              // },
              // {
              //   headerName: 'Reconocidos',
              //   field: 'Saldo de Obligaciones Reconocidas',
              //   width: this.CreditosWidth,
              //   resizable: true,
              //   columnGroupShow: 'open',
              //   aggFunc: 'sum',
              //   cellRenderer: CellRendererOCM
              // },
            ]
          },
          {
            headerName: 'OPA',
            field: 'ObligacionesPendientePago',
            width: this.CreditosWidth,
            resizable: true,
            aggFunc: 'sum',
            cellRenderer: CellRendererOCM
          },
          {
            headerName: 'Saldos',
            // real = disponible - facturas
            children: [
              {
                headerName: 'Creditos disponibles',
                children: [
                  {
                    headerName: 'Disponibles',
                    field: 'RemanenteCredito',
                    width: 140,
                    resizable: true,
                    columnGroupShow: 'close',
                    aggFunc: 'sum',
                    cellRenderer: CellRendererOCM
                  },
                  // {
                  //   headerName: 'Facturas',
                  //   field: 'Facturas consumen disp Pend Contabilizar',
                  //   width: this.CreditosWidth,
                  //   resizable: true,
                  //   columnGroupShow: 'open',
                  //   aggFunc: 'sum',
                  //   cellRenderer: CellRendererOCM
                  // },
                  // {
                  //   headerName: 'Real',
                  //   field: 'Saldo de Crédito Disponible Real',
                  //   width: this.CreditosWidth,
                  //   resizable: true,
                  //   columnGroupShow: 'open',
                  //   aggFunc: 'sum',
                  //   cellRenderer: CellRendererOCM
                  // },
                  // {
                  //   headerName: 'Vinculación',
                  //   field: 'Saldo de Créditos disp a nivel de Vinculación',
                  //   width: this.CreditosWidth,
                  //   resizable: true,
                  //   columnGroupShow: 'open',
                  //   aggFunc: 'sum',
                  //   cellRenderer: CellRendererOCM
                  // },
                ]
              },
            ]
          },
          // {
          //   headerName: '% de Realizacion del Presupuesto',
          //   field: '% de Realizacion del Presupuesto',
          //   width: this.CreditosWidth,
          //   resizable: true,
          //   aggFunc: 'sum',
          //   cellRenderer: CellRendererOCM
          // },

          // {
          //   headerName: 'Gastado en Fase Definitiva',
          //   field: 'Gastado en Fase Definitiva',
          //   width: this.CreditosWidth,
          //   resizable: true,
          //   aggFunc: 'sum',
          //   cellRenderer: CellRendererOCM
          // },
        ];
        break;
      case 'programa':
        // console.log('por progrma');
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
                      case 1:  // Total organico.
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
                width: 90,
                pinned: 'left',
                columnGroupShow: 'open',
                filter: false,
                valueGetter: params => {
                  // console.log(this.screen);
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
                    // #region Determinar tamaño pantalla
                    // switch (this.screen) {
                    //   case (SCREEN_SIZE.XS):
                    //     return '<span style="color: red; font-size: 8px;"> ' + params.data.CodEco + ' - ' + params.data.DesEco + '</span>';
                    //   case (SCREEN_SIZE.SM):
                    //     return '<span style="color: red; font-size: 8px;"> ' + params.data.CodEco + ' - ' + params.data.DesEco + '</span>';
                    //   case (SCREEN_SIZE.MD):
                    //     return '<span style="color: red; font-size: 8px;"> ' + params.data.CodEco + ' - ' + params.data.DesEco + '</span>';
                    //   case (SCREEN_SIZE.LG):
                    //     return '<span style="color: red; font-size: 8px;"> ' + params.data.CodEco + ' - ' + params.data.DesEco + '</span>';
                    //   case (SCREEN_SIZE.XL):
                    //     return '<span style="color: red; font-size: 12px;"> ' + params.data.DesEco + '</span>';
                    //   default:
                    // }
                    // #endregion
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
                headerName: 'Totales',
                field: 'definitivas',
                width: 120,
                resizable: true,
                columnGroupShow: 'close',
                aggFunc: 'sum',
                cellRenderer: CellRendererOCM
              },
              {
                headerName: 'Iniciales',
                field: 'Iniciales',
                width: this.CreditosWidth,
                resizable: true,
                columnGroupShow: 'open',
                aggFunc: 'sum',
                cellRenderer: CellRendererOCM
              },
              {
                headerName: 'Modificaciones',
                field: 'Modificaciones',
                width: this.CreditosWidth,
                resizable: true,
                columnGroupShow: 'open',
                aggFunc: 'sum',
                cellRenderer: CellRendererOCM
              },
            ]
          },
          // #region Columnas sin ningun dato en el Excel original.
          // {
          //   headerName: 'Saldo de Créditos Retenidos pdtes de utilización',
          //   field: 'Saldo de Créditos Retenidos pdtes de utilización',
          //   width: this.CreditosWidth,
          //   resizable: true,
          //   aggFunc: 'sum',
          //   cellRenderer: CellRendererOCM
          // },
          // {
          //   headerName: 'Saldo de Créditos Retenidos para Trans',
          //   field: 'Saldo de Créditos Retenidos para Trans',
          //   width: this.CreditosWidth,
          //   resizable: true,
          //   aggFunc: 'sum',
          //   cellRenderer: CellRendererOCM
          // },
          // {
          //   headerName: 'Saldo de Acuerd Créd para No DisponibilIdad',
          //   field: 'Saldo de Acuerd Créd para No DisponibilIdad',
          //   width: this.CreditosWidth,
          //   resizable: true,
          //   aggFunc: 'sum',
          //   cellRenderer: CellRendererOCM
          // },
          // {
          //   headerName: 'Saldo de Gastos Autorizados',
          //   field: 'Saldo de Gastos Autorizados',
          //   width: this.CreditosWidth,
          //   resizable: true,
          //   aggFunc: 'sum',
          //   cellRenderer: CellRendererOCM
          // },
          // {
          //   headerName: 'Saldo de Gastos Comprometidos',
          //   field: 'Saldo de Gastos Comprometidos',
          //   width: this.CreditosWidth,
          //   resizable: true,
          //   aggFunc: 'sum',
          //   cellRenderer: CellRendererOCM
          // },
          // #endregion
          {
            headerName: 'Pagos',
            // totales = realizados + ordenados + reconocidos
            children: [
              {
                headerName: 'Totales',
                field: 'Pagos',
                width: this.CreditosWidth,
                resizable: true,
                columnGroupShow: 'close',
                aggFunc: 'sum',
                cellRenderer: CellRendererOCM
              },
              // {
              //   headerName: 'Realizados',
              //   field: 'Pagos Realizados',
              //   width: this.CreditosWidth,
              //   resizable: true,
              //   columnGroupShow: 'open',
              //   aggFunc: 'sum',
              //   cellRenderer: CellRendererOCM
              // },
              // {
              //   headerName: 'Ordenados',
              //   field: 'Saldo de Pagos Ordenados',
              //   width: this.CreditosWidth,
              //   resizable: true,
              //   columnGroupShow: 'open',
              //   aggFunc: 'sum',
              //   cellRenderer: CellRendererOCM
              // },
              // {
              //   headerName: 'Reconocidos',
              //   field: 'Saldo de Obligaciones Reconocidas',
              //   width: this.CreditosWidth,
              //   resizable: true,
              //   columnGroupShow: 'open',
              //   aggFunc: 'sum',
              //   cellRenderer: CellRendererOCM
              // },
            ]
          },
          {
            headerName: 'OPA',
            field: 'ObligacionesPendientePago',
            width: this.CreditosWidth,
            resizable: true,
            aggFunc: 'sum',
            cellRenderer: CellRendererOCM
          },
          {
            headerName: 'Saldos',
            // real = disponible - facturas
            children: [
              {
                headerName: 'Creditos disponibles',
                children: [
                  {
                    headerName: 'Disponibles',
                    field: 'RemanenteCredito',
                    width: 140,
                    resizable: true,
                    columnGroupShow: 'close',
                    aggFunc: 'sum',
                    cellRenderer: CellRendererOCM
                  },
                  // {
                  //   headerName: 'Facturas',
                  //   field: 'Facturas consumen disp Pend Contabilizar',
                  //   width: this.CreditosWidth,
                  //   resizable: true,
                  //   columnGroupShow: 'open',
                  //   aggFunc: 'sum',
                  //   cellRenderer: CellRendererOCM
                  // },
                  // {
                  //   headerName: 'Real',
                  //   field: 'Saldo de Crédito Disponible Real',
                  //   width: this.CreditosWidth,
                  //   resizable: true,
                  //   columnGroupShow: 'open',
                  //   aggFunc: 'sum',
                  //   cellRenderer: CellRendererOCM
                  // },
                  // {
                  //   headerName: 'Vinculación',
                  //   field: 'Saldo de Créditos disp a nivel de Vinculación',
                  //   width: this.CreditosWidth,
                  //   resizable: true,
                  //   columnGroupShow: 'open',
                  //   aggFunc: 'sum',
                  //   cellRenderer: CellRendererOCM
                  // },
                ]
              },
            ]
          },
          // {
          //   headerName: '% de Realizacion del Presupuesto',
          //   field: '% de Realizacion del Presupuesto',
          //   width: this.CreditosWidth,
          //   resizable: true,
          //   aggFunc: 'sum',
          //   cellRenderer: CellRendererOCM
          // },

          // {
          //   headerName: 'Gastado en Fase Definitiva',
          //   field: 'Gastado en Fase Definitiva',
          //   width: this.CreditosWidth,
          //   resizable: true,
          //   aggFunc: 'sum',
          //   cellRenderer: CellRendererOCM
          // },
          // #endregion
        ];
        break;
      default:
        break;
    }

    this.defaultColDef = {
      sortable: true,
      resizable: true,
      filter: true
    };
    this.gridOptions = {} as GridOptions;
    this.localeText = localeTextESPes;
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.rowData = dataJSON
  }

  expandAll() {
    this.gridApi.expandAll();
    this.isExpanded = true;
  }

  collapseAll() {
    this.gridApi.collapseAll();
    this.isExpanded = false;
  }
}

