import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from "@angular/common";

import { AgGridAngular } from 'ag-grid-angular';
import localeTextESPes from '../../../assets/data/localeTextESPes.json';
import { CellRendererOCM, CellRendererOCMtext } from '../../ag-grid/CellRendererOCM';
import { headerHeightGetter } from '../../ag-grid/headerHeightGetter';

import { AvalaibleYearsService } from '../../services/avalaibleYears.service';
import { DataStoreService } from '../../services/dataStore.service';
import { PrepareDataProgramaDetailsService } from '../../services/prepareDataProgramaDetails.service';
import { AlertService } from '../../services/alert.service';

import { IDataTable } from '../../commons/interfaces/dataTable.interface';

import { accumulate, accumulateAplicacionPresupuestaria } from '../../commons/util/util';
import { ColumnState, GridReadyEvent } from 'ag-grid-community';

@Component({
  selector: 'app-table-programa-details',
  templateUrl: './table-programa-details.component.html',
  styleUrls: ['./table-programa-details.component.scss']
})
export class TableProgramaDetailsComponent {
  @ViewChild('agGrid', { static: false }) agGrid: AgGridAngular;
  public gridColumnApi;
  public columnDefs;
  public defaultColDef;
  public localeText;
  public rowData: any;
  public groupHeaderHeight = 25;
  public headerHeight = 54;
  public rowSelection = 'single';
  public isExpanded = true;
  public dataIntermedio: any;
  public dataFinal: any;
  public aplicacionesPresupuestarias: any;

  private _gridApi;
  private _dataTableGraph: IDataTable;

  constructor(
    public avalaibleYearsService: AvalaibleYearsService,
    public dataStoreService: DataStoreService,
    private _router: Router,
    private _prepareDataProgramaDetailsService: PrepareDataProgramaDetailsService,
    private _location: Location,
    private _alertService: AlertService
  ) {
    this._dataTableGraph = dataStoreService.getDataTable;
    this.columnDefs = [
      {
        headerName: this._dataTableGraph.dataPropertyTable.headerName,
        children: [
          {
            headerName: 'Programa',
            field: 'DesPro',
            rowGroup: true,
            showRowGroup: 'DesPro',
            filter: true,
            width: 500,
            pinned: 'left',
            columnGroupShow: 'close',
            cellRenderer: 'agGroupCellRenderer',
            valueGetter: params => {
              if (params.data) {
                return params.data.CodPro + ' - ' + params.data.DesPro;
              } else {
                return null;
              }
            },
            cellRendererParams: {
              suppressCount: true,
              innerRenderer: params => params.node.group ? `<span style="color: black; font-size: 12px; margin-left: 0px;">${params.value}</span>` : null,
              footerValueGetter(params) {
                switch (params.node.level) {
                  case 0:  // Total programa.
                    return `<span style="color: red; font-size: 14px; font-weight: bold; margin-left: 0px;"> Total ${params.value}</span>`;
                  case -1: // Total general.
                    return '<span style="color: red; font-size: 18px; font-weight: bold; margin-right: 0px;"> Total general' + '</span>';
                  default:
                    return 'SIN FORMATO';
                }
              }
            }
          },
          {
            headerName: 'Organico',
            field: 'DesOrg',
            rowGroup: true,
            showRowGroup: 'DesOrg',
            filter: false,
            width: 300,
            pinned: 'left',
            columnGroupShow: 'close',
            cellRenderer: 'agGroupCellRenderer',
            valueGetter: params => {
              if (params.data) {
                return params.data.CodOrg + ' - ' + params.data.DesOrg;
              } else {
                return null;
              }
            },
            cellRendererParams: {
              suppressCount: true,
              innerRenderer: params => {
                if (params.node.group) {
                  return params.value;
                } else {
                  return '';
                }
              },
              footerValueGetter(params) {
                const val = params.value.split(' - ')[1];
                switch (params.node.level) {
                  case 1:  // Total organico.
                    return `<span style="color: red; font-size: 12px;  font-weight: bold; margin-left: 0px;"> Total ${val}</span>`;
                  case -1: // Total general.
                    return '';
                  default:
                    return 'SIN FORMATO';
                }
              }
            }
          },
          {
            headerName: 'Capítulo',
            field: 'DesCap',
            rowGroup: true,
            showRowGroup: 'DesCap',
            filter: false,
            width: 300,
            pinned: 'left',
            columnGroupShow: 'close',
            cellRenderer: 'agGroupCellRenderer',
            valueGetter: params => {
              if (params.data) {
                return params.data.CodCap + ' - ' + params.data.DesCap;
              } else {
                return null;
              }
            },
            cellRendererParams: {
              suppressCount: true,
              innerRenderer: params => {
                if (params.node.group) {
                  return params.value;
                } else {
                  return '';
                }
              },
              footerValueGetter(params) {
                const val = params.value.split(' - ')[1];
                switch (params.node.level) {
                  case 2:  // Total capítulo.
                    return `<span style="color: red; font-size: 12px;  font-weight: bold; margin-left: 0px;"> Total ${val}</span>`;
                  case -1: // Total general.
                    return '';
                  default:
                    return 'SIN FORMATO';
                }
              }
            }
          },
          {
            headerName: 'Económico',
            field: 'DesEco',
            width: 400,
            pinned: 'left',
            filter: true,
            cellRenderer: "",
            valueGetter: params => {
              if (params.data) {
                return params.data.CodEco + ' - ' + params.data.DesEco;
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
      width: 110,
      sortable: true,
      resizable: true,
      filter: true,
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
    this.localeText = localeTextESPes;
  }

  async onGridReady(params: GridReadyEvent) {
    this._gridApi = params.api;
    var defaultSortModel: ColumnState[] = [
      { colId: 'DesEco', sort: 'asc', sortIndex: 0 },
    ];
    params.columnApi.applyColumnState({ state: defaultSortModel });

    this.rowData = (await this._prepareDataProgramaDetailsService.getDataAllYear())
      .filter(x => x.CodPro == this.dataStoreService.selectedCodeRowFirstLevel.split(" ")[0]);
    // console.log(this.rowData);

    // Acumular los datos por aplicación presupuestaria = orgánico + programa + económico.
    this.aplicacionesPresupuestarias = []
    this.dataIntermedio = [];
    this.dataFinal = [];

    // Creo array de aplicaciones presupuestarias existentes en programa seleccionado.
    this.rowData.map(item => {
      item.AplicacionPresupuestaria = item.CodOrg + '-' + item.CodPro + '-' + item.CodEco;
      this.aplicacionesPresupuestarias.push(item.AplicacionPresupuestaria)
      this.aplicacionesPresupuestarias = [...new Set(this.aplicacionesPresupuestarias)];
    });
    // console.log("aplicacionesPresupuestarias", this.aplicacionesPresupuestarias);

    // Creo item para cada uno de los aplicaciones presupuestarias existentes en programa seleccionado.
    this.aplicacionesPresupuestarias.map(item => {
      const dataIntermedio = this.rowData.filter(x => x.AplicacionPresupuestaria === item);
      const yearsIniciales = accumulate('Iniciales', dataIntermedio);
      const yearsDefinitivas = accumulate('Definitivas', dataIntermedio);
      const yearsObligacionesNetas = accumulate('ObligacionesReconocidasNetas', dataIntermedio);
      const yearsObligacionesPendientes = accumulate('ObligacionesPendientePago', dataIntermedio);

      const value = {
        "AplicacionPresupuestaria": item,
        "CodOrg": item.split('-')[0],
        "CodPro": item.split('-')[1],
        "CodEco": item.split('-')[2],
        "CodCap": item.split('-')[2].charAt(0),
        "DesOrg": dataIntermedio[0].DesOrg,
        "DesPro": dataIntermedio[0].DesPro,
        "DesCap": dataIntermedio[0].DesCap,
        "DesEco": dataIntermedio[0].DesEco,
        "Iniciales2015": yearsIniciales[2015],
        "Definitivas2015": yearsDefinitivas[2015],
        "ObligacionesReconocidasNetas2015": yearsObligacionesNetas[2015],
        "ObligacionesPendientePago2015": yearsObligacionesPendientes[2015],
        "Iniciales2016": yearsIniciales[2016],
        "Definitivas2016": yearsDefinitivas[2016],
        "ObligacionesReconocidasNetas2016": yearsObligacionesNetas[2016],
        "ObligacionesPendientePago2016": yearsObligacionesPendientes[2016],
        "Iniciales2017": yearsIniciales[2017],
        "Definitivas2017": yearsDefinitivas[2017],
        "ObligacionesReconocidasNetas2017": yearsObligacionesNetas[2017],
        "ObligacionesPendientePago2017": yearsObligacionesPendientes[2017],
        "Iniciales2018": yearsIniciales[2018],
        "Definitivas2018": yearsDefinitivas[2018],
        "ObligacionesReconocidasNetas2018": yearsObligacionesNetas[2018],
        "ObligacionesPendientePago2018": yearsObligacionesPendientes[2018],
        "Iniciales2019": yearsIniciales[2019],
        "Definitivas2019": yearsDefinitivas[2019],
        "ObligacionesReconocidasNetas2019": yearsObligacionesNetas[2019],
        "ObligacionesPendientePago2019": yearsObligacionesPendientes[2019],
        "Iniciales2020": yearsIniciales[2020],
        "Definitivas2020": yearsDefinitivas[2020],
        "ObligacionesReconocidasNetas2020": yearsObligacionesNetas[2020],
        "ObligacionesPendientePago2020": yearsObligacionesPendientes[2020],
        "Iniciales2021": yearsIniciales[2021],
        "Definitivas2021": yearsDefinitivas[2021],
        "ObligacionesReconocidasNetas2021": yearsObligacionesNetas[2021],
        "ObligacionesPendientePago2021": yearsObligacionesPendientes[2021],
        "Iniciales2022": yearsIniciales[2022],
        "Definitivas2022": yearsDefinitivas[2022],
        "ObligacionesReconocidasNetas2022": yearsObligacionesNetas[2022],
        "ObligacionesPendientePago2022": yearsObligacionesPendientes[2022],
      }
      this.dataFinal.push(value)
    });
    this.rowData = this.dataFinal;
    // console.log("After", this.rowData);
    // this.expandAll();
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

  expandAll() {
    this._gridApi.expandAll();
    this.isExpanded = true;
  }

  collapseAll() {
    this._gridApi.collapseAll();
    this.isExpanded = false;
  }

  showEconomicoDetails() {
    const selectedRows = this.agGrid.api.getSelectedNodes();
    if (selectedRows.length > 0) {
      const aplicacionPresupuestaria = selectedRows[0].data.CodOrg + '-' + selectedRows[0].data.CodPro + '-' + selectedRows[0].data.CodEco;
      this.dataStoreService.selectedCodeRow = aplicacionPresupuestaria;
      this._router.navigateByUrl('/tableAplicacionPresupuestaria')
    } else {
      this._alertService.showAlert('Selecciona un económico');
    }
  }

  volver() {
    this._location.back();
  }

}
