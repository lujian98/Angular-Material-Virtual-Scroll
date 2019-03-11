import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { CdkTableModule } from '@angular/cdk/table';
import { ScrollingModule } from '@angular/cdk/scrolling';

import {
  MatDividerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule,
  MatSortModule,
  MatTableModule,
  MatProgressBarModule,

} from '@angular/material';

import { GridTableVirtualScrollDirective } from './virtual-scroll/virtual-scroll.directive';

import { SunBaseGridComponent } from './grid.component';
import { SunGridViewComponent } from './view/grid-view.component';
import { SunVirtualScrollViewComponent } from './view/virtual-scroll-view.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CdkTableModule,
    ScrollingModule,

    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
    MatProgressBarModule,
  ],
  declarations: [
    SunBaseGridComponent,
    SunGridViewComponent,
    SunVirtualScrollViewComponent,
    GridTableVirtualScrollDirective,
  ],
  exports: [
    SunBaseGridComponent,
    SunGridViewComponent,
    SunVirtualScrollViewComponent,
    GridTableVirtualScrollDirective,
  ],
  entryComponents: [
    SunBaseGridComponent,
    SunGridViewComponent,
  ],
  providers: [],
})
export class GridModule {}
