import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GastosPorCapituloComponent } from './gastos/gastos.component';
import { IndiceComponent } from './indice/indice.component';
import { IngresosPorEconomicoComponent } from './ingresos/ingresos.component';

const routes: Routes = [
  { path: 'home', component: IndiceComponent },
  { path: 'IngresosPorEconomico', component: IngresosPorEconomicoComponent },
  { path: 'GastosPorCapitulo', component: GastosPorCapituloComponent },
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
