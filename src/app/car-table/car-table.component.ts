import {
  Component,
  Input,
  OnInit,
  ViewChild,
  AfterViewInit,
} from '@angular/core';

import { GridTableDataSource } from '../shared/grid/virtual-scroll/data-source';
import { CarTableDataService } from './car-table-data.service';

import { SunGridViewComponent } from '../shared/grid/view/grid-view.component';
import { SunVirtualScrollViewComponent } from '../shared/grid/view/virtual-scroll-view.component';

import { SunColumn } from '../shared/grid/column.model';


@Component({
  selector: 'app-car-table',
  templateUrl: './car-table.component.html',
  styleUrls: ['./car-table.component.scss']
})
export class CarTableComponent<T> implements OnInit, AfterViewInit {
  @ViewChild(SunVirtualScrollViewComponent) gridVirtualScroll: SunVirtualScrollViewComponent;

  columns: SunColumn[] = [];
  dataSource: GridTableDataSource<T>;
  _alldata: any[];

  pending: boolean;
  page = 1;
  pageSize = 80;

  constructor(
    protected dataSourceService: CarTableDataService,
  ) {
  }

  ngOnInit() {
    this.columns = [
      { field: 'id', header: 'id'},
      { field: 'vin', header: 'Vin' },
      { field: 'year', header: 'Year', filter: 'number' },
      { field: 'brand', header: 'Brand', filter: 'select' },
      { field: 'color', header: 'Color' }
    ];
  }

  ngAfterViewInit() {
    this.gridVirtualScroll.sunViewportReadyEvent.subscribe((e) => this.onViewportReadyEvent(e) );
    this.gridVirtualScroll.sunNextPageEvent.subscribe((e) => this.onNextPageEvent(e) );

  }
  initDataSource(viewport) {
    if (this.dataSource) {
      return;
    }
    this.dataSource = new GridTableDataSource([], {
      viewport: viewport,
    });

    this.dataSourceService.getAllData()
    .subscribe(
      (data: any[]) => {
          data['data'].forEach((item, index) => {
            item.id = index;
          });
          this._alldata = data['data'];
          this.dataSource.allData = this._alldata.slice(0, this.pageSize);
        },
      (err: any) => console.log(err)
    );
  }
  onViewportReadyEvent(e) {
    this.initDataSource(e.viewport);
  }

  onNextPageEvent(e){
    if ( this.dataSource && this.dataSource.allData && this.dataSource.allData.length > 0 ) {
      const range = e.range;
      const buffer = 20;
      const end = range.end;
      if ( end + buffer > this.page * this.pageSize ) {
        this.page++;
        this.pending = true;
        setTimeout(() => {
          this.dataSource.allData = this._alldata.slice(0, this.page * this.pageSize);
          this.pending = false;
        }, 250);
      }
    }
  }
}
