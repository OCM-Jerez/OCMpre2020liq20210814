import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';

import { Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { GraphIngresosComponent } from './graph-ingresos.component';
import { AgChartsAngularModule } from 'ag-charts-angular';

export const routes: Routes = [{ path: '', component: GraphIngresosComponent }]
@NgModule({
    declarations: [GraphIngresosComponent],
    imports: [RouterModule.forChild(routes), CommonModule, AgGridModule, AgChartsAngularModule],
})
export class GraphIngresosModule { }
