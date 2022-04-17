import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';

import { Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { AgChartsAngularModule } from 'ag-charts-angular';
import { GraphGastosComponent } from './graph-gastos.component';

export const routes: Routes = [{ path: '', component: GraphGastosComponent }]
@NgModule({
    declarations: [GraphGastosComponent],
    imports: [RouterModule.forChild(routes), CommonModule, AgGridModule, AgChartsAngularModule],
})
export class GraphGastosModule { }
