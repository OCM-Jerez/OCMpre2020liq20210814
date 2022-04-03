import { Injectable } from '@angular/core';

// https://stackoverflow.com/questions/54476526/how-to-reload-the-header-component-when-the-variable-value-changes-via-service/54476754
import { BehaviorSubject } from 'rxjs';
import { AVALAIBLE_YEARS } from '../../assets/data/avalaible-years-data';
import gastosProgramaAreas from '../../assets/data/gastosProgramaAreas.json';
import { IDataIngreso } from '../commons/interfaces/dataIngreso.interface';
import { IDataGasto } from '../commons/interfaces/dataGasto.interface';

@Injectable()
export class AvalaibleYearsService {
  public subject$ = new BehaviorSubject<string>('2021');
  private year = '2021'
  private dataIngreso: IDataIngreso = <IDataIngreso>{};
  private dataGasto: IDataGasto = <IDataGasto>{};
  private yearsSelected: number[] = [];
  public setAvalaibleYear(yearSelected: number[]): void {
    this.yearsSelected = yearSelected;
    // const minor = Math.min(...yearSelected);
    // const max = Math.max(...yearSelected);
    // const message = minor === max ? `${minor}` : `${minor} A ${max} `
    // this.year = yearSelected;
    // const message = new Intl.ListFormat('es', { type: 'conjunction' }).format(yearSelected)
    const message = yearSelected.join(',');
    this.subject$.next(message);
  }

  public getAvalaibleYear() {
    return this.subject$.asObservable();
  }

  // Seleciona datos del año seleccionado en los radioButtons
  async getDataJson(isGas: boolean) {
    const data = await import(`../../assets/data/${this.year}Liq${isGas ? 'Gas' : 'Ing'}.json`);
    return data.default;
  }

  // Seleciona datos del año que se pasa como parametro
  async getYearDataJson(year: number, isGas: boolean) {
    const data = await import(`../../assets/data/${year}Liq${isGas ? 'Gas' : 'Ing'}.json`);
    return data.default;
  }

  getCurrentYear(): string {
    return this.year
  }

  getYearsSelected(): number[] {
    return this.yearsSelected;
  }

  // Itera por cada uno de los años disponibles para ingresos
  async getDataAllYearIng(cla: string, isGraph?: boolean): Promise<any[]> {
    let rowData = [];
    const years = isGraph ? AVALAIBLE_YEARS : this.yearsSelected;
    // await asynForEach(this.yearsSelected, async (year: number) => {
    await asynForEach(years, async (year: number) => {
      const dataIng = await this.getDataYearIng(year, cla);
      rowData = rowData.concat(...dataIng);
    });
    return rowData;
  }

  // Selecciona datos ingresos de un año
  async getDataYearIng(year: number, cla: string) {
    const result = [];

    this.dataIngreso = {
      cod: `Cod${cla}`,
      des: `Des${cla}`,
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

    await this.getYearDataJson(year, false).then(data => {
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
    // console.log({ result });
    return result;
  }

  // Itera por cada uno de los años disponibles para gastos
  async getDataAllYear(cla: string, isGraph?: boolean, sufijo?: string): Promise<any[]> {
    let rowData = [];
    const years = isGraph ? AVALAIBLE_YEARS : this.yearsSelected;
    // if (cla === 'gastosProgramaAreas') {
    //   cla = 'Pro';
    // }

    await asynForEach(years, async (year: number) => {
      const dataGas = await this.getDataYearGas(year, cla, sufijo);
      rowData = rowData.concat(...dataGas);
    });
    return rowData;
  }

  // Selecciona datos gastos de un año
  async getDataYearGas(year: number, cla: string, sufijo: string) {
    const result = [];

    this.dataGasto = {
      cod: `Cod${sufijo}`,
      des: `Des${sufijo}`,
      Iniciales: `Iniciales${year}`,
      Modificaciones: `Modificaciones${year}`,
      Definitivas: `Definitivas${year}`,
      GastosComprometidos: `GastosComprometidos${year}`,
      ObligacionesReconocidasNetas: `ObligacionesReconocidasNetas${year}`,
      Pagos: `Pagos${year}`,
      ObligacionesPendientePago: `ObligacionesPendientePago${year}`,
      RemanenteCredito: `RemanenteCredito${year}`,
    }

    await this.getYearDataJson(year, true).then(data => {
      Object.entries(data).forEach((currentValue) => {
        result.push({
          [this.dataGasto.cod]: currentValue[1][this.dataGasto.cod],
          [this.dataGasto.des]: currentValue[1][this.dataGasto.des],
          [this.dataGasto.Iniciales]: currentValue[1]['Iniciales'],
          [this.dataGasto.Modificaciones]: currentValue[1]['Modificaciones'],
          [this.dataGasto.Definitivas]: currentValue[1]['Definitivas'],
          [this.dataGasto.GastosComprometidos]: currentValue[1]['GastosComprometidos'],
          [this.dataGasto.ObligacionesReconocidasNetas]: currentValue[1]['ObligacionesReconocidasNetas'],
          [this.dataGasto.Pagos]: currentValue[1]['Pagos'],
          [this.dataGasto.ObligacionesPendientePago]: currentValue[1]['ObligacionesPendientePago'],
          [this.dataGasto.RemanenteCredito]: currentValue[1]['RemanenteCredito'],
        });
      });
    })

    console.log(cla);

    if (cla === 'gastosProgramaAreas') {
      const byArea = [];
      result.map(item => {
        item.CodPro = Math.floor((item.CodPro / 10000));
        byArea.push(item);
      });

      byArea.map(item => {
        item.DesPro = gastosProgramaAreas.find((area) => area.codigo === item.CodPro).descripcion;
      });
    }


    return result;
  }

}

async function asynForEach(array: Array<number>, callback: Function) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}