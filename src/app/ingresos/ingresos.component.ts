import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AgGridAngular } from 'ag-grid-angular';
import { GridOptions } from 'ag-grid-community/main';

import { GetScreenSizeService } from '../services/get-screen-size.service';

 import localeTextESPes from '@presu/json/localeTextESPes.json';
import { SCREEN_SIZE } from 'src/app/screen-size.enum';
import { CellRendererOCM } from '../shared/utils/utils';
import { GlobalConstants } from '@presu/shared/global-constants';
//import { GlobalConstants } from '../shared/global-constants';

@Component({
  selector: 'app-ingresos',
  templateUrl: './ingresos.component.html',
  styleUrls: ['./ingresos.component.css']
})
export class IngresosPorEconomicoComponent {
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

  // width de todas las columnas con valores úmericos.
  columnasWidth = 160;

  constructor(private http: HttpClient, private getScreenSizeService: GetScreenSizeService) {
    this.screenSize = this.getScreenSizeService.getIsMobileResolution();

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
        // headerName: 'Capitulo-Económico.',
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
                // console.log('params', params);
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
        field: 'Previsiones Iniciales',
        width: this.columnasWidth,
        resizable: true,
        aggFunc: 'sum',
        cellRenderer: CellRendererOCM
      },
      {
        headerName: 'Total Modificaciones',
        field: 'Total Modificaciones',
        width: this.columnasWidth,
        resizable: true,
        aggFunc: 'sum',
        cellRenderer: CellRendererOCM
      },
      {
        headerName: 'Previsiones totales',
        field: 'Previsiones totales',
        width: this.columnasWidth,
        resizable: true,
        aggFunc: 'sum',
        cellRenderer: CellRendererOCM
      },
      {
        headerName: 'Derechos Reconocidos Netos',
        field: 'Derechos Reconocidos Netos',
        width: this.columnasWidth,
        resizable: true,
        aggFunc: 'sum',
        cellRenderer: CellRendererOCM
      },
      {
        headerName: '% de Realizacion del Presupuesto',
        field: '% de Realizacion del Presupuesto',
        width: this.columnasWidth,
        resizable: true,
        aggFunc: 'sum',
        cellRenderer: CellRendererOCM
      },
      {
        headerName: 'Derechos Recaudados',
        field: 'Derechos Recaudados',
        width: this.columnasWidth,
        resizable: true,
        aggFunc: 'sum',
        cellRenderer: CellRendererOCM
      },
      {
        headerName: 'Devoluciones de ingreso',
        field: 'Devoluciones de ingreso',
        width: this.columnasWidth,
        resizable: true,
        aggFunc: 'sum',
        cellRenderer: CellRendererOCM
      },
      {
        headerName: 'Recaudación Líquida',
        field: 'Recaudación Líquida',
        width: this.columnasWidth,
        resizable: true,
        aggFunc: 'sum',
        cellRenderer: CellRendererOCM
      },
      {
        headerName: '% Rec/Der',
        field: '% Rec/Der',
        width: this.columnasWidth,
        resizable: true,
        aggFunc: 'sum',
        cellRenderer: CellRendererOCM
      },
      {
        headerName: 'Derechos Pendientes de Cobro',
        field: 'Derechos Pendientes de Cobro',
        width: this.columnasWidth,
        resizable: true,
        aggFunc: 'sum',
        cellRenderer: CellRendererOCM
      },
      {
        headerName: 'Estado de Ejecución',
        field: 'Estado de Ejecución',
        width: this.columnasWidth,
        resizable: true,
        aggFunc: 'sum',
        cellRenderer: CellRendererOCM
      },
    ];

    this.defaultColDef = {
      sortable: true,
      resizable: true,
      filter: true
    };

    // we pass an empty gridOptions in, so we can grab the api out
    this.gridOptions = {} as GridOptions;
    this.localeText = localeTextESPes;
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.rowData = this.http.get(GlobalConstants.jsonIngresos);
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



