import { NgModule } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import {
  MatCheckboxModule,
  MatProgressBarModule,
  MatSortModule,
  MatTableModule
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { GridTableVirtualScrollModule } from '../virtual-scroll/virtual-scroll.module';
import { CarTableComponent } from './car-table.component';

import { CarTableDataService } from './car-table-data.service';

const components = [CarTableComponent];

@NgModule({
  declarations: components,
  exports: components,
  imports: [
    BrowserModule,
    GridTableVirtualScrollModule,
    MatCheckboxModule,
    MatProgressBarModule,
    MatSortModule,
    MatTableModule,
    ScrollingModule
  ],
  providers: [
    CarTableDataService
  ]
})
export class CarTableModule { }
