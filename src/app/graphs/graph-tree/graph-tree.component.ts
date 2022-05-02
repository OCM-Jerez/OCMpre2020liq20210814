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
    const tipoClasificacion = this._dataStoreService.getDataTable.clasificationType;
    switch (tipoClasificacion) {
      case 'gastosOrganicaOrganicos':
        let data = {
          name: 'Root',
          children: [
            {
              name: 'Organicos',
              children: [
                {
                  // name: 'Organico 0',
                  name: dataGrahTree[0].descripcion,
                  children: [
                    {
                      name: dataGrahTree[0].descripcion,
                      size: dataGrahTree[0].total,
                      description: dataGrahTree[0].codigo,
                      color: 4.29,
                    },
                  ],
                  color: -4.27,
                },
                {
                  name: '1',
                  children: [
                    {
                      name: dataGrahTree[1].descripcion,
                      size: dataGrahTree[1].total,
                      description: dataGrahTree[1].codigo,
                      color: 2.29,
                    },
                  ],
                  color: -4.27,
                },
                {
                  name: '2',
                  children: [
                    {
                      name: dataGrahTree[2].descripcion,
                      size: dataGrahTree[2].total,
                      description: dataGrahTree[2].codigo,
                      color: 2.29,
                    },
                  ],
                  color: -4.27,
                },
                {
                  name: '3',
                  children: [
                    {
                      name: dataGrahTree[3].descripcion,
                      size: dataGrahTree[3].total,
                      description: dataGrahTree[3].codigo,
                      color: 2.29,
                    },
                  ],
                  color: -4.27,
                },
                {
                  name: '4',
                  children: [
                    {
                      name: dataGrahTree[4].descripcion,
                      size: dataGrahTree[4].total,
                      description: dataGrahTree[4].codigo,
                      color: 2.29,
                    },
                  ],
                  color: -4.27,
                },
                {
                  name: '5',
                  children: [
                    {
                      name: dataGrahTree[5].descripcion,
                      size: dataGrahTree[5].total,
                      description: dataGrahTree[5].codigo,
                      color: 2.29,
                    },
                  ],
                  color: -4.27,
                },
                {
                  name: '6',
                  children: [
                    {
                      name: dataGrahTree[6].descripcion,
                      size: dataGrahTree[6].total,
                      description: dataGrahTree[6].codigo,
                      color: 2.29,
                    },
                  ],
                  color: -4.27,
                },
                {
                  name: '8',
                  children: [
                    {
                      name: dataGrahTree[8].descripcion,
                      size: dataGrahTree[8].total,
                      description: dataGrahTree[8].codigo,
                      color: 2.29,
                    },
                  ],
                  color: -4.27,
                },
                {
                  name: '9',
                  children: [
                    {
                      name: dataGrahTree[9].descripcion,
                      size: dataGrahTree[9].total,
                      description: dataGrahTree[8].codigo,
                      color: 2.29,
                    },
                  ],
                  color: -4.27,
                },
                {
                  name: dataGrahTree[10].descripcion,
                  children: [
                    {
                      name: dataGrahTree[10].descripcion,
                      size: dataGrahTree[10].total,
                      description: dataGrahTree[10].codigo,
                      color: 5.31,
                    },
                  ],
                  color: -5.27,
                },
                {
                  name: dataGrahTree[11].descripcion,
                  children: [
                    {
                      name: dataGrahTree[11].descripcion,
                      size: dataGrahTree[11].total,
                      description: dataGrahTree[11].codigo,
                      color: 2.29,
                    },
                  ],
                  color: -4.27,
                },
                {
                  name: '8',
                  children: [
                    {
                      name: dataGrahTree[12].descripcion,
                      size: dataGrahTree[12].total,
                      description: dataGrahTree[12].codigo,
                      color: 2.29,
                    },
                  ],
                  color: -4.27,
                },
                {
                  name: '8',
                  children: [
                    {
                      name: dataGrahTree[13].descripcion,
                      size: dataGrahTree[13].total,
                      description: dataGrahTree[13].codigo,
                      color: 2.29,
                    },
                  ],
                  color: -4.27,
                },
                {
                  name: '8',
                  children: [
                    {
                      name: dataGrahTree[14].descripcion,
                      size: dataGrahTree[14].total,
                      description: dataGrahTree[14].codigo,
                      color: 2.29,
                    },
                  ],
                  color: -4.27,
                },
                {
                  name: '8',
                  children: [
                    {
                      name: dataGrahTree[15].descripcion,
                      size: dataGrahTree[15].total,
                      description: dataGrahTree[15].codigo,
                      color: 2.29,
                    },
                  ],
                  color: -4.27,
                },
                {
                  name: '8',
                  children: [
                    {
                      name: dataGrahTree[16].descripcion,
                      size: dataGrahTree[16].total,
                      description: dataGrahTree[16].codigo,
                      color: 2.29,
                    },
                  ],
                  color: -4.27,
                },
                {
                  name: '8',
                  children: [
                    {
                      name: dataGrahTree[17].descripcion,
                      size: dataGrahTree[17].total,
                      description: dataGrahTree[17].codigo,
                      color: 2.29,
                    },
                  ],
                  color: -4.27,
                },
                {
                  name: '8',
                  children: [
                    {
                      name: dataGrahTree[18].descripcion,
                      size: dataGrahTree[18].total,
                      description: dataGrahTree[18].codigo,
                      color: 2.29,
                    },
                  ],
                  color: -4.27,
                },
                {
                  name: '8',
                  children: [
                    {
                      name: dataGrahTree[19].descripcion,
                      size: dataGrahTree[19].total,
                      description: dataGrahTree[19].codigo,
                      color: 2.29,
                    },
                  ],
                  color: -4.27,
                },
                {
                  name: '8',
                  children: [
                    {
                      name: dataGrahTree[20].descripcion,
                      size: dataGrahTree[20].total,
                      description: dataGrahTree[20].codigo,
                      color: 2.29,
                    },
                  ],
                  color: -4.27,
                },
                {
                  name: '8',
                  children: [
                    {
                      name: dataGrahTree[21].descripcion,
                      size: dataGrahTree[21].total,
                      description: dataGrahTree[21].codigo,
                      color: 2.29,
                    },
                  ],
                  color: -4.27,
                },
                {
                  name: '8',
                  children: [
                    {
                      name: dataGrahTree[22].descripcion,
                      size: dataGrahTree[22].total,
                      description: dataGrahTree[22].codigo,
                      color: 2.29,
                    },
                  ],
                  color: -4.27,
                },
                {
                  name: '8',
                  children: [
                    {
                      name: dataGrahTree[23].descripcion,
                      size: dataGrahTree[23].total,
                      description: dataGrahTree[23].codigo,
                      color: 2.29,
                    },
                  ],
                  color: -4.27,
                },
                {
                  name: '8',
                  children: [
                    {
                      name: dataGrahTree[24].descripcion,
                      size: dataGrahTree[24].total,
                      description: dataGrahTree[24].codigo,
                      color: 2.29,
                    },
                  ],
                  color: -4.27,
                },
                {
                  name: '8',
                  children: [
                    {
                      name: dataGrahTree[25].descripcion,
                      size: dataGrahTree[25].total,
                      description: dataGrahTree[25].codigo,
                      color: 2.29,
                    },
                  ],
                  color: -4.27,
                },

              ]
            }
          ]
        }
        break;

      default:
        break;
    }
    let data = {
      name: 'Root',
      children: [
        {
          name: 'Organicos',
          children: [
            {
              // name: 'Organico 0',
              name: dataGrahTree[0].descripcion,
              children: [
                {
                  name: dataGrahTree[0].descripcion,
                  size: dataGrahTree[0].total,
                  description: dataGrahTree[0].codigo,
                  color: 4.29,
                },
              ],
              color: -4.27,
            },
            {
              name: '1',
              children: [
                {
                  name: dataGrahTree[1].descripcion,
                  size: dataGrahTree[1].total,
                  description: dataGrahTree[1].codigo,
                  color: 2.29,
                },
              ],
              color: -4.27,
            },
            {
              name: '2',
              children: [
                {
                  name: dataGrahTree[2].descripcion,
                  size: dataGrahTree[2].total,
                  description: dataGrahTree[2].codigo,
                  color: 2.29,
                },
              ],
              color: -4.27,
            },
            {
              name: '3',
              children: [
                {
                  name: dataGrahTree[3].descripcion,
                  size: dataGrahTree[3].total,
                  description: dataGrahTree[3].codigo,
                  color: 2.29,
                },
              ],
              color: -4.27,
            },
            {
              name: '4',
              children: [
                {
                  name: dataGrahTree[4].descripcion,
                  size: dataGrahTree[4].total,
                  description: dataGrahTree[4].codigo,
                  color: 2.29,
                },
              ],
              color: -4.27,
            },
            {
              name: '5',
              children: [
                {
                  name: dataGrahTree[5].descripcion,
                  size: dataGrahTree[5].total,
                  description: dataGrahTree[5].codigo,
                  color: 2.29,
                },
              ],
              color: -4.27,
            },
            {
              name: '6',
              children: [
                {
                  name: dataGrahTree[6].descripcion,
                  size: dataGrahTree[6].total,
                  description: dataGrahTree[6].codigo,
                  color: 2.29,
                },
              ],
              color: -4.27,
            },
            {
              name: '8',
              children: [
                {
                  name: dataGrahTree[8].descripcion,
                  size: dataGrahTree[8].total,
                  description: dataGrahTree[8].codigo,
                  color: 2.29,
                },
              ],
              color: -4.27,
            },
            {
              name: '9',
              children: [
                {
                  name: dataGrahTree[9].descripcion,
                  size: dataGrahTree[9].total,
                  description: dataGrahTree[8].codigo,
                  color: 2.29,
                },
              ],
              color: -4.27,
            },
            {
              name: dataGrahTree[10].descripcion,
              children: [
                {
                  name: dataGrahTree[10].descripcion,
                  size: dataGrahTree[10].total,
                  description: dataGrahTree[10].codigo,
                  color: 5.31,
                },
              ],
              color: -5.27,
            },
            {
              name: dataGrahTree[11].descripcion,
              children: [
                {
                  name: dataGrahTree[11].descripcion,
                  size: dataGrahTree[11].total,
                  description: dataGrahTree[11].codigo,
                  color: 2.29,
                },
              ],
              color: -4.27,
            },
            {
              name: '8',
              children: [
                {
                  name: dataGrahTree[12].descripcion,
                  size: dataGrahTree[12].total,
                  description: dataGrahTree[12].codigo,
                  color: 2.29,
                },
              ],
              color: -4.27,
            },
            {
              name: '8',
              children: [
                {
                  name: dataGrahTree[13].descripcion,
                  size: dataGrahTree[13].total,
                  description: dataGrahTree[13].codigo,
                  color: 2.29,
                },
              ],
              color: -4.27,
            },
            {
              name: '8',
              children: [
                {
                  name: dataGrahTree[14].descripcion,
                  size: dataGrahTree[14].total,
                  description: dataGrahTree[14].codigo,
                  color: 2.29,
                },
              ],
              color: -4.27,
            },
            {
              name: '8',
              children: [
                {
                  name: dataGrahTree[15].descripcion,
                  size: dataGrahTree[15].total,
                  description: dataGrahTree[15].codigo,
                  color: 2.29,
                },
              ],
              color: -4.27,
            },
            {
              name: '8',
              children: [
                {
                  name: dataGrahTree[16].descripcion,
                  size: dataGrahTree[16].total,
                  description: dataGrahTree[16].codigo,
                  color: 2.29,
                },
              ],
              color: -4.27,
            },
            {
              name: '8',
              children: [
                {
                  name: dataGrahTree[17].descripcion,
                  size: dataGrahTree[17].total,
                  description: dataGrahTree[17].codigo,
                  color: 2.29,
                },
              ],
              color: -4.27,
            },
            {
              name: '8',
              children: [
                {
                  name: dataGrahTree[18].descripcion,
                  size: dataGrahTree[18].total,
                  description: dataGrahTree[18].codigo,
                  color: 2.29,
                },
              ],
              color: -4.27,
            },
            {
              name: '8',
              children: [
                {
                  name: dataGrahTree[19].descripcion,
                  size: dataGrahTree[19].total,
                  description: dataGrahTree[19].codigo,
                  color: 2.29,
                },
              ],
              color: -4.27,
            },
            {
              name: '8',
              children: [
                {
                  name: dataGrahTree[20].descripcion,
                  size: dataGrahTree[20].total,
                  description: dataGrahTree[20].codigo,
                  color: 2.29,
                },
              ],
              color: -4.27,
            },
            {
              name: '8',
              children: [
                {
                  name: dataGrahTree[21].descripcion,
                  size: dataGrahTree[21].total,
                  description: dataGrahTree[21].codigo,
                  color: 2.29,
                },
              ],
              color: -4.27,
            },
            {
              name: '8',
              children: [
                {
                  name: dataGrahTree[22].descripcion,
                  size: dataGrahTree[22].total,
                  description: dataGrahTree[22].codigo,
                  color: 2.29,
                },
              ],
              color: -4.27,
            },
            {
              name: '8',
              children: [
                {
                  name: dataGrahTree[23].descripcion,
                  size: dataGrahTree[23].total,
                  description: dataGrahTree[23].codigo,
                  color: 2.29,
                },
              ],
              color: -4.27,
            },
            {
              name: '8',
              children: [
                {
                  name: dataGrahTree[24].descripcion,
                  size: dataGrahTree[24].total,
                  description: dataGrahTree[24].codigo,
                  color: 2.29,
                },
              ],
              color: -4.27,
            },
            {
              name: '8',
              children: [
                {
                  name: dataGrahTree[25].descripcion,
                  size: dataGrahTree[25].total,
                  description: dataGrahTree[25].codigo,
                  color: 2.29,
                },
              ],
              color: -4.27,
            },

          ]
        }
      ]
    }

    this.options = {
      type: 'hierarchy',
      data,
      series: [
        {
          type: 'treemap',
          labelKey: 'name',
          sizeKey: 'size',
          colorKey: 'color',
          tooltip: {
            renderer: (params) => {
              return {
                content: `<b>Change</b>: ${params.datum.colorValue.toFixed(
                  2
                )}%`,
              };
            },
          },
        },
      ],
      title: {
        text: `Donde van mis impuestos`,
      },
      subtitle: {
        text:
          'Por orgánico',
      },
    };
  }
}
