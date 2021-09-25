import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { NgSelectModule } from '@ng-select/ng-select';
import { AgGridModule } from 'ag-grid-angular';
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
import { HeaderAgGridComponent } from './layouts/header-ag-grid/header-ag-grid.component';

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
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    NgSelectModule,
    AgGridModule.withComponents([
    ])
  ],
  providers: [
    TipoClasificacionService,
    AvalaibleYearsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }