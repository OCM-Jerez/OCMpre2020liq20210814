import { Component, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { GridOptions } from 'ag-grid-community/main';

import { AvalaibleYearsService } from '../../services/avalaibleYears.service';
import localeTextESPes from '../../../assets/data/localeTextESPes.json';
import { CellRendererOCM, CellRendererOCMtext } from '../../shared/utils/utils';
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
  public OPAWidth?: number = 90;
  public tipoClasificacion: string;
  result2017 = [];
  result2018 = [];
  result2019 = [];
  result2020 = [];
  private _headerName: string;
  private _codField: string;
  private _desField: string;
  private _width: number;

  constructor(private avalaibleYearsService: AvalaibleYearsService,
    private tipoclasificacionService: TipoClasificacionService) {
    this.tipoClasificacion = tipoclasificacionService.getTipoClasificacion();
    switch (this.tipoClasificacion) {
      case 'org':
        this._headerName = 'Clasificado por orgánico';
        this._codField = 'CodOrg';
        this._desField = 'DesOrg';
        this._width = 250;
        break;
      case 'pro':
        this._headerName = 'Clasificado por programa';
        this._codField = 'CodPro';
        this._desField = 'DesPro';
        this._width = 550;
        break;
      case 'eco':
        this._headerName = 'Clasificado por económico';
        this._codField = 'CodEco';
        this._desField = 'DesEco';
        this._width = 550;
        break;
      // case 'OPA':
      //   this._headerName = 'Clasificado por OPA';
      //   this._codField = 'CodEco';
      //   this._desField = 'DesEco';
      //   this._width = 550;
      //   break;
    }

    this.columnDefs = [
      {
        headerName: this._headerName,
        children: [
          {
            headerName: this._headerName,
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
            width: this.CreditosWidth,
            resizable: true,
            columnGroupShow: 'open',
            aggFunc: 'sum',
            cellRenderer: CellRendererOCM
          },
          {
            headerName: 'OPA',
            field: 'OPA2017',
            width: this.OPAWidth,
            resizable: true,
            columnGroupShow: 'open',
            aggFunc: 'sum',
            cellRenderer: CellRendererOCM
          },
        ]
      },
      {
        headerName: '2018',
        children: [
          {
            headerName: 'Pagos',
            field: 'ObligacionesReconocidasNetas2018',
            width: this.CreditosWidth,
            resizable: true,
            columnGroupShow: 'open',
            aggFunc: 'sum',
            cellRenderer: CellRendererOCM
          },
          {
            headerName: 'OPA',
            field: 'OPA2018',
            width: this.OPAWidth,
            resizable: true,
            columnGroupShow: 'open',
            aggFunc: 'sum',
            cellRenderer: CellRendererOCM
          },
        ]
      },
      {
        headerName: '2019',
        children: [
          {
            headerName: 'Pagos',
            field: 'ObligacionesReconocidasNetas2019',
            width: this.CreditosWidth,
            resizable: true,
            columnGroupShow: 'open',
            aggFunc: 'sum',
            cellRenderer: CellRendererOCM
          },
          {
            headerName: 'OPA',
            field: 'OPA2019',
            width: this.OPAWidth,
            resizable: true,
            columnGroupShow: 'open',
            aggFunc: 'sum',
            cellRenderer: CellRendererOCM
          },
        ]
      },
      {
        headerName: '2020',
        children: [
          {
            headerName: 'Pagos',
            field: 'ObligacionesReconocidasNetas2020',
            width: this.CreditosWidth,
            resizable: true,
            columnGroupShow: 'open',
            aggFunc: 'sum',
            cellRenderer: CellRendererOCM
          },
          {
            headerName: 'OPA',
            field: 'OPA2020',
            width: this.OPAWidth,
            resizable: true,
            columnGroupShow: 'open',
            aggFunc: 'sum',
            cellRenderer: CellRendererOCM
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
    this.tipoClasificacion = this.tipoclasificacionService.getTipoClasificacion();

    switch (this.tipoClasificacion) {
      case 'org':
        await this.avalaibleYearsService.getDataGas('2020', this.result2020, "CodOrg", "DesOrg", "ObligacionesReconocidasNetas2020", "OPA2020", true)
        await this.avalaibleYearsService.getDataGas('2019', this.result2019, "CodOrg", "DesOrg", "ObligacionesReconocidasNetas2019", "OPA2019", true)
        await this.avalaibleYearsService.getDataGas('2018', this.result2018, "CodOrg", "DesOrg", "ObligacionesReconocidasNetas2018", "OPA2018", true)
        await this.avalaibleYearsService.getDataGas('2017', this.result2017, "CodOrg", "DesOrg", "ObligacionesReconocidasNetas2017", "OPA2017", true)
        break;
      case 'pro':
        await this.avalaibleYearsService.getDataGas('2020', this.result2020, "CodPro", "DesPro", "ObligacionesReconocidasNetas2020", "OPA2020", true)
        await this.avalaibleYearsService.getDataGas('2019', this.result2019, "CodPro", "DesPro", "ObligacionesReconocidasNetas2019", "OPA2019", true)
        await this.avalaibleYearsService.getDataGas('2018', this.result2018, "CodPro", "DesPro", "ObligacionesReconocidasNetas2018", "OPA2018", true)
        await this.avalaibleYearsService.getDataGas('2017', this.result2017, "CodPro", "DesPro", "ObligacionesReconocidasNetas2017", "OPA2017", true)
        break;
      case 'eco':
        await this.avalaibleYearsService.getDataGas('2020', this.result2020, "CodEco", "DesEco", "ObligacionesReconocidasNetas2020", "OPA2020", true)
        await this.avalaibleYearsService.getDataGas('2019', this.result2019, "CodEco", "DesEco", "ObligacionesReconocidasNetas2019", "OPA2019", true)
        await this.avalaibleYearsService.getDataGas('2018', this.result2018, "CodEco", "DesEco", "ObligacionesReconocidasNetas2018", "OPA2018", true)
        await this.avalaibleYearsService.getDataGas('2017', this.result2017, "CodEco", "DesEco", "ObligacionesReconocidasNetas2017", "OPA2017", true)
        break;
      // case 'OPA':
      //   await this.avalaibleYearsService.getDataGas('2020', this.result2020, "CodEco", "DesEco", "ObligacionesReconocidasNetas2020", "OPA2020", true)
      //   await this.avalaibleYearsService.getDataGas('2019', this.result2019, "CodEco", "DesEco", "ObligacionesReconocidasNetas2019", "OPA2019", true)
      //   await this.avalaibleYearsService.getDataGas('2018', this.result2018, "CodEco", "DesEco", "ObligacionesReconocidasNetas2018", "OPA2018", true)
      //   await this.avalaibleYearsService.getDataGas('2017', this.result2017, "CodEco", "DesEco", "ObligacionesReconocidasNetas2017", "OPA2017", true)
      //   break;
    }
    this.rowData = [...this.result2017, ...this.result2018, ...this.result2019, ...this.result2020];
  }

}
