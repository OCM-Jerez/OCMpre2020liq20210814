import { Injectable } from '@angular/core';

// https://stackoverflow.com/questions/54476526/how-to-reload-the-header-component-when-the-variable-value-changes-via-service/54476754
import { BehaviorSubject, Subject } from 'rxjs';
import { AVALAIBLE_YEARS } from '../../assets/data/avalaible-years-data';

@Injectable()
export class AvalaibleYearsService {
  public subject$ = new BehaviorSubject<string>('2020');
  private year = '2020'
  public setAvalaibleYear(yearSelected: string): void {
    this.year = yearSelected;
    this.subject$.next(yearSelected);
  }

  public getAvalaibleYear() {
    return this.subject$.asObservable();
  }

  // Seleciona datos del año seleccionado en los radioButtons
  async getDataJson(isGas: boolean) {
    // throw new Error('Not implemented');
    const data = await import(`../../assets/data/${this.year}Liq${isGas ? 'Gas' : 'Ing'}.json`);
    // const result: any = (data as any).default;
    return data.default;
  }

  // Seleciona datos del año que se pasa como parametro
  async getYearDataJson(year: string, isGas: boolean) {
    const data = await import(`../../assets/data/${year}Liq${isGas ? 'Gas' : 'Ing'}.json`);
    return data.default;
  }

  getCurrentYear(): string {
    return this.year
  }

  // Selecciona datos de ingresos.
  async getDataIng(year: string, result: any[], Cod: string, Des: string, derechos: string, isGas: boolean) {
    const data = await this.getYearDataJson(year, isGas).then(data => {
      Object.entries(data).reduce((acumulator, currentValue) => {
        result.push({
          [Cod]: currentValue[1][Cod],
          [Des]: currentValue[1][Des],
          [derechos]: currentValue[1]['DerechosReconocidosNetos'],
        });
        return acumulator;
      }, []);
    })
  }

  // Selecciona datos gastos de un año
  async getDataYearGas(year: string, cla: string) {
    const result = [];
    const cod = `Cod${cla}`;
    const des = `Des${cla}`;
    const Iniciales = `Iniciales${year}`;
    const Modificaciones = `Modificaciones${year}`;
    const Definitivas = `Definitivas${year}`;
    const GastosComprometidos = `GastosComprometidos${year}`;
    const ObligacionesReconocidasNetas = `ObligacionesReconocidasNetas${year}`;
    const Pagos = `Pagos${year}`;
    const ObligacionesPendientePago = `ObligacionesPendientePago${year}`;
    const RemanenteCredito = `RemanenteCredito${year}`;

    const data = await this.getYearDataJson(year, true).then(data => {
      Object.entries(data).forEach((currentValue) => {
        result.push({
          [cod]: currentValue[1][cod],
          [des]: currentValue[1][des],
          [Iniciales]: currentValue[1]['Iniciales'],
          [Modificaciones]: currentValue[1]['Modificaciones'],
          [Definitivas]: currentValue[1]['Definitivas'],
          [GastosComprometidos]: currentValue[1]['GastosComprometidos'],
          [ObligacionesReconocidasNetas]: currentValue[1]['ObligacionesReconocidasNetas'],
          [Pagos]: currentValue[1]['Pagos'],
          [ObligacionesPendientePago]: currentValue[1]['ObligacionesPendientePago'],
          [RemanenteCredito]: currentValue[1]['RemanenteCredito'],
        });
      });
    })
    return result;
  }

  // Itera por cada uno de los años disponibles
  async getDataAllYear(cla: string): Promise<any[]> {
    let rowData = [];
    await asynForEach(AVALAIBLE_YEARS, async (year: string) => {
      const dataGas = await this.getDataYearGas(year, cla);
      rowData = rowData.concat(...dataGas);
    });
    return rowData;
  }

}
async function asynForEach(array: Array<String>, callback: Function) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}