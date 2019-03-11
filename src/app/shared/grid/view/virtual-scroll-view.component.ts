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
export class SunVirtualScrollViewComponent implements AfterViewInit {
  @Input() columns: SunColumn[];
  @Input() dataSource: any;
  @Input() pending: boolean;

  @ViewChild(CdkVirtualScrollViewport) viewport: CdkVirtualScrollViewport;
  @ViewChild(SunGridViewComponent) gridView: SunGridViewComponent;

  @Output() sunViewportReadyEvent: EventEmitter<object> = new EventEmitter<object>();
  @Output() sunNextPageEvent: EventEmitter<object> = new EventEmitter<object>();


  isDataSourceReady = false;
  offset: Observable<number>;
  sticky: boolean;

  page = 1;
  pageSize = 80;
  constructor(
  ) { }

  ngAfterViewInit() {
    setTimeout(() => {
      this.offset = this.viewport.renderedRangeStream.pipe(
        map(() => -this.viewport.getOffsetToRenderedContentStart())
      );
      this.sunViewportReadyEvent.emit({viewport: this.viewport});
    }, 10);
    this.gridView.sunDataSourceReadyEvent.subscribe((e) => { this.isDataSourceReady = true; } );
  }
  nextBatch(event) {
    if ( !this.sticky ) { this.sticky = true; }
    const range = this.viewport.getRenderedRange();
    this.sunNextPageEvent.emit({range: range});
  }
}
