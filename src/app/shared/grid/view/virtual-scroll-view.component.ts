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
import { SunGridViewComponent } from './grid-view.component';

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
  @ViewChild(SunGridViewComponent) gridView: SunGridViewComponent;

  @Output() sunViewportReadyEvent: EventEmitter<object> = new EventEmitter<object>();

  isDataSourceReady = false;
  offset: Observable<number>;

  page = 1;
  pageSize = 80;
  constructor(
  ) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
  }
  ngAfterViewInit() {
    this.offset = this.viewport.renderedRangeStream.pipe(
      map(() => -this.viewport.getOffsetToRenderedContentStart())
    );
    setTimeout(() => {
      this.sunViewportReadyEvent.emit({viewport: this.viewport});
    }, 10);
    this.gridView.sunDataSourceReadyEvent.subscribe((e) => this.onDataSourceReadyEvent(e) );
  }
  onDataSourceReadyEvent(e) {
    this.isDataSourceReady = true;
  }
  nextBatch(event) {
    //if ( !this.sticky ) { this.sticky = true; }
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
