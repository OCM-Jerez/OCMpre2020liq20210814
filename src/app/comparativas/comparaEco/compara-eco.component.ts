import { Component, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { GridOptions } from 'ag-grid-community/main';

import { AvalaibleYearsService } from '../../services/avalaibleYears.service';
import localeTextESPes from '../../../assets/data/localeTextESPes.json';
import { CellRendererOCM } from '../../shared/utils/utils';

@Component({
  selector: 'app-comparativas',
  templateUrl: './compara-eco.component.html',
  styleUrls: ['./compara-eco.component.scss']
})
export class ComparaEcoComponent {
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
  result2017 = [];
  result2018 = [];
  result2019 = [];
  result2020 = [];

  constructor(private avalaibleYearsService: AvalaibleYearsService) {
    this.columnDefs = [
      {
        headerName: 'Economico',
        field: 'DesEco',
        cellClass: 'resaltado',
        filter: false,
        width: 550,
        pinned: 'left',
        rowGroup: true,
        showRowGroup: 'DesEco',
        columnGroupShow: 'open',
        valueGetter: params => {
          if (params.data) {
            return params.data.CodEco + ' - ' + params.data.DesEco;
          } else {
            return null;
          }
        }
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
      sortable: true,
      resizable: true,
      filter: true
    };
    this.gridOptions = {} as GridOptions;
    this.localeText = localeTextESPes;
  }

  async onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    await this.avalaibleYearsService.getYearDataJson('2020', true)
      .then(data => {
        Object.entries(data).forEach(prop => this.result2020.push({
          "CodEco": prop[1]['CodEco'],
          "DesEco": prop[1]['DesEco'],
          "ObligacionesReconocidasNetas2020": prop[1]['ObligacionesReconocidasNetas'],
          "OPA2020": prop[1]['ObligacionesPendientePago']
        }));
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        console.log('finally');
      });

    await this.avalaibleYearsService.getYearDataJson('2019', true)
      .then(data => {
        Object.entries(data).forEach(prop => this.result2019.push({
          "CodEco": prop[1]['CodEco'],
          "DesEco": prop[1]['DesEco'],
          "ObligacionesReconocidasNetas2019": prop[1]['ObligacionesReconocidasNetas'],
          "OPA2019": prop[1]['ObligacionesPendientePago']
        }));
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        console.log('finally');
      });

    await this.avalaibleYearsService.getYearDataJson('2018', true)
      .then(data => {
        Object.entries(data).forEach(prop => this.result2018.push({
          "CodEco": prop[1]['CodEco'],
          "DesEco": prop[1]['DesEco'],
          "ObligacionesReconocidasNetas2018": prop[1]['ObligacionesReconocidasNetas'],
          "OPA2018": prop[1]['ObligacionesPendientePago']
        }));
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        console.log('finally');
      });

    await this.avalaibleYearsService.getYearDataJson('2017', true)
      .then(data => {
        Object.entries(data).forEach(prop => this.result2017.push({
          "CodEco": prop[1]['CodEco'],
          "DesEco": prop[1]['DesEco'],
          "ObligacionesReconocidasNetas2017": prop[1]['ObligacionesReconocidasNetas'],
          "OPA2017": prop[1]['ObligacionesPendientePago']
        }));
        this.rowData = this.result2017.concat(this.result2018).concat(this.result2019).concat(this.result2020);
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        console.log('finally');
      });
  }
}
