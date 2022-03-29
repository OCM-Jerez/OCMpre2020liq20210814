import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import { AgChartOptions, GridOptions } from 'ag-grid-community';
import { CellRendererOCM } from '../../../ag-grid/CellRendererOCM';
import { accumulate } from '../../../commons/util/util';
import { AvalaibleYearsService } from '../../../services/avalaibleYears.service';
import { DataGraphService } from '../../../services/data-graph.service';

@Component({
  selector: 'app-graph-programa',
  templateUrl: './graph-programa.component.html',
  styleUrls: ['./graph-programa.component.scss']
})
export class GraphProgramaComponent implements AfterViewInit {
  options: AgChartOptions;
  rowData: any;
  data: any;

  @ViewChild('agGrid', { static: false }) agGrid: AgGridAngular;
  private gridApi;
  public gridColumnApi;
  public columnDefs;
  public defaultColDef;
  public gridOptions: GridOptions;
  public localeText;
  public rowDataTable: any;
  public groupHeaderHeight = 25;
  public headerHeight = 25;

  constructor(
    private avalaibleYearsService: AvalaibleYearsService,
    private dataGraphService: DataGraphService,
    private router: Router,
  ) {
    this.createData(this.dataGraphService.getCodigoSelect().split(" ")[0]);

    this.columnDefs = [
      {
        headerName: 'Año',
        field: 'year',
        width: 70,
      },
      {
        headerName: 'Previsiones definitivas',
        field: 'Definitivas',
        width: 180,
        aggFunc: 'sum',
        cellRenderer: CellRendererOCM,
      },
      {
        headerName: 'ObligacionesReconocidasNetas',
        field: 'ObligacionesReconocidasNetas',
        width: 200,
        aggFunc: 'sum',
        cellRenderer: CellRendererOCM,
      },
      {
        headerName: 'ObligacionesPendientes',
        field: 'ObligacionesPendientes',
        width: 180,
        aggFunc: 'sum',
        cellRenderer: CellRendererOCM,
      }
    ];

    this.defaultColDef = {
      sortable: true,
      resizable: true,
      filter: false,
    };

  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.options = {
        autoSize: true,
        title: {
          text: `${this.dataGraphService.getTipoSelect()} ${this.dataGraphService.getCodigoSelect()}`,
        },
        subtitle: {
          text: 'Los valores de creditos definitivos del año 2022 se igualan a los a los crditos iniciales, al no tener otro dato.'
        },
        data: [...this.data],
        series: [
          {
            xKey: 'year',
            yKey: 'Definitivas',
          },
          {
            xKey: 'year',
            yKey: 'ObligacionesReconocidasNetas',
          },
          {
            xKey: 'year',
            yKey: 'ObligacionesPendientes',
          },
        ],
        axes: [
          {
            type: 'category',
            position: 'bottom',
            title: {
              text: 'Años',
              enabled: true,
            },
          },
          {
            type: 'number',
            position: 'left',
            title: {
              text: 'en miles de Euros',
              enabled: true,
            },
            label: {
              formatter: function (params) {
                return params.value / 1000 + '';
              }
            },
          },
        ],
        legend: {
          enabled: true,
          position: 'bottom',
        },

      }
    }, 500);
  }

  async onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  async createData(pro: string) {
    this.rowData = await this.avalaibleYearsService.getDataAllYear('Pro', true);
    const datos = this.rowData.filter(x => x.CodPro == pro);

    const yearsIniciales = accumulate('Iniciales', datos);
    const yearsDefinitivas = accumulate('Definitivas', datos);
    const yearsObligacionesNetas = accumulate('ObligacionesReconocidasNetas', datos);
    const yearsObligacionesPendientes = accumulate('ObligacionesPendientePago', datos);

    this.data = [];
    for (let index = 2015; index <= 2022; index++) {
      const value = {
        "year": index,
        "Definitivas": yearsDefinitivas[index],
        "ObligacionesReconocidasNetas": yearsObligacionesNetas[index],
        "ObligacionesPendientes": yearsObligacionesPendientes[index]
      }
      if (index === 2022) {
        value.Definitivas = yearsIniciales[index]  // Se usan las iniciales ya que es el unico dato que existe-
      }
      this.data.push(value)
    }
    console.log("Datos Tratados: ", this.data);
    return this.data;
  }

  volver() {
    this.router.navigateByUrl('/SelectCodigo')
  }

}
