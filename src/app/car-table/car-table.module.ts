import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GridModule } from '../grid/grid.module';
import { CarTableComponent } from './car-table.component';

const components = [CarTableComponent];

@NgModule({
  declarations: components,
  exports: components,
  imports: [
    BrowserModule,
    GridModule,
  ],
})
export class CarTableModule { }
