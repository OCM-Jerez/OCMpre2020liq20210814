import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import 'ag-grid-enterprise';

// Rutas
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';
import { IndiceComponent } from './indice/indice.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { TipoClasificacionService } from './services/tipoClasificacion.service';
import { GastosPorCapituloComponent } from './gastos/gastos.component';
import { IngresosPorEconomicoComponent } from './ingresos/ingresos.component';

@NgModule({
  declarations: [
    AppComponent,
    IndiceComponent,
    HeaderComponent,
    FooterComponent,
    IngresosPorEconomicoComponent,
    GastosPorCapituloComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgSelectModule,
    FormsModule,
    AgGridModule.withComponents([
    ]),
    HttpClientModule
  ],
  providers: [TipoClasificacionService],
  bootstrap: [AppComponent]
})
export class AppModule { }