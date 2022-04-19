import { Injectable } from '@angular/core';

import ingresosEconomicaArticulos from '../../assets/data/ingresosEconomicaArticulos.json';
import ingresosEconomicaConceptos from '../../assets/data/ingresosEconomicaConceptos.json';

import { AvalaibleYearsService } from '../services/avalaibleYears.service';
import { IDataIngreso } from '../commons/interfaces/dataIngreso.interface';
import { asynForEach } from '../commons/util/util';

@Injectable({
  providedIn: 'root'
})
export class PrepareDataIngresosService {
  private dataIngreso: IDataIngreso = <IDataIngreso>{};

  constructor(
    private avalaibleYearsService: AvalaibleYearsService,
  ) { }

  // Itera por cada uno de los años disponibles para ingresos
  async getDataAllYear(cla: string, sufijo?: string): Promise<any[]> {
    let rowData = [];
    const years = this.avalaibleYearsService.getYearsSelected();

    await asynForEach(years, async (year: number) => {
      const dataIng = await this.getDataYear(year, cla, sufijo);
      rowData = rowData.concat(...dataIng);
    });
    return rowData;
  }

  // Selecciona datos ingresos de un año
  async getDataYear(year: number, cla: string, sufijo: string) {
    const result = [];
    this.dataIngreso = {
      cod: `Cod${sufijo}`,
      des: `Des${sufijo}`,
      Iniciales: `Iniciales${year}`,
      Modificaciones: `Modificaciones${year}`,
      Definitivas: `Definitivas${year}`,
      DerechosReconocidos: `DerechosReconocidos${year}`,
      DerechosAnulados: `DerechosAnulados${year}`,
      DerechosCancelados: `DerechosCancelados${year}`,
      DerechosReconocidosNetos: `DerechosReconocidosNetos${year}`,
      RecaudacionNeta: `RecaudacionNeta${year}`,
      DerechosPendienteCobro: `DerechosPendienteCobro${year}`,
      DiferenciaPrevision: `DiferenciaPrevision${year}`,
    };

    await this.getYearDataJson(year).then(data => {
      Object.entries(data).forEach((currentValue) => {
        result.push({
          [this.dataIngreso.cod]: currentValue[1][this.dataIngreso.cod],
          [this.dataIngreso.des]: currentValue[1][this.dataIngreso.des],
          [this.dataIngreso.Iniciales]: currentValue[1]['Iniciales'],
          [this.dataIngreso.Modificaciones]: currentValue[1]['Modificaciones'],
          [this.dataIngreso.Definitivas]: currentValue[1]['Definitivas'],
          [this.dataIngreso.DerechosReconocidos]: currentValue[1]['DerechosReconocidos'],
          [this.dataIngreso.DerechosAnulados]: currentValue[1]['DerechosAnulados'],
          [this.dataIngreso.DerechosCancelados]: currentValue[1]['DerechosCancelados'],
          [this.dataIngreso.DerechosReconocidosNetos]: currentValue[1]['DerechosReconocidosNetos'],
          [this.dataIngreso.RecaudacionNeta]: currentValue[1]['RecaudacionNeta'],
          [this.dataIngreso.DerechosPendienteCobro]: currentValue[1]['DerechosPendienteCobro'],
          [this.dataIngreso.DiferenciaPrevision]: currentValue[1]['DiferenciaPrevision'],
        });
      });
    })

    switch (cla) {
      case 'ingresosEconomicaArticulos':
        result.map(item => {
          item.CodEco = Math.floor((item.CodEco / 1000));
          item.DesEco = ingresosEconomicaArticulos.find((articulo) => articulo.codigo === item.CodEco).descripcion;
        });
        break;
      case 'ingresosEconomicaConceptos':
        result.map(item => {
          item.CodEco = Math.floor((item.CodEco / 100));
          item.DesEco = ingresosEconomicaConceptos.find((concepto) => concepto.codigo === item.CodEco).descripcion;
        });
        break;
    }
    return result;
  }

  // Seleciona datos del año que se pasa como parametro
  async getYearDataJson(year: number) {
    const data = await import(`../../assets/data/${year}LiqIng.json`);
    return data.default;
  }

}

