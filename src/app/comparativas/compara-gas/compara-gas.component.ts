import { Component, ViewChild } from '@angular/core';

import { AgGridAngular } from 'ag-grid-angular';
import { GridOptions } from 'ag-grid-community/main';

import { AvalaibleYearsService } from '../../services/avalaibleYears.service';
import localeTextESPes from '../../../assets/data/localeTextESPes.json';
import { CellRendererOCM, CellRendererOCMtext } from '../../ag-grid/CellRendererOCM';
import { TipoClasificacionService } from 'src/app/services/tipoClasificacion.service';

@Component({
  selector: 'app-compara-gas',
  templateUrl: './compara-gas.component.html',
})
export class ComparaGasComponent {
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
  public CreditosWidth?: number = 110;
  public tipoClasificacion: string;
  private _headerName: string;
  private _subHeaderName: string;
  private _codField: string;
  private _desField: string;
  private _width: number;

  constructor(private avalaibleYearsService: AvalaibleYearsService,
    private tipoclasificacionService: TipoClasificacionService) {
    this.tipoClasificacion = tipoclasificacionService.getTipoClasificacion();
    switch (this.tipoClasificacion) {
      case 'Cap':
        this._headerName = 'Clasificado por capítulo';
        this._subHeaderName = 'Capítulo';
        this._codField = 'CodCap';
        this._desField = 'DesCap';
        this._width = 250;
        break;
      case 'Org':
        this._headerName = 'Clasificado por orgánico';
        this._subHeaderName = 'Orgánico';
        this._codField = 'CodOrg';
        this._desField = 'DesOrg';
        this._width = 250;
        break;
      case 'Pro':
        this._headerName = 'Clasificado por programa';
        this._subHeaderName = 'Programa';
        this._codField = 'CodPro';
        this._desField = 'DesPro';
        this._width = 550;
        break;
      case 'Eco':
        this._headerName = 'Clasificado por económico';
        this._subHeaderName = 'Económico';
        this._codField = 'CodEco';
        this._desField = 'DesEco';
        this._width = 300;
        break;
    }

    this.columnDefs = [
      {
        headerName: this._headerName,
        children: [
          {
            headerName: this._subHeaderName,
            field: this._codField,
            cellClass: 'resaltado',
            width: this._width,
            pinned: 'left',
            rowGroup: true,
            showRowGroup: this._codField,
            columnGroupShow: 'open',
            cellRenderer: CellRendererOCMtext,
            valueGetter: params => {
              if (params.data) {
                return params.data[this._codField] + ' - ' + params.data[this._desField];
              } else {
                return null;
              }
            }
          },
        ]
      },
      {
        headerName: '2017',
        children: this.createColumnsChildren('2017'),
      },
      {
        headerName: '2018',
        children: this.createColumnsChildren('2018'),
      },
      {
        headerName: '2019',
        children: this.createColumnsChildren('2019'),
      },
      {
        headerName: '2020',
        children: this.createColumnsChildren('2020'),
      }
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
    this.rowData = await this.avalaibleYearsService.getDataAllYear(this.tipoClasificacion);
  }

  headerHeightSetter() {
    var padding = 20;
    var height = headerHeightGetter() + padding;
    this.gridApi.setHeaderHeight(height);
    this.gridApi.resetRowHeights();
  }

  createColumnsChildren(year: string) {
    return [
      {
        headerName: 'Previsiones Iniciales',
        field: `Iniciales${year}`,
      },
      {
        headerName: 'Total Modificaciones',
        field: `Modificaciones${year}`,
        width: 140
      },
      {
        headerName: 'Creditos definitivos',
        field: `Definitivas${year}`,
      },
      {
        headerName: 'Gastos Comprometidos',
        field: 'GastosComprometidos2017',
        width: 140,
      },
      {
        headerName: 'Obligaciones reconocidas netas',
        field: 'ObligacionesReconocidasNetas2017',
        width: 120,
      },
      {
        headerName: 'Pagos',
        field: 'Pagos2017',
      },
      {
        headerName: 'Obligaciones pendientes de pago al 31 diciembre',
        field: 'ObligacionesPendientePago2017',
        width: 120,
      },
      {
        headerName: 'Remanente Credito',
        field: 'RemanenteCredito2017',
        // hide: true,
      },
    ];
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