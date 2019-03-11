import { NgModule } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import {
  MatCheckboxModule,
  MatProgressBarModule,
  MatSortModule,
  MatTableModule
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { GridModule } from '../shared/grid/grid.module';
import { CarTableComponent } from './car-table.component';

import { CarTableDataService } from './car-table-data.service';

const components = [CarTableComponent];

@NgModule({
  declarations: components,
  exports: components,
  imports: [
    BrowserModule,
    GridModule,
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
