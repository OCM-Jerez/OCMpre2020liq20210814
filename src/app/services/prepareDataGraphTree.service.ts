import { Injectable } from '@angular/core';
import { DataStoreService } from './dataStore.service';
import gastosOrganicaOrganicos from '../../assets/data/gastosOrganicaOrganicos.json';
import gastosProgramaAreas from '../../assets/data/gastosProgramaAreas.json';
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
    private _alertService: AlertService

  ) { }

  async prepareDataGraphTree(rowData) {

    const years = this._avalaibleYearsService.getYearsSelected();
    if (years.length > 1) {
      this._alertService.showAlert('Hay más de un año seleccionado');
    } else {

      const tipoClasificacion = this._dataStoreService.getDataTable.clasificationType;
      // console.log('tipoClasificacion', tipoClasificacion);
      // console.log('rowData', rowData);
      let sumDefinitivas = 0;
      switch (tipoClasificacion) {
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
        // case 'gastosOrganicaOrganicos':
        //   this._dataGraphTree = gastosOrganicaOrganicos.map(item => {
        //     const dataLastYear = rowData.filter(x => x.CodOrg == item.codigo);
        //     const sumDefinitivas = dataLastYear.filter((item) => item["Definitivas2015"]).reduce((prev, current) => prev + current["Definitivas2015"], 0);
        //     return { ...item, total: sumDefinitivas }
        //   })
        //   // console.log(this._dataGraphTree);
        //   this._dataStoreService.dataGraphTree = this._dataGraphTree;
        //   break;
        case 'gastosProgramaAreas':
          this._dataGraphTree = gastosProgramaAreas.map(item => {
            const dataLastYear = rowData.filter(x => x.CodPro == item.codigo);
            const sumDefinitivas = dataLastYear.filter((item) => item["Definitivas2015"]).reduce((prev, current) => prev + current["Definitivas2015"], 0);
            return { ...item, total: sumDefinitivas }
          })
          // console.log(this._dataGraphTree);
          this._dataStoreService.dataGraphTree = this._dataGraphTree;
          break;
      }

    }




  }

}
