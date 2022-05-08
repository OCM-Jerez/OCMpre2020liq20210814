import { Component } from '@angular/core';
import { AgChartOptions } from 'ag-charts-community';
import { DataStoreService } from '../../services/dataStore.service';

@Component({
  selector: 'app-graphtree',
  templateUrl: './graph-tree.component.html',
  styleUrls: ['./graph-tree.component.scss']
})
export class GraphTreeComponent {
  options: AgChartOptions = {} as AgChartOptions;

  constructor(
    private _dataStoreService: DataStoreService
  ) {
    const dataGrahTree = this._dataStoreService.dataGraphTree;
    // const tipoClasificacion = this._dataStoreService.getDataTable.clasificationType;
    let data = {
      children: [
        {
          // Dejo clildren para que muestre un recuadro negro alrededor del tile
          children: [
            {
              label: dataGrahTree[0].descripcion + " P",
              size: dataGrahTree[0].total,
              color: 4.29,
            },
          ],
        },
        {
          children: [
            {
              label: dataGrahTree[1].descripcion + " Pruebas",
              size: dataGrahTree[1].total,
              color: 2.29,
            }
          ]
        },
        {
          children: [
            {
              label: dataGrahTree[2].descripcion + "no",
              size: dataGrahTree[2].total,
              color: 2.29,
            },
          ],
        },
        {
          children: [
            {
              label: dataGrahTree[3].descripcion,
              size: dataGrahTree[3].total,
              color: 2.29,
            },
          ],
        },
        {
          children: [
            {
              label: dataGrahTree[4].descripcion,
              size: dataGrahTree[4].total,
              color: 2.29,
            },
          ],
        },
        {
          children: [
            {
              label: dataGrahTree[5].descripcion,
              size: dataGrahTree[5].total,
              color: 2.29,
            },
          ],
          color: -4.27,
        },
        {
          children: [
            {
              label: dataGrahTree[6].descripcion,
              size: dataGrahTree[6].total,
              color: 2.29,
            },
          ],
        },
        {
          children: [
            {
              label: dataGrahTree[7].descripcion,
              size: dataGrahTree[7].total,
              color: 2.29,
            },
          ],
        },
        {
          children: [
            {
              label: dataGrahTree[8].descripcion,
              size: dataGrahTree[8].total,
              color: 2.29,
            },
          ],
        },
        {
          children: [
            {
              label: dataGrahTree[9].descripcion,
              size: dataGrahTree[9].total,
              color: 2.29,
            },
          ],
        },
        {
          children: [
            {
              label: dataGrahTree[10].descripcion,
              size: dataGrahTree[10].total,
              color: 5.31,
            },
          ],
        },
        {
          children: [
            {
              label: dataGrahTree[11].descripcion,
              size: dataGrahTree[11].total,
              color: 2.29,
            },
          ],
        },
        {
          children: [
            {
              label: dataGrahTree[12].descripcion,
              size: dataGrahTree[12].total,
              color: 2.29,
            },
          ],
        },
        {
          children: [
            {
              label: dataGrahTree[13].descripcion,
              size: dataGrahTree[13].total,
              color: 2.29,
            },
          ],
        },
        {
          children: [
            {
              label: dataGrahTree[14].descripcion,
              size: dataGrahTree[14].total,
              color: 2.29,
            },
          ],
        },
        {
          children: [
            {
              label: dataGrahTree[15].descripcion,
              size: dataGrahTree[15].total,
              color: 2.29,
            },
          ],
        },
        {
          children: [
            {
              label: dataGrahTree[16].descripcion,
              size: dataGrahTree[16].total,
              color: 2.29,
            },
          ],
        },
        {
          children: [
            {
              label: dataGrahTree[17].descripcion,
              size: dataGrahTree[17].total,
              color: 2.29,
            },
          ],
        },
        {
          children: [
            {
              label: dataGrahTree[18].descripcion,
              size: dataGrahTree[18].total,
              color: 2.29,
            },
          ],
        },
        {
          children: [
            {
              label: dataGrahTree[19].descripcion,
              size: dataGrahTree[19].total,
              color: 2.29,
            },
          ],
        },
        {
          children: [
            {
              label: dataGrahTree[20].descripcion,
              size: dataGrahTree[20].total,
              color: 2.29,
            },
          ],
        },
        {
          label: dataGrahTree[21].descripcion,
          children: [
            {
              label: dataGrahTree[21].descripcion,
              size: dataGrahTree[21].total,
              color: 2.29,
            },
          ],
        },
        {
          label: dataGrahTree[22].descripcion,
          children: [
            {
              label: dataGrahTree[22].descripcion,
              size: dataGrahTree[22].total,
              color: 2.29,
            },
          ],
        },
        {
          children: [
            {
              label: dataGrahTree[23].descripcion,
              size: dataGrahTree[23].total,
              color: 2.29,
            },
          ],
        },
        {
          children: [
            {
              label: dataGrahTree[24].descripcion,
              size: dataGrahTree[24].total,
              color: 2.29,
            },
          ],
        },
        {
          children: [
            {
              label: dataGrahTree[25].descripcion,
              size: dataGrahTree[25].total,
              color: 2.29,
            },
          ],
        },
      ]
    }

    this.options = {
      type: 'hierarchy',
      data,
      title: {
        text: `Donde van mis impuestos`,
        fontSize: 30,
        fontWeight: 'bold',
      },
      subtitle: {
        text: 'Por orgánico',
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
          // colorKey: 'color',
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
}
