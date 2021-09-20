import { Injectable } from '@angular/core';

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

  async getDataJson(isGas: boolean) {
    // throw new Error('Not implemented');
    const data = await import(`../../assets/data/${this.year}Liq${isGas ? 'Gas' : 'Ing'}.json`);
    // const result: any = (data as any).default;
    return data.default;
  }

  async getYearDataJson(year: string, isGas: boolean) {
    const data = await import(`../../assets/data/${year}Liq${isGas ? 'Gas' : 'Ing'}.json`);
    return data.default;
  }

  getCurrentYear(): string {
    return this.year
  }

  async getData(year: string, result: any[], Cod: string, Des: string, derechos: string, isGas: boolean) {
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

  async getDataGas(year: string, result: any[], Cod: string, Des: string, obligaciones: string, opa: string, isGas: boolean) {
    const data = await this.getYearDataJson(year, isGas).then(data => {
      Object.entries(data).reduce((acumulator, currentValue) => {
        result.push({
          [Cod]: currentValue[1][Cod],
          [Des]: currentValue[1][Des],
          [obligaciones]: currentValue[1]['ObligacionesReconocidasNetas'],
          [opa]: currentValue[1]['ObligacionesPendientePago'],
        });
        return acumulator;
      }, []);
    })
  }

}
