import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndiceComponent } from './indice/indice.component';
import { ComparaIngComponent } from './comparativas/compara-ing/compara-ing.component';
import { ComparaGasComponent } from './comparativas/compara-gas/compara-gas.component';
import { GraphIngresosComponent } from './graphs/graph-ingresos/graph-ingresos.component';
import { GraphGastosComponent } from './graphs/graph-gastos/graph-gastos.component';

const routes: Routes = [
  { path: 'home', component: IndiceComponent },
  { path: 'ComparaIng', component: ComparaIngComponent },
  { path: 'ComparaGas', component: ComparaGasComponent },
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
