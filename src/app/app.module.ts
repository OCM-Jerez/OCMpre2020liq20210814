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
import { FooterComponent } from './shared/footer/footer.component';
import { GastosComponent } from './gastos/gastos.component';
import { HeaderComponent } from './shared/header/header.component';
import { IndiceComponent } from './indice/indice.component';
import { IngresosComponent } from './ingresos/ingresos.component';

import { TipoClasificacionService } from './services/tipoClasificacion.service';
import { AvalaibleYearsService } from './services/avalaibleYears.service';
import { HeaderAgGridComponent } from './shared/header-ag-grid/header-ag-grid.component';
import { ComparaEcoComponent } from './comparativas/compara-eco/compara-eco.component';
import { ComparaOPAComponent } from './comparativas/compara-OPA/compara-opa.component';
import { ComparaProComponent } from './comparativas/compara-pro/compara-pro.component';
import { ComparaOrgComponent } from './comparativas/compara-org/compara-org.component';
import { ComparaIngComponent } from './comparativas/compara-ing/compara-ing.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    GastosComponent,
    HeaderComponent,
    IndiceComponent,
    IngresosComponent,
    HeaderAgGridComponent,
    ComparaEcoComponent,
    ComparaOPAComponent,
    ComparaProComponent,
    ComparaOrgComponent,
    ComparaIngComponent
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