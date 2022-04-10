import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndiceComponent } from './indice/indice.component';
import { TableIngresosComponent } from './tables/table-ingresos/table-ingresos.component';
import { TableGastosComponent } from './tables/table-gastos/table-gastos.component';
import { GraphIngresosComponent } from './graphs/graph-ingresos/graph-ingresos.component';
import { GraphGastosComponent } from './graphs/graph-gastos/graph-gastos.component';

const routes: Routes = [
  { path: 'home', component: IndiceComponent },
  { path: 'tableIngresos', component: TableIngresosComponent },
  { path: 'tableGastos', component: TableGastosComponent },
  { path: 'graphIngresos', component: GraphIngresosComponent },
  { path: 'graphGastos', component: GraphGastosComponent },
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
