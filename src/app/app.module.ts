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
import { IndiceComponent } from './indice/indice.component';
import { IngresosComponent } from './ingresos/ingresos.component';
import { GastosComponent } from './gastos/gastos.component';
import { ComparaIngComponent } from './comparativas/compara-ing/compara-ing.component';
import { ComparaGasComponent } from './comparativas/compara-gas/compara-gas.component';

import { TipoClasificacionService } from './services/tipoClasificacion.service';
import { AvalaibleYearsService } from './services/avalaibleYears.service';
import { HeaderAgGridComponent } from './ag-grid/header-ag-grid/header-ag-grid.component';
import { GraphEconomicoGastoComponent } from './comparativas/graph/graph-economico-gasto/graph-economico-gasto.component';
import { GraphProgramaComponent } from './comparativas/graph/graph-programa/graph-programa.component';
import { GraphCapituloGastoComponent } from './comparativas/graph/graph-capitulo-gasto/graph-capitulo-gasto.component';
import { GraphOrganicoGastoComponent } from './comparativas/graph/graph-organico-gasto/graph-organico-gasto.component';
import { GraphCapituloIngresoComponent } from './comparativas/graph/graph-capitulo-ingreso/graph-capitulo-ingreso.component';
import { GraphEconomicoIngresoComponent } from './comparativas/graph/graph-economico-ingreso/graph-economico-ingreso.component';
import { SelectCodigoComponent } from './comparativas/graph/select-codigo/select-codigo.component';
import { GraphGrupoProgramasComponent } from './comparativas/graph/graph-grupo-programas/graph-grupo-programas.component';
import { GraphPoliticasProgramasComponent } from './comparativas/graph/graph-politicas-programas/graph-politicas-programas.component';
import { GraphAreasGastosComponent } from './comparativas/graph/graph-areas-gastos/graph-areas-gastos.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    GastosComponent,
    NavbarComponent,
    IndiceComponent,
    IngresosComponent,
    HeaderAgGridComponent,
    ComparaIngComponent,
    ComparaGasComponent,
    GraphEconomicoGastoComponent,
    GraphProgramaComponent,
    GraphCapituloGastoComponent,
    GraphOrganicoGastoComponent,
    GraphCapituloIngresoComponent,
    GraphEconomicoIngresoComponent,
    SelectCodigoComponent,
    GraphGrupoProgramasComponent,
    GraphPoliticasProgramasComponent,
    GraphAreasGastosComponent,
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