import { Component, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { GridOptions } from 'ag-grid-community/main';

import { AvalaibleYearsService } from '../../services/avalaibleYears.service';
import localeTextESPes from '../../../assets/data/localeTextESPes.json';
import { CellRendererOCM, CellRendererOCMtext } from '../../layouts/utils/utils';
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
  public CreditosWidth?: number = 100;
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
            headerName: 'Pagos',
            field: 'ObligacionesReconocidasNetas2017',
          },
          {
            headerName: 'OPA',
            field: 'OPA2017',
          },
        ]
      },
      {
        headerName: '2018',
        children: [
          {
            headerName: 'Pagos',
            field: 'ObligacionesReconocidasNetas2018',
          },
          {
            headerName: 'OPA',
            field: 'OPA2018',
          },
        ]
      },
      {
        headerName: '2019',
        children: [
          {
            headerName: 'Pagos',
            field: 'ObligacionesReconocidasNetas2019',
          },
          {
            headerName: 'OPA',
            field: 'OPA2019',
          },
        ]
      },
      {
        headerName: '2020',
        children: [
          {
            headerName: 'Pagos',
            field: 'ObligacionesReconocidasNetas2020',
          },
          {
            headerName: 'OPA',
            field: 'OPA2020',
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

    this.result2020 = await this.avalaibleYearsService.getDataGas('2020', this.tipoClasificacion)
    this.result2019 = await this.avalaibleYearsService.getDataGas('2019', this.tipoClasificacion)
    this.result2018 = await this.avalaibleYearsService.getDataGas('2018', this.tipoClasificacion)
    this.result2017 = await this.avalaibleYearsService.getDataGas('2017', this.tipoClasificacion)

    this.rowData = [...this.result2017, ...this.result2018, ...this.result2019, ...this.result2020];
  }

}
