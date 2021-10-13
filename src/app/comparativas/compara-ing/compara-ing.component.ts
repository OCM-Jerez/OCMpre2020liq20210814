import { Component, ViewChild } from '@angular/core';

import { AgGridAngular } from 'ag-grid-angular';
import { GridOptions } from 'ag-grid-community/main';

import { AvalaibleYearsService } from '../../services/avalaibleYears.service';
import localeTextESPes from '../../../assets/data/localeTextESPes.json';
import { CellRendererOCM, CellRendererOCMtext } from '../../ag-grid/CellRendererOCM';
import { TipoClasificacionService } from 'src/app/services/tipoClasificacion.service';

@Component({
  selector: 'app-compara-ing',
  templateUrl: './compara-ing.component.html',
})
export class ComparaIngComponent {
  @ViewChild('agGrid', { static: false }) agGrid: AgGridAngular;
  private gridApi;
  public gridColumnApi;
  public columnDefs;
  public defaultColDef;
  public gridOptions: GridOptions;
  public localeText;
  public rowData: any;
  public groupHeaderHeight = 25;
  public headerHeight = 36;
  public CreditosWidth?: number = 130;
  public OPAWidth?: number = 90;
  public tipoClasificacion: string;
  result2017 = [];
  result2018 = [];
  result2019 = [];
  result2020 = [];
  private _headerName: string;
  private _subHeaderName: string;
  private _codField: string;
  private _desField: string;
  private _width: number;

  constructor(private avalaibleYearsService: AvalaibleYearsService,
    private tipoclasificacionService: TipoClasificacionService) {
    this.tipoClasificacion = tipoclasificacionService.getTipoClasificacion();

    if (this.tipoClasificacion === 'Cap') {
      this._headerName = 'Clasificado por capítulo';
      this._subHeaderName = 'Capítulo';
      this._codField = 'CodCap';
      this._desField = 'DesCap';
      this._width = 250;
    } else {
      this._headerName = 'Clasificado por económico';
      this._subHeaderName = 'Económico';
      this._codField = 'CodEco';
      this._desField = 'DesEco';
      this._width = 520;
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
        children: [
          {
            headerName: 'Previsiones Iniciales',
            field: 'Iniciales2017',
          },
          {
            headerName: 'Total Modificaciones',
            field: 'Modificaciones2017',
          },
          {
            headerName: 'Previsiones definitivas',
            field: 'Definitivas2017',
          },
          {
            headerName: 'Derechos Reconocidos',
            field: 'DerechosReconocidos2017',
          },
          {
            headerName: 'Derechos anulados',
            field: 'DerechosAnulados2017',
          },
          {
            headerName: 'Derechos cancelados',
            field: 'DerechosCancelados2017',
          },
          {
            headerName: 'Derechos Reconocidos Netos',
            field: 'DerechosReconocidosNetos2017',
          },
          {
            headerName: 'Recaudación neta',
            field: 'RecaudacionNeta2017',
          },
          {
            headerName: 'Derechos Pendientes de cobro al 31 diciembre',
            field: 'DerechosPendienteCobro2017',
          },
          {
            headerName: 'Exceso/defecto previsión',
            field: 'DiferenciaPrevision2017',
          },
        ],
      },
      {
        headerName: '2018',
        children: [
          {
            headerName: 'Previsiones Iniciales',
            field: 'Iniciales2018',
          },
          {
            headerName: 'Total Modificaciones',
            field: 'Modificaciones2018',
          },
          {
            headerName: 'Previsiones definitivas',
            field: 'Definitivas2018',
          },
          {
            headerName: 'Derechos Reconocidos',
            field: 'DerechosReconocidos2018',
          },
          {
            headerName: 'Derechos anulados',
            field: 'DerechosAnulados2018',
          },
          {
            headerName: 'Derechos cancelados',
            field: 'DerechosCancelados2018',
          },
          {
            headerName: 'Derechos Reconocidos Netos',
            field: 'DerechosReconocidosNetos2018',
          },
          {
            headerName: 'Recaudación neta',
            field: 'RecaudacionNeta2018',
          },
          {
            headerName: 'Derechos Pendientes de cobro al 31 diciembre',
            field: 'DerechosPendienteCobro2018',
          },
          {
            headerName: 'Exceso/defecto previsión',
            field: 'DiferenciaPrevision2018',
          },
        ],
      },
      {
        headerName: '2019',
        children: [
          {
            headerName: 'Previsiones Iniciales',
            field: 'Iniciales2019',
          },
          {
            headerName: 'Total Modificaciones',
            field: 'Modificaciones2019',
          },
          {
            headerName: 'Previsiones definitivas',
            field: 'Definitivas2019',
          },
          {
            headerName: 'Derechos Reconocidos',
            field: 'DerechosReconocidos2019',
          },
          {
            headerName: 'Derechos anulados',
            field: 'DerechosAnulados2019',
          },
          {
            headerName: 'Derechos cancelados',
            field: 'DerechosCancelados2019',
          },
          {
            headerName: 'Derechos Reconocidos Netos',
            field: 'DerechosReconocidosNetos2019',
          },
          {
            headerName: 'Recaudación neta',
            field: 'RecaudacionNeta2019',
          },
          {
            headerName: 'Derechos Pendientes de cobro al 31 diciembre',
            field: 'DerechosPendienteCobro2019',
          },
          {
            headerName: 'Exceso/defecto previsión',
            field: 'DiferenciaPrevision2019',
          },
        ],
      },
      {
        headerName: '2020',
        children: [
          {
            headerName: 'Previsiones Iniciales',
            field: 'Iniciales2020',
          },
          {
            headerName: 'Total Modificaciones',
            field: 'Modificaciones2020',
          },
          {
            headerName: 'Previsiones definitivas',
            field: 'Definitivas2020',
          },
          {
            headerName: 'Derechos Reconocidos',
            field: 'DerechosReconocidos2020',
          },
          {
            headerName: 'Derechos anulados',
            field: 'DerechosAnulados2020',
          },
          {
            headerName: 'Derechos cancelados',
            field: 'DerechosCancelados2020',
          },
          {
            headerName: 'Derechos Reconocidos Netos',
            field: 'DerechosReconocidosNetos2020',
          },
          {
            headerName: 'Recaudación neta',
            field: 'RecaudacionNeta2020',
          },
          {
            headerName: 'Derechos Pendientes de cobro al 31 diciembre',
            field: 'DerechosPendienteCobro2020',
          },
          {
            headerName: 'Exceso/defecto previsión',
            field: 'DiferenciaPrevision2020',
          },
        ],
      }
    ]

    this.defaultColDef = {
      width: this.CreditosWidth,
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
    this.gridOptions = {} as GridOptions;
    this.localeText = localeTextESPes;
  }

  async onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.rowData = await this.avalaibleYearsService.getDataAllYearIng(this.tipoClasificacion);
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