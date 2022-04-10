import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { AVALAIBLE_YEARS } from '../../assets/data/avalaible-years-data';

import gastosProgramaAreas from '../../assets/data/gastosProgramaAreas.json';
import gastosProgramaPoliticas from '../../assets/data/gastosProgramaPoliticas.json';
import gastosProgramaGruposProgramas from '../../assets/data/gastosProgramaGruposProgramas.json';
import gastosEconomicaArticulos from '../../assets/data/gastosEconomicaArticulos.json';
import gastosEconomicaConceptos from '../../assets/data/gastosEconomicaConceptos.json';

import { IDataGasto } from '../commons/interfaces/dataGasto.interface';
import { asynForEach } from '../commons/util/util';

import { AvalaibleYearsService } from '../services/avalaibleYears.service';

@Injectable({
  providedIn: 'root'
})
export class PrepareDataGastosService {
  // public subject$ = new BehaviorSubject<string>('2021');
  // private year = '2021'
  private dataGasto: IDataGasto = <IDataGasto>{};
  // public yearsSelected: number[] = [];
  // public setAvalaibleYear(yearSelected: number[]): void {
  //   this.yearsSelected = yearSelected;
  //   const message = yearSelected.join(',');
  //   this.subject$.next(message);
  // }

  constructor(
    private avalaibleYearsService: AvalaibleYearsService,
  ) { }

  // public getAvalaibleYear() {
  //   return this.subject$.asObservable();
  // }

  // Seleciona datos del año seleccionado en los radioButtons
  // async getDataJson(isGas: boolean) {
  //   const data = await import(`../../assets/data/${this.year}LiqGas'.json`);
  //   return data.default;
  // }

  // Seleciona datos del año que se pasa como parametro
  async getYearDataJson(year: number) {
    const data = await import(`../../assets/data/${year}LiqGas.json`);
    return data.default;
  }

  // getCurrentYear(): string {
  //   return this.year
  // }

  // getYearsSelected(): number[] {
  //   return this.yearsSelected;
  // }

  // Itera por cada uno de los años disponibles para gastos
  async getDataAllYear(cla: string, isGraph?: boolean, sufijo?: string): Promise<any[]> {
    let rowData = [];
    const years = isGraph ? AVALAIBLE_YEARS : this.avalaibleYearsService.getYearsSelected();

    await asynForEach(years, async (year: number) => {
      const dataGas = await this.getDataYear(year, cla, sufijo);
      rowData = rowData.concat(...dataGas);
    });
    return rowData;
  }

  // Selecciona datos gastos de un año
  async getDataYear(year: number, cla: string, sufijo: string) {
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

    await this.getYearDataJson(year).then(data => {
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

    switch (cla) {
      case 'gastosProgramaAreas':
        const byArea = [];
        result.map(item => {
          item.CodPro = Math.floor((item.CodPro / 10000));
          byArea.push(item);
        });

        byArea.map(item => {
          item.DesPro = gastosProgramaAreas.find((area) => area.codigo === item.CodPro).descripcion;
        });
        break;
      case 'gastosProgramaPoliticas':
        const byPolitica = [];
        result.map(item => {
          item.CodPro = Math.floor((item.CodPro / 1000));
          byPolitica.push(item);
        });

        byPolitica.map(item => {
          item.DesPro = gastosProgramaPoliticas.find((politica) => politica.codigo === item.CodPro).descripcion;
        });
        break;
      case 'gastosProgramaGrupos':
        const byGrupo = [];
        result.map(item => {
          item.CodPro = Math.floor((item.CodPro / 100));
          byGrupo.push(item);
        });

        byGrupo.map(item => {
          // console.log(item);
          item.DesPro = gastosProgramaGruposProgramas.find((grupo) => grupo.codigo === item.CodPro).descripcion;
        });
        break;

      case 'gastosEconomicaArticulos':
        const byArticulo = [];
        result.map(item => {
          item.CodEco = Math.floor((item.CodEco / 1000));
          byArticulo.push(item);
        });

        byArticulo.map(item => {
          item.DesEco = gastosEconomicaArticulos.find((articulo) => articulo.codigo === item.CodEco).descripcion;
        });
        break;
      case 'gastosEconomicaConceptos':
        const byConcepto = [];
        result.map(item => {
          item.CodEco = Math.floor((item.CodEco / 100));
          byConcepto.push(item);
        });

        byConcepto.map(item => {
          item.DesEco = gastosEconomicaConceptos.find((concepto) => concepto.codigo === item.CodEco).descripcion;
        });
        break;
    }
    return result;
  }

}
