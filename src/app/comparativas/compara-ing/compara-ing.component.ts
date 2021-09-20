import { Component, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { GridOptions } from 'ag-grid-community/main';

import { AvalaibleYearsService } from '../../services/avalaibleYears.service';
import localeTextESPes from '../../../assets/data/localeTextESPes.json';
import { CellRendererOCM, CellRendererOCMtext } from '../../shared/utils/utils';
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

    if (this.tipoClasificacion === 'capítulo') {
      this._headerName = 'Clasificado por capítulo';
      this._codField = 'CodCap';
      this._desField = 'DesCap';
      this._width = 250;
    } else {
      this._headerName = 'Clasificado por económico';
      this._codField = 'CodEco';
      this._desField = 'DesEco';
      this._width = 520;
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
    this.tipoClasificacion = this.tipoclasificacionService.getTipoClasificacion();
    if (this.tipoClasificacion === 'capítulo') {
      await this.avalaibleYearsService.getData('2020', this.result2020, "CodCap", "DesCap", "DerechosReconocidosNetos2020", false)
      await this.avalaibleYearsService.getData('2019', this.result2019, "CodCap", "DesCap", "DerechosReconocidosNetos2019", false)
      await this.avalaibleYearsService.getData('2018', this.result2018, "CodCap", "DesCap", "DerechosReconocidosNetos2018", false)
      await this.avalaibleYearsService.getData('2017', this.result2017, "CodCap", "DesCap", "DerechosReconocidosNetos2017", false)
    } else {
      await this.avalaibleYearsService.getData('2020', this.result2020, "CodEco", "DesEco", "DerechosReconocidosNetos2020", false)
      await this.avalaibleYearsService.getData('2019', this.result2019, "CodEco", "DesEco", "DerechosReconocidosNetos2019", false)
      await this.avalaibleYearsService.getData('2018', this.result2018, "CodEco", "DesEco", "DerechosReconocidosNetos2018", false)
      await this.avalaibleYearsService.getData('2017', this.result2017, "CodEco", "DesEco", "DerechosReconocidosNetos2017", false)
    }
    this.rowData = [...this.result2017, ...this.result2018, ...this.result2019, ...this.result2020];
  }

}
