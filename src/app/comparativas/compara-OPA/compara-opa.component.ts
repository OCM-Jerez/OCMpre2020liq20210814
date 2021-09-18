import { Component, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { GridOptions } from 'ag-grid-community/main';

import { AvalaibleYearsService } from '../../services/avalaibleYears.service';
import localeTextESPes from '../../../assets/data/localeTextESPes.json';
import { CellRendererOCM } from '../../shared/utils/utils';

@Component({
  selector: 'app-compara-opa',
  templateUrl: './compara-opa.component.html',
  styleUrls: ['./compara-opa.component.scss']
})
export class ComparaOPAComponent {

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
        headerName: 'OPA',
        children: [
          {
            headerName: '2017',
            field: 'OPA2017',
            width: this.OPAWidth,
            resizable: true,
            columnGroupShow: 'open',
            aggFunc: 'sum',
            cellRenderer: CellRendererOCM
          },
          {
            headerName: '2018',
            field: 'OPA2018',
            width: this.OPAWidth,
            resizable: true,
            columnGroupShow: 'open',
            aggFunc: 'sum',
            cellRenderer: CellRendererOCM
          },
          {
            headerName: '2019',
            field: 'OPA2019',
            width: this.OPAWidth,
            resizable: true,
            columnGroupShow: 'open',
            aggFunc: 'sum',
            cellRenderer: CellRendererOCM
          },
          {
            headerName: '2020',
            field: 'OPA2020',
            width: this.OPAWidth,
            resizable: true,
            columnGroupShow: 'open',
            aggFunc: 'sum',
            cellRenderer: CellRendererOCM
          },
          {
            headerName: '2020-2019',
            field: 'OPAdif',
            width: this.OPAWidth + 28,
            resizable: true,
            rowGroup: true,
            columnGroupShow: 'open',
            aggFunc: 'sum',
            cellRenderer: CellRendererOCM,
            valueGetter: params => {
              // if (params.data) {
              let opa2019 = 0;
              let opa2020 = 0;

              if (params.data.OPA2019) {
                opa2019 += params.data.OPA2019;
              }

              if (params.data.OPA2020) {
                opa2020 += params.data.OPA2020;
              }

              // console.log('opa2020', opa2020, 'opa2019', opa2019);
              // if ((opa2020 - opa2019) > 0) {
              return (opa2020 - opa2019);

              // } else {
              //   return null;
              // }
            }

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

    // console.log(this.rowData[0]);
    // this.rowData.forEach(prop => this.rowData.push({
    //   "OPAdif": prop[1]['OPA2020'] - prop[1]['OPA2019']
    // }));
  }

}
