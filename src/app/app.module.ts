import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgSelectModule } from '@ng-select/ng-select';
import { AgGridModule } from 'ag-grid-angular';
import { AgChartsAngularModule } from 'ag-charts-angular';
import 'ag-grid-enterprise';

// Rutas
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { ComparaIngComponent } from './comparativas/compara-ing/compara-ing.component';
import { ComparaGasComponent } from './comparativas/compara-gas/compara-gas.component';

import { TipoClasificacionService } from './services/tipoClasificacion.service';
import { AvalaibleYearsService } from './services/avalaibleYears.service';
import { HeaderAgGridComponent } from './ag-grid/header-ag-grid/header-ag-grid.component';
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

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    HeaderAgGridComponent,
    ComparaIngComponent,
    ComparaGasComponent,
    GraphEconomicoGastoComponent,
    GraphProgramaComponent,
    GraphCapituloGastoComponent,
    GraphOrganicoGastoComponent,
    SelectCodigoComponent,
    GraphGrupoProgramasComponent,
    GraphPoliticasProgramasComponent,
    GraphAreasGastosComponent,
    IndiceComponent,
    GraphGastosEconomicaArticulosComponent,
    GraphGastosEconomicaConceptosComponent,
    GraphIngresosComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([
    ]),
    AgChartsAngularModule
  ],
  providers: [
    TipoClasificacionService,
    AvalaibleYearsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }