import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
  ElementRef,
  Input,
  Renderer2,
  Output,
  EventEmitter,
} from '@angular/core';

import { BehaviorSubject, Observable, fromEvent } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';
import { MatTableDataSource, MatSort } from '@angular/material';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

import { SunColumn } from '../column.model';

@Component({
  selector: 'sun-virtual-scroll-view',
  templateUrl: './virtual-scroll-view.component.html',
  styleUrls: ['./virtual-scroll-view.component.scss']

})
export class SunVirtualScrollViewComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() columns: SunColumn[];
  @Input() dataSource: any;
  @ViewChild(CdkVirtualScrollViewport) viewport: CdkVirtualScrollViewport;

  @Output() sunViewportReadyEvent: EventEmitter<object> = new EventEmitter<object>();

  visibleColumns: SunColumn[] = [];
  totalVisibleColumns: number;
  displayedColumns: string[];
  isDataSourceReady = false;
  pending: boolean;
  sticky = false;
  offset: Observable<number>;

  page = 1;
  pageSize = 80;
  constructor(
  ) { }

  ngOnInit() {
    this.setGridColumView(this.columns);
  }
  public setGridColumView(columns: SunColumn[] = []) {
    this.visibleColumns = [];
    columns.forEach(item => {
      if ( !item.hidden ) { this.visibleColumns.push(item); }
    });
    this.visibleColumns = columns;
    this.displayedColumns = this.visibleColumns.map(column => column.field);
    this.totalVisibleColumns = this.visibleColumns.length;
  }
  ngOnChanges(changes: SimpleChanges) {
    if ( !this.isDataSourceReady && changes.dataSource && changes.dataSource.currentValue ) {
      setTimeout(() => {
        this.isDataSourceReady = true;
      }, 10);
    }
  }
  ngAfterViewInit() {
    this.offset = this.viewport.renderedRangeStream.pipe(
      map(() => -this.viewport.getOffsetToRenderedContentStart())
    );
    setTimeout(() => {
      this.sunViewportReadyEvent.emit({viewport: this.viewport});
    }, 10);
  }
  nextBatch(event) {
    if ( !this.sticky ) { this.sticky = true; }
    const buffer = 20;
    const range = this.viewport.getRenderedRange();
    const end = range.end;
    console.info(' next batch');
    /*
    //console.log( this.dataSource )
    if ( this.dataSource.allData && this.dataSource.allData.length > 0 ) {
      if ( end + buffer > this.page * this.pageSize ) {
        this.page++;
        this.pending = true;
        setTimeout(() => {
          //this.dataSource.allData = this._alldata.slice(0, this.page * this.pageSize);
          this.pending = false;
        }, 250);
      }
    }*/
  }
}
