import { Component, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { GridOptions } from 'ag-grid-community/main';

import { AvalaibleYearsService } from '../../services/avalaibleYears.service';
import localeTextESPes from '../../../assets/data/localeTextESPes.json';
import { CellRendererOCM, CellRendererOCMtext } from '../../shared/utils/utils';

@Component({
  selector: 'app-compara-ing',
  templateUrl: './compara-ing.component.html',
  styleUrls: ['./compara-ing.component.scss']
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
        headerName: 'Clasificado por capítulo',
        children: [
          {
            headerName: 'Capítulo',
            field: 'CodCap',
            cellClass: 'resaltado',
            width: 250,
            pinned: 'left',
            rowGroup: true,
            showRowGroup: 'CodCap',
            columnGroupShow: 'open',
            cellRenderer: CellRendererOCMtext,
            valueGetter: params => {
              if (params.data) {
                return params.data.CodCap + ' - ' + params.data.DesCap;
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
    await this.avalaibleYearsService.getData('2020', this.result2020, "CosCap", "DesCap", "DerechosReconocidosNetos2020", false)
    await this.avalaibleYearsService.getData('2019', this.result2019, "CosCap", "DesCap", "DerechosReconocidosNetos2019", false)
    await this.avalaibleYearsService.getData('2018', this.result2018, "CosCap", "DesCap", "DerechosReconocidosNetos2018", false)
    await this.avalaibleYearsService.getData('2017', this.result2017, "CosCap", "DesCap", "DerechosReconocidosNetos2017", false)
    this.rowData = [...this.result2017, ...this.result2018, ...this.result2019, ...this.result2020];
  }

}
