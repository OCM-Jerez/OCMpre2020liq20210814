import { Injectable } from '@angular/core';
import { Location } from "@angular/common";

import { DataStoreService } from './dataStore.service';
import ingresosEconomicaCapitulos from '../../assets/data/ingresosEconomicaCapitulos.json';
import ingresosEconomicaArticulos from '../../assets/data/ingresosEconomicaArticulos.json';
import ingresosEconomicaConceptos from '../../assets/data/ingresosEconomicaConceptos.json';
import ingresosEconomicaEconomicos from '../../assets/data/ingresosEconomicaEconomicos.json';

import gastosOrganicaOrganicos from '../../assets/data/gastosOrganicaOrganicos.json';

import gastosProgramaAreas from '../../assets/data/gastosProgramaAreas.json';
import gastosProgramaPoliticas from '../../assets/data/gastosProgramaPoliticas.json';
import gastosProgramaGrupos from '../../assets/data/gastosProgramaGruposProgramas.json';
import gastosProgramaProgramas from '../../assets/data/gastosProgramaProgramas.json';

import gastosEconomicaCapitulos from '../../assets/data/gastosEconomicaCapitulos.json';
import gastosEconomicaArticulos from '../../assets/data/gastosEconomicaArticulos.json';
import gastosEconomicaConceptos from '../../assets/data/gastosEconomicaConceptos.json';
import gastosEconomicaEconomicos from '../../assets/data/gastosEconomicaEconomicos.json';

import { AvalaibleYearsService } from './avalaibleYears.service';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class PrepareDataGraphTreeService {
  private _dataGraphTree: any[] = [];
  constructor(
    private _dataStoreService: DataStoreService,
    private _avalaibleYearsService: AvalaibleYearsService,
    private _alertService: AlertService,
    private location: Location,
  ) { }

  async prepareDataGraphTree(rowData) {

    const years = this._avalaibleYearsService.getYearsSelected();
    if (years.length > 1) {
      this._alertService.showAlert('Hay más de un año seleccionado');
      this._dataStoreService.dataGraphTree = [];
      this.location.back();
    } else {
      const tipoClasificacion = this._dataStoreService.getDataTable.clasificationType;
      // console.log('tipoClasificacion', tipoClasificacion);
      // console.log('rowData', rowData);
      let sumDefinitivas = 0;
      switch (tipoClasificacion) {

        case 'ingresosEconomicaCapitulos':
          this._dataGraphTree = ingresosEconomicaCapitulos.map(item => {
            const dataLastYear = rowData.filter(x => x.CodCap == item.codigo);
            const sumDefinitivas = dataLastYear.filter((item) => item[`Definitivas${years[0]}`]).reduce((prev, current) => prev + current[`Definitivas${years[0]}`], 0);
            return { ...item, total: sumDefinitivas }
          })
          // console.log(this._dataGraphTree);
          this._dataStoreService.dataGraphTree = this._dataGraphTree;
          break;
        case 'ingresosEconomicaArticulos':
          this._dataGraphTree = ingresosEconomicaArticulos.map(item => {
            const dataLastYear = rowData.filter(x => x.CodEco == item.codigo);
            const sumDefinitivas = dataLastYear.filter((item) => item[`Definitivas${years[0]}`]).reduce((prev, current) => prev + current[`Definitivas${years[0]}`], 0);
            return { ...item, total: sumDefinitivas }
          })
          this._dataStoreService.dataGraphTree = this._dataGraphTree;
          break;
        case 'ingresosEconomicaConceptos':
          this._dataGraphTree = ingresosEconomicaConceptos.map(item => {
            const dataLastYear = rowData.filter(x => x.CodEco == item.codigo);
            const sumDefinitivas = dataLastYear.filter((item) => item[`Definitivas${years[0]}`]).reduce((prev, current) => prev + current[`Definitivas${years[0]}`], 0);
            return { ...item, total: sumDefinitivas }
          })
          this._dataStoreService.dataGraphTree = this._dataGraphTree;
          break;
        case 'ingresosEconomicaEconomicos':
          this._dataGraphTree = ingresosEconomicaEconomicos.map(item => {
            const dataLastYear = rowData.filter(x => x.CodEco == item.codigo);
            const sumDefinitivas = dataLastYear.filter((item) => item[`Definitivas${years[0]}`]).reduce((prev, current) => prev + current[`Definitivas${years[0]}`], 0);
            return { ...item, total: sumDefinitivas }
          })
          this._dataStoreService.dataGraphTree = this._dataGraphTree;
          break;

        case 'gastosOrganicaOrganicos':
          this._dataGraphTree = gastosOrganicaOrganicos.map(item => {
            const dataLastYear = rowData.filter(x => x.CodOrg == item.codigo);
            if (years[0] === 2022) {
              sumDefinitivas = dataLastYear.filter((item) => item[`Iniciales${years[0]}`]).reduce((prev, current) => prev + current[`Iniciales${years[0]}`], 0);
            } else {
              sumDefinitivas = dataLastYear.filter((item) => item[`Definitivas${years[0]}`]).reduce((prev, current) => prev + current[`Definitivas${years[0]}`], 0);
            }
            return { ...item, total: sumDefinitivas }
          })
          this._dataStoreService.dataGraphTree = this._dataGraphTree;
          break;

        case 'gastosProgramaAreas':
          this._dataGraphTree = gastosProgramaAreas.map(item => {
            const dataLastYear = rowData.filter(x => x.CodPro == item.codigo);
            const sumDefinitivas = dataLastYear.filter((item) => item[`Definitivas${years[0]}`]).reduce((prev, current) => prev + current[`Definitivas${years[0]}`], 0);
            return { ...item, total: sumDefinitivas }
          })
          this._dataStoreService.dataGraphTree = this._dataGraphTree;
          break;
        case 'gastosProgramaPoliticas':
          this._dataGraphTree = gastosProgramaPoliticas.map(item => {
            const dataLastYear = rowData.filter(x => x.CodPro == item.codigo);
            const sumDefinitivas = dataLastYear.filter((item) => item[`Definitivas${years[0]}`]).reduce((prev, current) => prev + current[`Definitivas${years[0]}`], 0);
            return { ...item, total: sumDefinitivas }
          })
          this._dataStoreService.dataGraphTree = this._dataGraphTree;
          break;
        case 'gastosProgramaGrupos':
          this._dataGraphTree = gastosProgramaGrupos.map(item => {
            const dataLastYear = rowData.filter(x => x.CodPro == item.codigo);
            const sumDefinitivas = dataLastYear.filter((item) => item[`Definitivas${years[0]}`]).reduce((prev, current) => prev + current[`Definitivas${years[0]}`], 0);
            return { ...item, total: sumDefinitivas }
          })
          this._dataStoreService.dataGraphTree = this._dataGraphTree;
          break;
        case 'gastosProgramaProgramas':
          this._dataGraphTree = gastosProgramaProgramas.map(item => {
            const dataLastYear = rowData.filter(x => x.CodPro == item.codigo);
            const sumDefinitivas = dataLastYear.filter((item) => item[`Definitivas${years[0]}`]).reduce((prev, current) => prev + current[`Definitivas${years[0]}`], 0);
            return { ...item, total: sumDefinitivas }
          })
          this._dataStoreService.dataGraphTree = this._dataGraphTree;
          break;

        case 'gastosEconomicaCapitulos':
          this._dataGraphTree = gastosEconomicaCapitulos.map(item => {
            const dataLastYear = rowData.filter(x => x.CodCap == item.codigo);
            const sumDefinitivas = dataLastYear.filter((item) => item[`Definitivas${years[0]}`]).reduce((prev, current) => prev + current[`Definitivas${years[0]}`], 0);
            return { ...item, total: sumDefinitivas }
          })
          this._dataStoreService.dataGraphTree = this._dataGraphTree;
          break;
        case 'gastosEconomicaArticulos':
          this._dataGraphTree = gastosEconomicaArticulos.map(item => {
            const dataLastYear = rowData.filter(x => x.CodEco == item.codigo);
            const sumDefinitivas = dataLastYear.filter((item) => item[`Definitivas${years[0]}`]).reduce((prev, current) => prev + current[`Definitivas${years[0]}`], 0);
            return { ...item, total: sumDefinitivas }
          })
          this._dataStoreService.dataGraphTree = this._dataGraphTree;
          break;
        case 'gastosEconomicaConceptos':
          this._dataGraphTree = gastosEconomicaConceptos.map(item => {
            const dataLastYear = rowData.filter(x => x.CodEco == item.codigo);
            const sumDefinitivas = dataLastYear.filter((item) => item[`Definitivas${years[0]}`]).reduce((prev, current) => prev + current[`Definitivas${years[0]}`], 0);
            return { ...item, total: sumDefinitivas }
          })
          this._dataStoreService.dataGraphTree = this._dataGraphTree;
          break;
        case 'gastosEconomicaEconomicos':
          this._dataGraphTree = gastosEconomicaEconomicos.map(item => {
            const dataLastYear = rowData.filter(x => x.CodEco == item.codigo);
            const sumDefinitivas = dataLastYear.filter((item) => item[`Definitivas${years[0]}`]).reduce((prev, current) => prev + current[`Definitivas${years[0]}`], 0);
            return { ...item, total: sumDefinitivas }
          })
          this._dataStoreService.dataGraphTree = this._dataGraphTree;
          break;
      }
    }




  }

}
