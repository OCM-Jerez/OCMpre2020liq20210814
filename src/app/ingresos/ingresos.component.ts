import { Component, ViewChild, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { GridOptions } from 'ag-grid-community/main';

import { AvalaibleYearsService } from '../services/avalaibleYears.service';
import { GetScreenSizeService } from '../services/get-screen-size.service';

import localeTextESPes from '@presu/json/localeTextESPes.json';
import { SCREEN_SIZE } from 'src/app/screen-size.enum';
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

  // width de todas las columnas con valores úmericos.
  columnasWidth = 160;

  constructor(private getScreenSizeService: GetScreenSizeService,
    private avalaibleYearsService: AvalaibleYearsService) {
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
        field: 'Iniciales',
        width: this.columnasWidth,
        resizable: true,
        aggFunc: 'sum',
        cellRenderer: CellRendererOCM
      },
      {
        headerName: 'Total Modificaciones',
        field: 'Modificaciones',
        width: this.columnasWidth,
        resizable: true,
        aggFunc: 'sum',
        cellRenderer: CellRendererOCM
      },
      {
        headerName: 'Previsiones totales',
        field: 'Definitivas',
        width: this.columnasWidth,
        resizable: true,
        aggFunc: 'sum',
        cellRenderer: CellRendererOCM
      },
      {
        headerName: 'Derechos Reconocidos',
        field: 'DerechosReconocidos',
        width: this.columnasWidth,
        resizable: true,
        aggFunc: 'sum',
        cellRenderer: CellRendererOCM
      },
      {
        headerName: 'Derechos anulados',
        field: 'DerechosAnulados',
        width: this.columnasWidth,
        resizable: true,
        aggFunc: 'sum',
        cellRenderer: CellRendererOCM
      },
      {
        headerName: 'Derechos cancelados',
        field: 'DerechosCancelados',
        width: this.columnasWidth,
        resizable: true,
        aggFunc: 'sum',
        cellRenderer: CellRendererOCM
      },
      {
        headerName: 'Derechos Reconocidos Netos',
        field: 'DerechosReconocidosNetos',
        width: this.columnasWidth,
        resizable: true,
        aggFunc: 'sum',
        cellRenderer: CellRendererOCM
      },
      {
        headerName: 'Recaudación neta',
        field: 'RecaudacionNeta',
        width: this.columnasWidth,
        resizable: true,
        aggFunc: 'sum',
        cellRenderer: CellRendererOCM
      },
      {
        headerName: 'Derechos Pendientes de Cobro',
        field: 'DerechosPendienteCobro',
        width: this.columnasWidth,
        resizable: true,
        aggFunc: 'sum',
        cellRenderer: CellRendererOCM
      },
      {
        headerName: 'Exceso/defecto previsión',
        field: 'DiferenciaPrevision',
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

}



