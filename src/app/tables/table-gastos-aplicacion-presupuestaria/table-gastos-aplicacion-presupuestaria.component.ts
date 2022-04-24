import { Component, ViewChild } from '@angular/core';
import { Location, CommonModule } from '@angular/common';

import { AgGridAngular } from 'ag-grid-angular';
import { GridOptions } from 'ag-grid-community/main';

import { AvalaibleYearsService } from '../../services/avalaibleYears.service';
import { CellRendererOCM, CellRendererOCMtext } from '../../ag-grid/CellRendererOCM';
import { headerHeightGetter } from '../../ag-grid/headerHeightGetter';
import localeTextESPes from '../../../assets/data/localeTextESPes.json';

import { DataTableGraphService } from '../../services/data-graph.service';
import { IDataTableGraph } from '../../commons/interfaces/dataGraph.interface';

import { PrepareDataProgramaDetailsService } from '../../services/prepareDataProgramaDetails.service';
import { accumulate } from '../../commons/util/util';

@Component({
  selector: 'app-table-gastos-aplicacion-presupuestaria',
  templateUrl: './table-gastos-aplicacion-presupuestaria.component.html',
  styleUrls: ['./table-gastos-aplicacion-presupuestaria.component.scss']
})
export class TableGastosAplicacionPresupuestariaComponent {

  @ViewChild('agGrid', { static: false }) agGrid: AgGridAngular;
  public gridColumnApi;
  public columnDefs;
  public defaultColDef;
  public gridOptions: GridOptions;
  public localeText;
  public rowData: any;
  public groupHeaderHeight = 25;
  public headerHeight = 54;
  public CreditosWidth?: number = 110;
  public tipoClasificacion: string;
  public rowSelection = 'single';

  private _gridApi;
  private _desProWidth = 500;
  private _desCapWidth = 300;
  private _dataTableGraph: IDataTableGraph;

  data: any[] = [];

  constructor(
    public avalaibleYearsService: AvalaibleYearsService,
    private _dataTableGraphService: DataTableGraphService,
    private _prepareDataProgramaDetailsService: PrepareDataProgramaDetailsService,
    private _location: Location,

  ) {
    // this._dataTableGraph = _dataTableGraphService.dataTableGraph;

    this.columnDefs = [
      {
        // headerName: this._dataTableGraph.dataPropertyTable.headerName,
        headerName: 'Clasificado por aplicación presupuestaria',
        children: [
          {
            headerName: 'Aplicación presupuestaria',
            field: 'DesOrg',
            // rowGroup: true,
            // showRowGroup: 'DesOrg',
            filter: false,
            width: 700,
            pinned: 'left',
            columnGroupShow: 'close',
            cellRenderer: 'agGroupCellRenderer',
            valueGetter: params => {
              if (params.data) {
                return params.data.CodOrg + '-' + params.data.CodPro + '-' + params.data.CodEco
                  + '  ' + params.data.DesOrg + ' - ' + params.data.DesPro + ' - ' + params.data.DesEco;
              } else {
                return null;
              }
            },
          },
        ]
      },

      ...this.avalaibleYearsService.getYearsSelected().map(year => {
        return {
          headerName: year,
          children: this.createColumnsChildren(year),
        }
      })

    ];

    this.defaultColDef = {
      width: this.CreditosWidth,
      sortable: true,
      resizable: true,
      filter: false,
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
    this._gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.rowData = await this._prepareDataProgramaDetailsService.getDataAllYear();
    let selectedRow = this._dataTableGraphService.selectedCodeRow
    this.rowData = this.rowData
      .filter(x => x.CodOrg == selectedRow.split("-")[0])
      .filter(x => x.CodPro == selectedRow.split("-")[1])
      .filter(x => x.CodEco == selectedRow.split("-")[2]);
    console.log(this.rowData);

    const value = {
      ...this.rowData[0],
      ...this.rowData[1],
      ...this.rowData[2],
      ...this.rowData[3],
      ...this.rowData[4],
      ...this.rowData[5],
      ...this.rowData[6],
      ...this.rowData[7]
    }
    console.log(value);
    this.data.push(value)

    // const value = {
    //   "DesOrg": this.rowData[0].CodOrg + "-" + this.rowData[0].CodPro + "-" + this.rowData[0].CodEco
    //     + '  ' + this.rowData[0].DesOrg + ' - ' + this.rowData[0].DesPro + ' - ' + this.rowData[0].DesEco,
    //   "Definitivas2015": this.rowData[0].Definitivas2015,
    //   "Definitivas2016": this.rowData[1].Definitivas2016,
    //   "Definitivas2017": this.rowData[2].Definitivas2017,
    //   "Definitivas2018": this.rowData[3].Definitivas2018,
    //   "Definitivas2019": this.rowData[4].Definitivas2019,
    //   "Definitivas2020": this.rowData[5].Definitivas2020,
    //   "Definitivas2021": this.rowData[6].Definitivas2021,
    //   "Definitivas2022": this.rowData[7].Definitivas2022,
    //   "Iniciales2015": this.rowData[0].Iniciales2015,
    //   "Iniciales2016": this.rowData[1].Iniciales2016,
    //   "Iniciales2017": this.rowData[2].Iniciales2017,
    //   "Iniciales2018": this.rowData[3].Iniciales2018,
    //   "Iniciales2019": this.rowData[4].Iniciales2019,
    //   "Iniciales2020": this.rowData[5].Iniciales2020,
    //   "Iniciales2021": this.rowData[6].Iniciales2021,
    //   "Iniciales2022": this.rowData[7].Iniciales2022,
    // }

    // this.data.push(value)
    console.log(this.data);
    this.rowData = this.data;
  }

  // TODO: Las colummnas disparan su altura
  headerHeightSetter() {
    // var padding = 20;
    // var height = headerHeightGetter() + padding;
    // this._gridApi.setHeaderHeight(height);
    // this._gridApi.resetRowHeights();
  }

  createColumnsChildren(year: number) {
    return [
      {
        headerName: 'Créditos',
        children: [
          {
            headerName: 'Previsiones Iniciales',
            field: `Iniciales${year}`,
            columnGroupShow: 'close'
          },
          {
            headerName: 'Total Modificaciones',
            field: `Modificaciones${year}`,
            width: 140,
            columnGroupShow: 'close'
          },
          {
            headerName: 'Creditos definitivos',
            field: `Definitivas${year}`,
            width: 140,
            columnGroupShow: 'close'
          },
        ]
      },
      {
        headerName: 'Gastos',
        children: [
          {
            headerName: 'Gastos Comprometidos',
            field: `GastosComprometidos${year}`,
            width: 140,
            columnGroupShow: 'close',
          },
          {
            headerName: 'Obligaciones reconocidas netas',
            field: `ObligacionesReconocidasNetas${year}`,
            width: 135,
            columnGroupShow: 'close'
          },
          {
            headerName: 'Pagos',
            field: `Pagos${year}`,
            columnGroupShow: 'close'
          },
          {
            headerName: 'Obligaciones pendientes de pago al 31 diciembre',
            field: `ObligacionesPendientePago${year}`,
            width: 120,
            columnGroupShow: 'close'
          },
        ]
      },
      {
        headerName: 'Remanente Credito',
        field: `RemanenteCredito${year}`,
      },
    ];
  }

  volver() {
    this._location.back();
  }

}
