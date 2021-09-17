import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { GridOptions } from 'ag-grid-community/main';

import { AvalaibleYearsService } from '../services/avalaibleYears.service';
import { TipoClasificacionService } from 'src/app/services/tipoClasificacion.service';
import { SCREEN_SIZE } from 'src/app/screen-size.enum';
import { GetScreenSizeService } from '../services/get-screen-size.service';

import localeTextESPes from '../../assets/data/localeTextESPes.json';
import { CellRendererOCM } from '../shared/utils/utils';

@Component({
  selector: 'app-comparativas',
  templateUrl: './comparativas.component.html',
  styleUrls: ['./comparativas.component.scss']
})
export class ComparativasComponent implements OnInit {
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
  public isExpanded = false;
  public DesCapWidth?: number;
  public DesProWidth?: number;
  public CreditosWidth?: number = 100;
  public OPAWidth?: number = 90;
  public screenSize?: any;
  public tipoClasificacion: string;

  result2017 = [];
  result2018 = [];
  result2019 = [];
  result2020 = [];

  myGroupName: string;
  myHeaderName: string;
  myField: string;
  columnsIzda: [];
  columnsDcha: [];

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

  ngOnInit(): void {
  }

  async onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    // this.rowData = await this.avalaibleYearsService.getDataJson(true);
    this.avalaibleYearsService.getYearDataJson('2020', true)
      .then(data => {
        const total = (
          data
            .filter(d => d.CodEco === 15100)
            .reduce((anterior, actual) => anterior + actual.ObligacionesReconocidasNetas, 0));
        console.log('Total 15100 =', total);
        this.rowData = data;
        // console.log('rowData', this.rowData);
        // console.log(this.rowData[0]);
        const [{ CodEco, DesEco }] = this.rowData;
        // console.log('CodEco', CodEco, 'DesEco', DesEco);

        const newJSON = this.rowData;
        // let result2020 = [];

        // Object.entries(newJSON).forEach(prop => {
        //   console.log('prop', prop[1]['CodEco'], prop[1]['DesEco']);
        // });

        Object.entries(newJSON).forEach(prop => this.result2020.push({
          "CodEco": prop[1]['CodEco'],
          "DesEco": prop[1]['DesEco'],
          "ObligacionesReconocidasNetas2020": prop[1]['ObligacionesReconocidasNetas'],
          "OPA2020": prop[1]['ObligacionesPendientePago']
        }));

        console.log('*********  result2020 ***********', this.result2020);


      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        console.log('finally');
      });

    this.avalaibleYearsService.getYearDataJson('2019', true)
      .then(data => {
        const newJSON = data;
        Object.entries(newJSON).forEach(prop => this.result2019.push({
          "CodEco": prop[1]['CodEco'],
          "DesEco": prop[1]['DesEco'],
          "ObligacionesReconocidasNetas2019": prop[1]['ObligacionesReconocidasNetas'],
          "OPA2019": prop[1]['ObligacionesPendientePago']
        }));

        console.log('********  result2019 ************', this.result2019);
        // const resultTotal = this.result2019.concat(this.result2020);
        // this.rowData = resultTotal;
        // console.log('********  resultTotal ************', resultTotal);
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        console.log('finally');
      });

    this.avalaibleYearsService.getYearDataJson('2018', true)
      .then(data => {
        const newJSON = data;
        Object.entries(newJSON).forEach(prop => this.result2018.push({
          "CodEco": prop[1]['CodEco'],
          "DesEco": prop[1]['DesEco'],
          "ObligacionesReconocidasNetas2018": prop[1]['ObligacionesReconocidasNetas'],
          "OPA2018": prop[1]['ObligacionesPendientePago']
        }));

        console.log('********  result2018 ************', this.result2019);
        // const resultTotal = this.result2019.concat(this.result2020);
        // this.rowData = resultTotal;
        // console.log('********  resultTotal ************', resultTotal);
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        console.log('finally');
      });

    this.avalaibleYearsService.getYearDataJson('2017', true)
      .then(data => {
        const newJSON = data;
        Object.entries(newJSON).forEach(prop => this.result2017.push({
          "CodEco": prop[1]['CodEco'],
          "DesEco": prop[1]['DesEco'],
          "ObligacionesReconocidasNetas2017": prop[1]['ObligacionesReconocidasNetas'],
          "OPA2017": prop[1]['ObligacionesPendientePago']
        }));

        console.log('********  result2017 ************', this.result2017);
        const resultTotal = this.result2017.concat(this.result2018).concat(this.result2019).concat(this.result2020);
        this.rowData = resultTotal;
        console.log('********  resultTotal ************', resultTotal);
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        console.log('finally');
      });

    // const data = { "Food": 900, "Shopping": 0, "Travel": 600, "Health": 0 };
    // let result = [];
    // Object.entries(data).forEach(prop => result.push({
    //   "data": prop[1],
    //   "label": prop[0]
    // }));

    // console.log(result);


    // 


    // this.avalaibleYearsService.getDataJson(true)
    //   .then(data => {
    //     console.log(
    //       data
    //         .filter(d => d.CodEco === 15100)
    //         .reduce((anterior, actual) => anterior + actual.GastosComprometidos, 0)
    //     );
    //     console.log(data);
    //     this.rowData = data;


    //     //     // const foo = data.filter(d => d.CodEco === 15100);
    //     //     // let gastos = 0;
    //     //     // foo.forEach(d => {
    //     //     //   gastos += d.GastosComprometidos;
    //     //     // })
    //     //     // console.log(gastos);

    //   })

    //   .catch(error => {
    //     console.error(error);
    //   })
    //   .finally(() => {
    //     console.log('finally');
    //   });



  }


  // Importar los json de cada año.
  // 
  // extraer los campos de ecoDes = 15100 año 2020
  // extraer"GastosComprometidos": "año2020

  // extraer los campos de ecoDes = 15100 año 2019
  // extraer"GastosComprometidos": "año2019



  // crear json con los datos de cada año
  // usar el json creado para mostrar dotos con ag-grid

}
