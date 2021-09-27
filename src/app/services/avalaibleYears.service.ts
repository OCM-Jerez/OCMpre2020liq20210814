import { Injectable } from '@angular/core';
import { AVALAIBLE_YEARS } from '../avalaible-years-data'
import { DatoGasto } from '../models/datoGasto';


// https://stackoverflow.com/questions/54476526/how-to-reload-the-header-component-when-the-variable-value-changes-via-service/54476754
import { BehaviorSubject, Subject } from 'rxjs';

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

  // Seleciona datos del año seleccionado en los radioButtons.
  async getDataJson(isGas: boolean) {
    // throw new Error('Not implemented');
    const data = await import(`../../assets/data/${this.year}Liq${isGas ? 'Gas' : 'Ing'}.json`);
    // const result: any = (data as any).default;
    return data.default;
  }

  // Seleciona datos del año que se pasa como parametro.
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

  // Selecciona datos gastos.
  async getDataGas(year: string, cla: string): Promise<DatoGasto[]> {
    const result = [];
    const cod = `Cod${cla}`;
    const des = `Des${cla}`;
    const obligaciones = `ObligacionesReconocidasNetas${year}`;
    const opa = `OPA${year}`;
    const data = await this.getYearDataJson(year, true).then(data => {
      Object.entries(data).forEach((currentValue) => {
        result.push(new DatoGasto(currentValue[1][cod],
          currentValue[1][des],
          currentValue[1]['ObligacionesReconocidasNetas'],
          currentValue[1]['ObligacionesPendientePago'],
          year));
      });
    })
    return result;
  }

  async getDataYear(cla: string): Promise<DatoGasto[]> {
    let rowData = [];
    await asynForEach(AVALAIBLE_YEARS, async (year: string) => {
      const dataGas = await this.getDataGas(year, cla);
      rowData = rowData.concat(...dataGas);
    });
    console.log(rowData);
    return rowData;
  }

}
async function asynForEach(array: Array<String>, callback: Function) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}