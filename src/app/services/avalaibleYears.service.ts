import { Injectable } from '@angular/core';

// https://stackoverflow.com/questions/54476526/how-to-reload-the-header-component-when-the-variable-value-changes-via-service/54476754
import { BehaviorSubject } from 'rxjs';
// import { AVALAIBLE_YEARS } from '../../assets/data/avalaible-years-data';

// import ingresosEconomicaArticulos from '../../assets/data/ingresosEconomicaArticulos.json';
// import ingresosEconomicaConceptos from '../../assets/data/ingresosEconomicaConceptos.json';

// import gastosProgramaAreas from '../../assets/data/gastosProgramaAreas.json';
// import gastosProgramaPoliticas from '../../assets/data/gastosProgramaPoliticas.json';
// import gastosProgramaGruposProgramas from '../../assets/data/gastosProgramaGruposProgramas.json';
// import gastosEconomicaArticulos from '../../assets/data/gastosEconomicaArticulos.json';
// import gastosEconomicaConceptos from '../../assets/data/gastosEconomicaConceptos.json';

// import { IDataIngreso } from '../commons/interfaces/dataIngreso.interface';
// import { IDataGasto } from '../commons/interfaces/dataGasto.interface';

@Injectable()
export class AvalaibleYearsService {
  public subject$ = new BehaviorSubject<string>('2021');
  // private year = '2021'
  // private dataIngreso: IDataIngreso = <IDataIngreso>{};
  // private dataGasto: IDataGasto = <IDataGasto>{};
  public yearsSelected: number[] = [];

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

  // Devuelve el array con los años seleccionados
  getYearsSelected(): number[] {
    return this.yearsSelected;
  }

  // Seleciona datos del año seleccionado en los radioButtons
  // async getDataJson(isGas: boolean) {
  //   const data = await import(`../../assets/data/${this.year}Liq${isGas ? 'Gas' : 'Ing'}.json`);
  //   return data.default;
  // }

  // Seleciona datos del año que se pasa como parametro
  // async getYearDataJson(year: number, isGas: boolean) {
  //   const data = await import(`../../assets/data/${year}Liq${isGas ? 'Gas' : 'Ing'}.json`);
  //   return data.default;
  // }

  // getCurrentYear(): string {
  //   return this.year
  // }



  // Itera por cada uno de los años disponibles para ingresos
  // async getDataAllYearIng(cla: string, isGraph?: boolean, sufijo?: string): Promise<any[]> {
  //   let rowData = [];
  //   const years = isGraph ? AVALAIBLE_YEARS : this.yearsSelected;

  //   await asynForEach(years, async (year: number) => {
  //     const dataIng = await this.getDataYearIng(year, cla, sufijo);
  //     rowData = rowData.concat(...dataIng);
  //   });
  //   return rowData;
  // }

  // Selecciona datos ingresos de un año
  // async getDataYearIng(year: number, cla: string, sufijo: string) {
  //   const result = [];
  //   this.dataIngreso = {
  //     cod: `Cod${sufijo}`,
  //     des: `Des${sufijo}`,
  //     Iniciales: `Iniciales${year}`,
  //     Modificaciones: `Modificaciones${year}`,
  //     Definitivas: `Definitivas${year}`,
  //     DerechosReconocidos: `DerechosReconocidos${year}`,
  //     DerechosAnulados: `DerechosAnulados${year}`,
  //     DerechosCancelados: `DerechosCancelados${year}`,
  //     DerechosReconocidosNetos: `DerechosReconocidosNetos${year}`,
  //     RecaudacionNeta: `RecaudacionNeta${year}`,
  //     DerechosPendienteCobro: `DerechosPendienteCobro${year}`,
  //     DiferenciaPrevision: `DiferenciaPrevision${year}`,
  //   };

  //   await this.getYearDataJson(year, false).then(data => {
  //     Object.entries(data).forEach((currentValue) => {
  //       result.push({
  //         [this.dataIngreso.cod]: currentValue[1][this.dataIngreso.cod],
  //         [this.dataIngreso.des]: currentValue[1][this.dataIngreso.des],
  //         [this.dataIngreso.Iniciales]: currentValue[1]['Iniciales'],
  //         [this.dataIngreso.Modificaciones]: currentValue[1]['Modificaciones'],
  //         [this.dataIngreso.Definitivas]: currentValue[1]['Definitivas'],
  //         [this.dataIngreso.DerechosReconocidos]: currentValue[1]['DerechosReconocidos'],
  //         [this.dataIngreso.DerechosAnulados]: currentValue[1]['DerechosAnulados'],
  //         [this.dataIngreso.DerechosCancelados]: currentValue[1]['DerechosCancelados'],
  //         [this.dataIngreso.DerechosReconocidosNetos]: currentValue[1]['DerechosReconocidosNetos'],
  //         [this.dataIngreso.RecaudacionNeta]: currentValue[1]['RecaudacionNeta'],
  //         [this.dataIngreso.DerechosPendienteCobro]: currentValue[1]['DerechosPendienteCobro'],
  //         [this.dataIngreso.DiferenciaPrevision]: currentValue[1]['DiferenciaPrevision'],
  //       });
  //     });
  //   })

  //   switch (cla) {
  //     case 'ingresosEconomicaArticulos':
  //       const byArticulo = [];
  //       result.map(item => {
  //         item.CodEco = Math.floor((item.CodEco / 1000));
  //         byArticulo.push(item);
  //       });

  //       byArticulo.map(item => {
  //         item.DesEco = ingresosEconomicaArticulos.find((articulo) => articulo.codigo === item.CodEco).descripcion;
  //       });
  //       break;
  //     case 'ingresosEconomicaConceptos':
  //       const byConcepto = [];
  //       result.map(item => {

  //         item.CodEco = Math.floor((item.CodEco / 100));
  //         byConcepto.push(item);
  //       });

  //       byConcepto.map(item => {
  //         // console.log(item);
  //         item.DesEco = ingresosEconomicaConceptos.find((concepto) => concepto.codigo === item.CodEco).descripcion;
  //       });
  //       break;
  //   }

  //   return result;
  // }

  // Itera por cada uno de los años disponibles para gastos
  // async getDataAllYear(cla: string, isGraph?: boolean, sufijo?: string): Promise<any[]> {
  //   let rowData = [];
  //   const years = isGraph ? AVALAIBLE_YEARS : this.yearsSelected;

  //   await asynForEach(years, async (year: number) => {
  //     const dataGas = await this.getDataYearGas(year, cla, sufijo);
  //     rowData = rowData.concat(...dataGas);
  //   });
  //   return rowData;
  // }

  // // Selecciona datos gastos de un año
  // async getDataYearGas(year: number, cla: string, sufijo: string) {
  //   const result = [];

  //   this.dataGasto = {
  //     cod: `Cod${sufijo}`,
  //     des: `Des${sufijo}`,
  //     Iniciales: `Iniciales${year}`,
  //     Modificaciones: `Modificaciones${year}`,
  //     Definitivas: `Definitivas${year}`,
  //     GastosComprometidos: `GastosComprometidos${year}`,
  //     ObligacionesReconocidasNetas: `ObligacionesReconocidasNetas${year}`,
  //     Pagos: `Pagos${year}`,
  //     ObligacionesPendientePago: `ObligacionesPendientePago${year}`,
  //     RemanenteCredito: `RemanenteCredito${year}`,
  //   }

  //   await this.getYearDataJson(year, true).then(data => {
  //     Object.entries(data).forEach((currentValue) => {
  //       result.push({
  //         [this.dataGasto.cod]: currentValue[1][this.dataGasto.cod],
  //         [this.dataGasto.des]: currentValue[1][this.dataGasto.des],
  //         [this.dataGasto.Iniciales]: currentValue[1]['Iniciales'],
  //         [this.dataGasto.Modificaciones]: currentValue[1]['Modificaciones'],
  //         [this.dataGasto.Definitivas]: currentValue[1]['Definitivas'],
  //         [this.dataGasto.GastosComprometidos]: currentValue[1]['GastosComprometidos'],
  //         [this.dataGasto.ObligacionesReconocidasNetas]: currentValue[1]['ObligacionesReconocidasNetas'],
  //         [this.dataGasto.Pagos]: currentValue[1]['Pagos'],
  //         [this.dataGasto.ObligacionesPendientePago]: currentValue[1]['ObligacionesPendientePago'],
  //         [this.dataGasto.RemanenteCredito]: currentValue[1]['RemanenteCredito'],
  //       });
  //     });
  //   })

  //   switch (cla) {
  //     case 'gastosProgramaAreas':
  //       const byArea = [];
  //       result.map(item => {
  //         item.CodPro = Math.floor((item.CodPro / 10000));
  //         byArea.push(item);
  //       });

  //       byArea.map(item => {
  //         item.DesPro = gastosProgramaAreas.find((area) => area.codigo === item.CodPro).descripcion;
  //       });
  //       break;
  //     case 'gastosProgramaPoliticas':
  //       const byPolitica = [];
  //       result.map(item => {
  //         item.CodPro = Math.floor((item.CodPro / 1000));
  //         byPolitica.push(item);
  //       });

  //       byPolitica.map(item => {
  //         item.DesPro = gastosProgramaPoliticas.find((politica) => politica.codigo === item.CodPro).descripcion;
  //       });
  //       break;
  //     case 'gastosProgramaGrupos':
  //       const byGrupo = [];
  //       result.map(item => {
  //         item.CodPro = Math.floor((item.CodPro / 100));
  //         byGrupo.push(item);
  //       });

  //       byGrupo.map(item => {
  //         // console.log(item);
  //         item.DesPro = gastosProgramaGruposProgramas.find((grupo) => grupo.codigo === item.CodPro).descripcion;
  //       });
  //       break;

  //     case 'gastosEconomicaArticulos':
  //       const byArticulo = [];
  //       result.map(item => {
  //         item.CodEco = Math.floor((item.CodEco / 1000));
  //         byArticulo.push(item);
  //       });

  //       byArticulo.map(item => {
  //         item.DesEco = gastosEconomicaArticulos.find((articulo) => articulo.codigo === item.CodEco).descripcion;
  //       });
  //       break;
  //     case 'gastosEconomicaConceptos':
  //       const byConcepto = [];
  //       result.map(item => {
  //         item.CodEco = Math.floor((item.CodEco / 100));
  //         byConcepto.push(item);
  //       });

  //       byConcepto.map(item => {
  //         item.DesEco = gastosEconomicaConceptos.find((concepto) => concepto.codigo === item.CodEco).descripcion;
  //       });
  //       break;
  //   }
  //   return result;
  // }

}

// async function asynForEach(array: Array<number>, callback: Function) {
//   for (let index = 0; index < array.length; index++) {
//     await callback(array[index], index, array);
//   }
// }