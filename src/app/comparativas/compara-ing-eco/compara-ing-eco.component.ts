import { Component, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { GridOptions } from 'ag-grid-community/main';

import { AvalaibleYearsService } from '../../services/avalaibleYears.service';
import localeTextESPes from '../../../assets/data/localeTextESPes.json';
import { CellRendererOCM, CellRendererOCMtext } from '../../shared/utils/utils';

@Component({
  selector: 'app-compara-ing-eco',
  templateUrl: './compara-ing-eco.component.html',
  styleUrls: ['./compara-ing-eco.component.scss']
})
export class ComparaIngEcoComponent {
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
        headerName: 'Clasificado por económico',
        children: [
          {
            headerName: 'Económico',
            field: 'CodEco',
            cellClass: 'resaltado',
            // filter: false,
            width: 520,
            pinned: 'left',
            rowGroup: true,
            showRowGroup: 'CodEco',
            columnGroupShow: 'open',
            cellRenderer: CellRendererOCMtext,
            valueGetter: params => {
              if (params.data) {
                return params.data.CodEco + ' - ' + params.data.DesEco;
              } else {
                return null;
              }
            }
          },
        ]
      },

      {
        headerName: '2017',
        field: 'DerechosReconocidosNetos2017',
      },
      {
        headerName: '2018',
        field: 'DerechosReconocidosNetos2018',
      },
      {
        headerName: '2019',
        field: 'DerechosReconocidosNetos2019',
      },
      {
        headerName: '2020',
        field: 'DerechosReconocidosNetos2020',
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

    await this.avalaibleYearsService.getYearDataJson('2020', false)
      .then(data => {
        Object.entries(data).reduce((accumulator, currentValue) => {
          this.result2020.push({
            "CodEco": currentValue[1]['CodEco'],
            "DesEco": currentValue[1]['DesEco'],
            "DerechosReconocidosNetos2020": currentValue[1]['DerechosReconocidosNetos'],
          });
          return accumulator;
        }, []);
      })
    console.log(this.result2020);

    await this.avalaibleYearsService.getYearDataJson('2019', false)
      .then(data => {
        Object.entries(data).forEach(prop => this.result2019.push({
          "CodEco": prop[1]['CodEco'],
          "DesEco": prop[1]['DesEco'],
          "DerechosReconocidosNetos2019": prop[1]['DerechosReconocidosNetos'],
        }));
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        console.log('finally');
      });

    await this.avalaibleYearsService.getYearDataJson('2018', false)
      .then(data => {
        Object.entries(data).forEach(prop => this.result2018.push({
          "CodEco": prop[1]['CodEco'],
          "DesEco": prop[1]['DesEco'],
          "DerechosReconocidosNetos2018": prop[1]['DerechosReconocidosNetos'],
        }));
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        console.log('finally');
      });

    await this.avalaibleYearsService.getYearDataJson('2017', false)
      .then(data => {
        Object.entries(data).forEach(prop => this.result2017.push({
          "CodEco": prop[1]['CodEco'],
          "DesEco": prop[1]['DesEco'],
          "DerechosReconocidosNetos2017": prop[1]['DerechosReconocidosNetos'],
        }));
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
