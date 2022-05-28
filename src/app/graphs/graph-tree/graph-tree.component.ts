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
            color: this.calculaColor(dataGraphTree[i].total, max)
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

  calculaColor(valor: number, max: number) {
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
