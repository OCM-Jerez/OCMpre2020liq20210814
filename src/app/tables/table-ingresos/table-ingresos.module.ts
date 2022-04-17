import { NgModule } from '@angular/core';

import { TableIngresosComponent } from './table-ingresos.component';
import { RouterModule } from '@angular/router';

import { Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';

export const routes: Routes = [{ path: '', component: TableIngresosComponent }]
@NgModule({
    declarations: [TableIngresosComponent],
    imports: [RouterModule.forChild(routes), CommonModule, AgGridModule],
})
export class TableIngresosModule { }
