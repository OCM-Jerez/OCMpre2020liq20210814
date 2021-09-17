import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndiceComponent } from './indice/indice.component';
import { IngresosComponent } from './ingresos/ingresos.component';
import { GastosComponent } from './gastos/gastos.component';
import { ComparaEcoComponent } from './comparativas/comparaEco/compara-eco.component';
import { ComparaOPAComponent } from './comparativas/comparaOPA/compara-opa.component';
import { ComparaProComponent } from './comparativas/compara-pro/compara-pro.component';

const routes: Routes = [
  { path: 'home', component: IndiceComponent },
  { path: 'Ingresos', component: IngresosComponent },
  { path: 'Gastos', component: GastosComponent },
  { path: 'ComparaEco', component: ComparaEcoComponent },
  { path: 'ComparaOPA', component: ComparaOPAComponent },
  { path: 'ComparaPro', component: ComparaProComponent },
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
