import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';

import { Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { GraphTreeComponent } from './graph-tree.component';
import { AgChartsAngularModule } from 'ag-charts-angular';

export const routes: Routes = [{ path: '', component: GraphTreeComponent }]
@NgModule({
    declarations: [GraphTreeComponent],
    imports: [RouterModule.forChild(routes), CommonModule, AgGridModule, AgChartsAngularModule],
})
export class GraphTreeModule { }
