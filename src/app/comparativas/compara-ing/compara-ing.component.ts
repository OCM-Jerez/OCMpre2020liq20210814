import { Component, ViewChild } from '@angular/core';

import { AgGridAngular } from 'ag-grid-angular';
import { GridOptions } from 'ag-grid-community/main';

import { AvalaibleYearsService } from '../../services/avalaibleYears.service';
import localeTextESPes from '../../../assets/data/localeTextESPes.json';
import { CellRendererOCM, CellRendererOCMtext } from '../../ag-grid/CellRendererOCM';
import { TipoClasificacionService } from 'src/app/services/tipoClasificacion.service';

import { AVALAIBLE_YEARS } from '../../../assets/data/avalaible-years-data'
import { Observable } from 'rxjs';

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
  public tipoClasificacion: string;
  private _headerName: string;
  private _subHeaderName: string;
  private _codField: string;
  private _desField: string;
  private _width: number;
  public year: Observable<string>;

  constructor(private avalaibleYearsService: AvalaibleYearsService,
    private tipoclasificacionService: TipoClasificacionService) {
    this.tipoClasificacion = tipoclasificacionService.getTipoClasificacion();

    this.year = avalaibleYearsService.getAvalaibleYear();

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

      ...avalaibleYearsService.getYearsSelected().map(year => {
        return {
          headerName: year,
          children: this.createColumnsChildren(year),
        }
      })

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
    this.rowData = await this.avalaibleYearsService.getDataAllYearIng(this.tipoClasificacion, true);
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
            columnGroupShow: 'open'
          },
          {
            headerName: 'Previsiones definitivas',
            field: `Definitivas${year}`,
            columnGroupShow: 'close'
          },
        ]
      },

      {
        headerName: 'Derechos',
        children: [
          {
            headerName: 'Derechos Reconocidos',
            field: `DerechosReconocidos${year}`,
            columnGroupShow: 'open'
          },
          {
            headerName: 'Derechos anulados',
            field: `DerechosAnulados${year}`,
            columnGroupShow: 'open'
          },
          {
            headerName: 'Derechos cancelados',
            field: `DerechosCancelados${year}`,
            columnGroupShow: 'open'
          },
          {
            headerName: 'Derechos Reconocidos Netos',
            field: `DerechosReconocidosNetos${year}`,
            columnGroupShow: 'open'
          },
          {
            headerName: 'Recaudación neta',
            field: `RecaudacionNeta${year}`,
            columnGroupShow: 'close'
          },
          {
            headerName: 'Derechos Pendientes de cobro al 31 diciembre',
            field: `DerechosPendienteCobro${year}`,
            columnGroupShow: 'open'
          },
        ]
      },
      {
        headerName: 'Exceso/defecto previsión',
        field: `DiferenciaPrevision${year}`,
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