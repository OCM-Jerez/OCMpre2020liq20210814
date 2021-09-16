import { Component, OnInit } from '@angular/core';
import { AvalaibleYearsService } from '../services/avalaibleYears.service';
import { GastosComponent } from '../gastos/gastos.component';
import { collectExternalReferences } from '@angular/compiler';

@Component({
  selector: 'app-comparativas',
  templateUrl: './comparativas.component.html',
  styleUrls: ['./comparativas.component.scss']
})
export class ComparativasComponent implements OnInit {

  constructor(private avalaibleYearsService: AvalaibleYearsService) {

  }

  ngOnInit(): void {
    this.avalaibleYearsService.getDataJson(true)
      .then(data => {
        console.log(data
          .filter(d => d.CodEco === 15100)
          .reduce((anterior, actual) => anterior + actual.GastosComprometidos, 0)
        );

        // const foo = data.filter(d => d.CodEco === 15100);
        // let gastos = 0;
        // foo.forEach(d => {
        //   gastos += d.GastosComprometidos;
        // })
        // console.log(gastos);

      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        console.log('finally');
      });
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
