import { Component } from '@angular/core';
import { AgChartOptions } from 'ag-charts-community';
import { AvalaibleYearsService } from '../../services/avalaibleYears.service';
import { DataStoreService } from '../../services/dataStore.service';

@Component({
  selector: 'app-graphtree',
  templateUrl: './graph-tree.component.html',
  styleUrls: ['./graph-tree.component.scss']
})
export class GraphTreeComponent {
  options: AgChartOptions = {} as AgChartOptions;

  constructor(
    private _avalaibleYearsService: AvalaibleYearsService,
    private _dataStoreService: DataStoreService
  ) {
    const dataGraphTree = this._dataStoreService.dataGraphTree;
    const tipoClasificacion = this._dataStoreService.getDataTable.clasificationType;
    // console.log(tipoClasificacion);
    if (tipoClasificacion === 'gastosProgramaAreas') {

    }

    // console.log(dataGraphTree.length);
    const max = Math.max(...dataGraphTree.map(item => item.total));
    // console.log(max);
    const tiles = [];
    for (let i = 0; i < dataGraphTree.length; i++) {
      tiles.push({
        children: [
          {
            label: dataGraphTree[i].codigo + " " + dataGraphTree[i].descripcion,
            size: dataGraphTree[i].total,
            color: this.calculaColor1(dataGraphTree[i].total, max)
          }
        ],
      });
    }
    let data = {
      children: tiles
    }
    // console.log({ data });

    this.options = {
      type: 'treemap',
      data,
      title: {
        text: `Donde van mis impuestos año ${this._avalaibleYearsService.getYearsSelected()}`,
        fontSize: 30,
        fontWeight: 'bold',
      },
      subtitle: {
        text: `Por ${tipoClasificacion}`,
        fontSize: 20,
        fontWeight: 'bold',
      },

      series: [

        {
          type: 'treemap',
          // The labelKey, sizeKey and colorKey configs can be omitted, if the node objects in your data happen to have the label,
          // size and color fields.
          // labelKey: 'label',
          // sizeKey: 'size',
          // colorKey: '',
          colorParents: true,
          colorRange: ['green', 'red'],
          nodePadding: 3,
          showInLegend: true,
          visible: true,
          labels: {
            large: {
              enabled: true,
              fontSize: 12,
            },
          },

          tooltip: {
            renderer: (params) => {
              return {
                content: `<b>Creditos</b>: ${params.datum.datum.size.toString()
                  .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}`,
              };
            },
          },

        },
      ],
    };
  }

  calculaColor(valor: number) {
    let colorCalculado = valor / 1_000_000;
    // console.log(colorCalculado);

    if (valor > 1 && valor < 1_000_000) {
      colorCalculado = -5;
    }

    if (valor > 1_000_000 && valor < 2_000_000) {
      colorCalculado = -4.9;
    }

    if (valor > 2_000_000 && valor < 3_000_000) {
      colorCalculado = -4.8;
    }

    if (valor > 3_000_000 && valor < 4_000_000) {
      colorCalculado = -4.7;
    }
    if (valor > 4_000_000 && valor < 5_000_000) {
      colorCalculado = -4.6;
    }

    if (valor > 5_000_000 && valor < 6_000_000) {
      colorCalculado = -4.5;
    }

    if (valor > 6_000_000 && valor < 7_000_000) {
      colorCalculado = -4.4;
    }

    if (valor > 7_000_000 && valor < 8_000_000) {
      colorCalculado = -4.3;
    }

    if (valor > 8_000_000 && valor < 9_000_000) {
      colorCalculado = -4.2;
    }

    if (valor > 9_000_000 && valor < 10_000_000) {
      colorCalculado = -4.1;
    }

    if (valor > 10_000_000 && valor < 11_000_000) {
      colorCalculado = -4;
    }

    if (valor > 11_000_000 && valor < 12_000_000) {
      colorCalculado = -3.9;
    }

    if (valor > 12_000_000 && valor < 13_000_000) {
      colorCalculado = -3.8;
    }

    if (valor > 13_000_000 && valor < 14_000_000) {
      colorCalculado = -3.7;
    }

    if (valor > 14_000_000 && valor < 15_000_000) {
      colorCalculado = -3.6;
    }

    if (valor > 15_000_000 && valor < 16_000_000) {
      colorCalculado = -3.5;
    }

    if (valor > 16_000_000 && valor < 17_000_000) {
      colorCalculado = -3.4;
    }

    if (valor > 17_000_000 && valor < 18_000_000) {
      colorCalculado = -3.3;
    }

    if (valor > 18_000_000 && valor < 19_000_000) {
      colorCalculado = -3.2;
    }

    if (valor > 19_000_000 && valor < 20_000_000) {
      colorCalculado = -3.1;
    }

    if (valor > 20_000_000 && valor < 21_000_000) {
      colorCalculado = -3;
    }

    if (valor > 21_000_000 && valor < 22_000_000) {
      colorCalculado = -2.9;
    }

    if (valor > 22_000_000 && valor < 23_000_000) {
      colorCalculado = -2.8;
    }

    if (valor > 23_000_000 && valor < 24_000_000) {
      colorCalculado = -2.7;
    }

    if (valor > 24_000_000 && valor < 25_000_000) {
      colorCalculado = -2.6;
    }

    if (valor > 25_000_000 && valor < 26_000_000) {
      colorCalculado = -2.5;
    }

    if (valor > 26_000_000 && valor < 27_000_000) {
      colorCalculado = -2.4;
    }

    if (valor > 27_000_000 && valor < 28_000_000) {
      colorCalculado = -2.3;
    }

    if (valor > 28_000_000 && valor < 29_000_000) {
      colorCalculado = -2.2;
    }

    if (valor > 29_000_000 && valor < 30_000_000) {
      colorCalculado = -2.1;
    }

    if (valor > 30_000_000 && valor < 31_000_000) {
      colorCalculado = -2;
    }

    if (valor > 31_000_000 && valor < 32_000_000) {
      colorCalculado = -1.9;
    }

    if (valor > 32_000_000 && valor < 33_000_000) {
      colorCalculado = -1.8;
    }

    if (valor > 33_000_000 && valor < 34_000_000) {
      colorCalculado = -1.7;
    }

    if (valor > 34_000_000 && valor < 35_000_000) {
      colorCalculado = -1.6;
    }

    if (valor > 35_000_000 && valor < 36_000_000) {
      colorCalculado = -1.5;
    }

    if (valor > 36_000_000 && valor < 37_000_000) {
      colorCalculado = -1.4;
    }

    if (valor > 37_000_000 && valor < 38_000_000) {
      colorCalculado = -1.3;
    }

    if (valor > 38_000_000 && valor < 39_000_000) {
      colorCalculado = -1.2;
    }

    if (valor > 39_000_000 && valor < 40_000_000) {
      colorCalculado = -1.1;
    }

    if (valor > 40_000_000 && valor < 41_000_000) {
      colorCalculado = -1;
    }

    if (valor > 41_000_000 && valor < 42_000_000) {
      colorCalculado = -0.9;
    }

    if (valor > 42_000_000 && valor < 43_000_000) {
      colorCalculado = -0.8;
    }

    if (valor > 43_000_000 && valor < 44_000_000) {
      colorCalculado = -0.7;
    }

    if (valor > 44_000_000 && valor < 45_000_000) {
      colorCalculado = -0.6;
    }

    if (valor > 45_000_000 && valor < 46_000_000) {
      colorCalculado = -0.5;
    }

    if (valor > 46_000_000 && valor < 47_000_000) {
      colorCalculado = -0.4;
    }

    if (valor > 47_000_000 && valor < 48_000_000) {
      colorCalculado = -0.3;
    }

    if (valor > 48_000_000 && valor < 49_000_000) {
      colorCalculado = -0.2;
    }

    if (valor > 49_000_000 && valor < 50_000_000) {
      colorCalculado = -0.1;
    }

    if (valor > 50_000_000 && valor < 51_000_000) {
      colorCalculado = 0;
    }

    if (valor > 51_000_000 && valor < 52_000_000) {
      colorCalculado = 0.1;
    }

    if (valor > 52_000_000 && valor < 53_000_000) {
      colorCalculado = 0.2;
    }

    if (valor > 53_000_000 && valor < 54_000_000) {
      colorCalculado = 0.3;
    }

    if (valor > 54_000_000 && valor < 55_000_000) {
      colorCalculado = 0.4;
    }

    if (valor > 55_000_000 && valor < 56_000_000) {
      colorCalculado = 0.5;
    }

    if (valor > 56_000_000 && valor < 57_000_000) {
      colorCalculado = 0.6;
    }

    if (valor > 57_000_000 && valor < 58_000_000) {
      colorCalculado = 0.7;
    }

    if (valor > 58_000_000 && valor < 59_000_000) {
      colorCalculado = 0.8;
    }

    if (valor > 59_000_000 && valor < 60_000_000) {
      colorCalculado = 0.9;
    }

    if (valor > 60_000_000 && valor < 61_000_000) {
      colorCalculado = 1;
    }

    if (valor > 61_000_000 && valor < 62_000_000) {
      colorCalculado = 1.1;
    }

    if (valor > 62_000_000 && valor < 63_000_000) {
      colorCalculado = 1.2;
    }

    if (valor > 63_000_000 && valor < 64_000_000) {
      colorCalculado = 1.3;
    }

    if (valor > 64_000_000 && valor < 65_000_000) {
      colorCalculado = 1.4;
    }

    if (valor > 65_000_000 && valor < 66_000_000) {
      colorCalculado = 1.5;
    }

    if (valor > 66_000_000 && valor < 67_000_000) {
      colorCalculado = 1.6;
    }

    if (valor > 67_000_000 && valor < 68_000_000) {
      colorCalculado = 1.7;
    }

    if (valor > 68_000_000 && valor < 69_000_000) {
      colorCalculado = 1.8;
    }

    if (valor > 69_000_000 && valor < 70_000_000) {
      colorCalculado = 1.9;
    }

    if (valor > 70_000_000 && valor < 71_000_000) {
      colorCalculado = 2;
    }

    if (valor > 71_000_000 && valor < 72_000_000) {
      colorCalculado = 2.1;
    }

    if (valor > 72_000_000 && valor < 73_000_000) {
      colorCalculado = 2.2;
    }

    if (valor > 73_000_000 && valor < 74_000_000) {
      colorCalculado = 2.3;
    }

    if (valor > 74_000_000 && valor < 75_000_000) {
      colorCalculado = 2.4;
    }

    if (valor > 75_000_000 && valor < 76_000_000) {
      colorCalculado = 2.5;
    }

    if (valor > 76_000_000 && valor < 77_000_000) {
      colorCalculado = 2.6;
    }

    if (valor > 77_000_000 && valor < 78_000_000) {
      colorCalculado = 2.7;
    }

    if (valor > 78_000_000 && valor < 79_000_000) {
      colorCalculado = 2.8;
    }

    if (valor > 79_000_000 && valor < 80_000_000) {
      colorCalculado = 2.9;
    }

    if (valor > 80_000_000 && valor < 81_000_000) {
      colorCalculado = 3;
    }

    if (valor > 81_000_000 && valor < 82_000_000) {
      colorCalculado = 3.1;
    }

    if (valor > 82_000_000 && valor < 83_000_000) {
      colorCalculado = 3.2;
    }

    if (valor > 83_000_000 && valor < 84_000_000) {
      colorCalculado = 3.3;
    }

    if (valor > 84_000_000 && valor < 85_000_000) {
      colorCalculado = 3.4;
    }

    if (valor > 85_000_000 && valor < 86_000_000) {
      colorCalculado = 3.5;
    }

    if (valor > 86_000_000 && valor < 87_000_000) {
      colorCalculado = 3.6;
    }

    if (valor > 87_000_000 && valor < 88_000_000) {
      colorCalculado = 3.7;
    }

    if (valor > 88_000_000 && valor < 89_000_000) {
      colorCalculado = 3.8;
    }

    if (valor > 89_000_000 && valor < 90_000_000) {
      colorCalculado = 3.9;
    }

    if (valor > 90_000_000 && valor < 91_000_000) {
      colorCalculado = 4;
    }

    if (valor > 91_000_000 && valor < 92_000_000) {
      colorCalculado = 4.1;
    }

    if (valor > 92_000_000 && valor < 93_000_000) {
      colorCalculado = 4.2;
    }

    if (valor > 93_000_000 && valor < 94_000_000) {
      colorCalculado = 4.3;
    }

    if (valor > 94_000_000 && valor < 95_000_000) {
      colorCalculado = 4.4;
    }

    if (valor > 95_000_000 && valor < 96_000_000) {
      colorCalculado = 4.5;
    }

    if (valor > 96_000_000 && valor < 97_000_000) {
      colorCalculado = 4.6;
    }

    if (valor > 97_000_000 && valor < 98_000_000) {
      colorCalculado = 4.7;
    }

    if (valor > 98_000_000 && valor < 99_000_000) {
      colorCalculado = 4.8;
    }

    if (valor > 99_000_000 && valor < 100_000_000) {
      colorCalculado = 4.9;
    }

    if (valor > 100_000_000 && valor < 110_000_000) {
      colorCalculado = 5;
    }

    // console.log('Valor: ' + valor + ' Color: ' + colorCalculado + descripcion);
    return colorCalculado;

  }

  calculaColor1(valor: number, max: number) {
    // tenemos un rango de 0 a 100
    // desde -5 a +5 con pasos de 0.1
    // tenemos que conocer el maximo valor
    // El intervalo es max/100
    const interval = (max / 100);
    const cuantosIntervals = (valor / interval);
    // console.log('Intervalo: ' + interval);
    // console.log('Cuantos intervalos: ' + cuantosIntervals);
    const colorCalculado = -5 + (cuantosIntervals / 10);
    // console.log('Valor: ' + valor + ' Color: ' + colorCalculado);
    return colorCalculado;

  }

}
