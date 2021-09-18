import { Component, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { GridOptions } from 'ag-grid-community/main';

import { AvalaibleYearsService } from '../../services/avalaibleYears.service';
import localeTextESPes from '../../../assets/data/localeTextESPes.json';
import { CellRendererOCM } from '../../shared/utils/utils';

@Component({
  selector: 'app-compara-org',
  templateUrl: './compara-org.component.html',
  styleUrls: ['./compara-org.component.scss']
})
export class ComparaOrgComponent {
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
        headerName: 'Orgánico',
        field: 'DesOrg',
        cellClass: 'resaltado',
        // filter: false,
        width: 550,
        pinned: 'left',
        rowGroup: true,
        showRowGroup: 'DesOrg',
        columnGroupShow: 'open',
        valueGetter: params => {
          if (params.data) {
            return params.data.CodOrg + ' - ' + params.data.DesOrg;
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
        Object.entries(data).reduce((accumulator, currentValue) => {
          this.result2020.push({
            "CodOrg": currentValue[1]['CodOrg'],
            "DesOrg": currentValue[1]['DesOrg'],
            "ObligacionesReconocidasNetas2020": currentValue[1]['ObligacionesReconocidasNetas'],
            "OPA2020": currentValue[1]['ObligacionesPendientePago']
          });
          return accumulator;
        }, []);
      })
    console.log(this.result2020);

    await this.avalaibleYearsService.getYearDataJson('2019', true)
      .then(data => {
        Object.entries(data).forEach(prop => this.result2019.push({
          "CodOrg": prop[1]['CodOrg'],
          "DesOrg": prop[1]['DesOrg'],
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
          "CodOrg": prop[1]['CodOrg'],
          "DesOrg": prop[1]['DesOrg'],
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
          "CodOrg": prop[1]['CodOrg'],
          "DesOrg": prop[1]['DesOrg'],
          "ObligacionesReconocidasNetas2017": prop[1]['ObligacionesReconocidasNetas'],
          "OPA2017": prop[1]['ObligacionesPendientePago']
        }));
        // this.rowData = this.result2017.concat(this.result2018).concat(this.result2019).concat(this.result2020);
        // this.rowData = this.result2017.concat(this.result2018, this.result2019, this.result2020);
        this.rowData = [...this.result2017, ...this.result2018, ...this.result2019, ...this.result2020];
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        console.log('finally');
      });
  }
}
