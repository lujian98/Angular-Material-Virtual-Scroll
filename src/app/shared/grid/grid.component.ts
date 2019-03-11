import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material';

import { GridTableDataSource } from './virtual-scroll/grid-table-data-source';

import { SunColumn } from './column.model';
import { SunGridViewComponent } from './view/grid-view.component';
import { SunVirtualScrollViewComponent } from './view/virtual-scroll-view.component';

@Component({
  template: '',
})
export class SunBaseGridComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(SunGridViewComponent) protected gridView: SunGridViewComponent;
  @ViewChild(SunVirtualScrollViewComponent) gridVirtualScroll: SunVirtualScrollViewComponent<any>;

  isVirtualScroll: boolean;

  protected dataSourceService: any;
  dataSource: any;
  _alldata: any[];

  columns: SunColumn[] = [];
  columnKeys: {} = {};

  pending: boolean;
  page = 1;
  pageSize = 80;

  filterSelectData: {} = {};

  private subViewportReady: Subscription;
  private subNextPage: Subscription;

  constructor(
  ) {
  }
  ngOnInit() {
    this.initialColumn();
    if ( !this.isVirtualScroll ) { this.initMatTableDataSource(); }
  }
  protected initialColumn() {
    this.columns.forEach((item, index) => {
      if ( !item.filter && item.filter !== false ) {  item.filter = 'text'; }
      item.index = index;
      this.columnKeys[item.field] = item;
    });
  }

  ngAfterViewInit() {
    if ( this.isVirtualScroll ) {
      this.subViewportReady = this.gridVirtualScroll.sunViewportReadyEvent.subscribe((e) => this.onViewportReadyEvent(e) );
      this.subNextPage = this.gridVirtualScroll.sunNextPageEvent.subscribe((e) => this.onNextPageEvent(e) );
    }
  }
  onViewportReadyEvent(e) {
    this.initGridTableDataSource(e.viewport);
  }
  initGridTableDataSource(viewport) {
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
  onNextPageEvent(e) {
    if ( this.dataSource && this.dataSource.allData && this.dataSource.allData.length > 0 ) {
      const range = e.range;
      const buffer = 20;
      const end = range.end;
      if ( end + buffer > this.page * this.pageSize ) {
        this.page++;
        this.pending = true;
        this.loadRemoteData();
      }
    }
  }
  protected loadRemoteData() {
  }

  protected initMatTableDataSource() {
    this.dataSource = new MatTableDataSource();
    this.dataSource.filterPredicate = this.createColumnFilter(this.columnKeys);
    this.getAllDataSource();
  }
  protected getAllDataSource() {
    this.dataSourceService.getAllDataSource()
    .subscribe(
      (data: any[]) => {
        this.dataSource.data = data['data'];
      },
      (err: any) => console.log(err)
    );
  }
  protected createColumnFilter(columnKeys): (data: any, filter: any) => boolean {
    const me = this;
    const filterFunction = function(data: any, filter: any): boolean {
      let status = false;
      const searchData = JSON.parse(filter);
      for (const key in searchData) {
        if ( columnKeys[key].filter === 'text' || columnKeys[key].filter === 'select') {
          status = me.filterTextfield(data[key], searchData[key]);
          if ( !status ) { break; }
        } else if ( columnKeys[key].filter === 'number' ) {
          status = me.filterNumberfield(data[key], searchData[key]);
          if ( !status ) { break; }
        }
      }
      return status;
    };
    return filterFunction;
  }
  protected filterTextfield(value: any, filter: any) {
    if (value.toLowerCase().indexOf(filter.trim().toLowerCase()) !== -1) { return true; }
    return false;
  }
  protected filterNumberfield(value: any, filter: any) {
    let str = filter;
    if ( str ) {
      str = str.replace(/\s/g, '');
      if ( str ) {
        filter = Number(filter.replace(/[^0-9.-]/g, ''));
        if ( str.includes('!null') ) { return value !== null; }
        if ( str.includes('null') ) { return value === null; }
        if ( value !== null ) {
          if ( str.includes('>=') ) { return value >= filter; }
          if ( str.includes('<=') ) { return value <= filter; }
          if ( str.includes('>') ) { return value > filter; }
          if ( str.includes('<') ) { return value < filter; }
          if ( str.includes('=') ) { return value === filter; }
          return value.toString().includes( filter.toString() );
        }
      }
    } else { return true; }
  }

  ngOnDestroy() {
    if (this.subViewportReady) {
      this.subViewportReady.unsubscribe();
    }
    if (this.subNextPage) {
      this.subNextPage.unsubscribe();
    }
  }
}
