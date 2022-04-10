import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComparaIngComponent } from './comparativas/compara-ing/compara-ing.component';
import { ComparaGasComponent } from './comparativas/compara-gas/compara-gas.component';
import { GraphEconomicoGastoComponent } from './comparativas/graph/graph-economico-gasto/graph-economico-gasto.component';
import { GraphProgramaComponent } from './comparativas/graph/graph-programa/graph-programa.component';
import { GraphCapituloGastoComponent } from './comparativas/graph/graph-capitulo-gasto/graph-capitulo-gasto.component';
import { GraphOrganicoGastoComponent } from './comparativas/graph/graph-organico-gasto/graph-organico-gasto.component';
import { SelectCodigoComponent } from './comparativas/graph/select-codigo/select-codigo.component';
import { GraphGrupoProgramasComponent } from './comparativas/graph/graph-grupo-programas/graph-grupo-programas.component';
import { GraphPoliticasProgramasComponent } from './comparativas/graph/graph-politicas-programas/graph-politicas-programas.component';
import { GraphAreasGastosComponent } from './comparativas/graph/graph-areas-gastos/graph-areas-gastos.component';
import { IndiceComponent } from './indice/indice.component';

import { GraphGastosEconomicaArticulosComponent } from './comparativas/graph/graph-gastos-economica-articulos/graph-gastos-economica-articulos.component';
import { GraphGastosEconomicaConceptosComponent } from './comparativas/graph/graph-gastos-economica-conceptos/graph-gastos-economica-conceptos.component';

import { GraphIngresosComponent } from './graphs/graph-ingresos/graph-ingresos.component';
import { GraphGastosComponent } from './graphs/graph-gastos/graph-gastos.component';

const routes: Routes = [
  // { path: 'home', component: IndiceComponent },
  { path: 'home', component: IndiceComponent },

  { path: 'ComparaIng', component: ComparaIngComponent },
  { path: 'ComparaGas', component: ComparaGasComponent },

  { path: 'SelectCodigo', component: SelectCodigoComponent },

  { path: 'graphIngresos', component: GraphIngresosComponent },

  { path: 'GraficoCapituloGasto', component: GraphCapituloGastoComponent },
  // { path: 'GraficoOrganicoGasto', component: GraphOrganicoGastoComponent },
  { path: 'graphGastos', component: GraphGastosComponent },
  { path: 'GraficoEconomicoGasto', component: GraphEconomicoGastoComponent },
  { path: 'GraficoProgramaGasto', component: GraphProgramaComponent },
  { path: 'GraficoGruposProgramas', component: GraphGrupoProgramasComponent },
  { path: 'GraficoPoliticasGastos', component: GraphPoliticasProgramasComponent },
  { path: 'GraficoAreasGastos', component: GraphAreasGastosComponent },

  { path: 'gastosEconomicaArticulos', component: GraphGastosEconomicaArticulosComponent },
  { path: 'gastosEconomicaConceptos', component: GraphGastosEconomicaConceptosComponent },

  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true, relativeLinkResolution: 'legacy' })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
