import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndiceComponent } from './indice/indice.component';
import { IngresosComponent } from './ingresos/ingresos.component';
import { GastosComponent } from './gastos/gastos.component';
import { ComparaIngComponent } from './comparativas/compara-ing/compara-ing.component';
import { ComparaGasComponent } from './comparativas/compara-gas/compara-gas.component';
import { GraphComponent } from './comparativas/graph/graph.component';
import { SelectEconomicoIngresoComponent } from './comparativas/graph/select-economico-ingreso/select-economico-ingreso.component';
import { SelectEconomicoGastoComponent } from './comparativas/graph/select-economico-gasto/select-economico-gasto.component';
import { GraphEconomicoGastoComponent } from './comparativas/graph/graph-economico-gasto/graph-economico-gasto.component';
import { SelectProgramaComponent } from './comparativas/graph/select-programa/select-programa.component';
import { GraphProgramaComponent } from './comparativas/graph/graph-programa/graph-programa.component';
import { SelectCapituloGastoComponent } from './comparativas/graph/select-capitulo-gasto/select-capitulo-gasto.component';
import { GraphCapituloGastoComponent } from './comparativas/graph/graph-capitulo-gasto/graph-capitulo-gasto.component';

const routes: Routes = [
  { path: 'home', component: IndiceComponent },
  { path: 'Ingresos', component: IngresosComponent },
  { path: 'SelectIngreso', component: SelectEconomicoIngresoComponent },
  { path: 'SelectGastoCapitulo', component: SelectCapituloGastoComponent },
  { path: 'SelectGastoPrograma', component: SelectProgramaComponent },
  { path: 'SelectGastoEconomico', component: SelectEconomicoGastoComponent },
  { path: 'Grafico', component: GraphComponent },
  { path: 'GraficoCapituloGasto', component: GraphCapituloGastoComponent },
  { path: 'GraficoEconomicoGasto', component: GraphEconomicoGastoComponent },
  { path: 'GraficoProgramaGasto', component: GraphProgramaComponent },
  { path: 'Gastos', component: GastosComponent },
  { path: 'ComparaIng', component: ComparaIngComponent },
  { path: 'ComparaGas', component: ComparaGasComponent },
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
