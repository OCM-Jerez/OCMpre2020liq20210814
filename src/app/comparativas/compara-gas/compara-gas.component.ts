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
        this._width = 550;
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
        children: [
          {
            headerName: 'Iniciales',
            field: 'Iniciales2017',
            hide: true,
          },
          {
            headerName: 'Modificaciones',
            field: 'Modificaciones2017',
            hide: true,
          },
          {
            headerName: 'Definitivas',
            field: 'Definitivas2017',
          },
          {
            headerName: 'GastosComprometidos',
            field: 'GastosComprometidos2017',
            hide: true,
          },
          {
            headerName: 'O.Netas',
            field: 'ObligacionesReconocidasNetas2017',
          },
          {
            headerName: 'Pagos',
            field: 'Pagos2017',
            hide: true,
          },
          {
            headerName: 'OPA',
            field: 'ObligacionesPendientePago2017',
          },
          {
            headerName: 'RemanenteCredito',
            field: 'RemanenteCredito2017',
            hide: true,
          },
        ]
      },
      {
        headerName: '2018',
        children: [
          {
            headerName: 'Iniciales',
            field: 'Iniciales2018',
            hide: true,
          },
          {
            headerName: 'Modificaciones',
            field: 'Modificaciones2018',
            hide: true,
          },
          {
            headerName: 'Definitivas',
            field: 'Definitivas2018',
          },
          {
            headerName: 'GastosComprometidos',
            field: 'GastosComprometidos2018',
            hide: true,
          },
          {
            headerName: 'O.Netas',
            field: 'ObligacionesReconocidasNetas2018',
          },
          {
            headerName: 'Pagos',
            field: 'Pagos2018',
            hide: true,
          },
          {
            headerName: 'OPA',
            field: 'ObligacionesPendientePago2018',
          },
          {
            headerName: 'RemanenteCredito',
            field: 'RemanenteCredito2018',
            hide: true,
          },
        ]
      },
      {
        headerName: '2019',
        children: [
          {
            headerName: 'Iniciales',
            field: 'Iniciales2019',
            hide: true,
          },
          {
            headerName: 'Modificaciones',
            field: 'Modificaciones2019',
            hide: true,
          },
          {
            headerName: 'Definitivas',
            field: 'Definitivas2019',
          },
          {
            headerName: 'GastosComprometidos',
            field: 'GastosComprometidos2019',
            hide: true,
          },
          {
            headerName: 'O.Netas',
            field: 'ObligacionesReconocidasNetas2019',
          },
          {
            headerName: 'Pagos',
            field: 'Pagos2019',
            hide: true,
          },
          {
            headerName: 'OPA',
            field: 'ObligacionesPendientePago2019',
          },
          {
            headerName: 'RemanenteCredito',
            field: 'RemanenteCredito2019',
            hide: true,
          },
        ]
      },
      {
        headerName: '2020',
        children: [
          {
            headerName: 'Iniciales',
            field: 'Iniciales2020',
            hide: true,
          },
          {
            headerName: 'Modificaciones',
            field: 'Modificaciones2020',
            hide: true,
          },
          {
            headerName: 'Definitivas',
            field: 'Definitivas2020',
          },
          {
            headerName: 'GastosComprometidos',
            field: 'GastosComprometidos2020',
            hide: true,
          },
          {
            headerName: 'O.Netas',
            field: 'ObligacionesReconocidasNetas2020',
          },
          {
            headerName: 'Pagos',
            field: 'Pagos2020',
            hide: true,
          },
          {
            headerName: 'OPA',
            field: 'ObligacionesPendientePago2020',
          },
          {
            headerName: 'RemanenteCredito',
            field: 'RemanenteCredito2020',
            hide: true,
          },
        ]
      },

    ];

    this.defaultColDef = {
      width: this.CreditosWidth,
      sortable: true,
      resizable: true,
      filter: true,
      aggFunc: 'sum',
      cellRenderer: CellRendererOCM
    };
    this.gridOptions = {} as GridOptions;
    this.localeText = localeTextESPes;
  }

  async onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.rowData = await this.avalaibleYearsService.getDataAllYear(this.tipoClasificacion);
  }

}
