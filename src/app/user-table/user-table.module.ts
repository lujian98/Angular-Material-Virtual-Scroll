import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GridModule } from '../grid/grid.module';
import { UserTableComponent } from './user-table.component';

const components = [UserTableComponent];

@NgModule({
  declarations: components,
  exports: components,
  imports: [
    BrowserModule,
    GridModule,
  ],
})
export class UserTableModule { }
