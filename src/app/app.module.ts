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
import { TableIngresosComponent } from './tables/table-ingresos/table-ingresos.component';
import { TableGastosComponent } from './tables/table-gastos/table-gastos.component';
import { GraphIngresosComponent } from './graphs/graph-ingresos/graph-ingresos.component';
import { GraphGastosComponent } from './graphs/graph-gastos/graph-gastos.component';

import { TipoClasificacionService } from './services/tipoClasificacion.service';
import { AvalaibleYearsService } from './services/avalaibleYears.service';
import { HeaderAgGridComponent } from './ag-grid/header-ag-grid/header-ag-grid.component';
@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    HeaderAgGridComponent,
    IndiceComponent,
    TableIngresosComponent,
    TableGastosComponent,
    GraphIngresosComponent,
    GraphGastosComponent,
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