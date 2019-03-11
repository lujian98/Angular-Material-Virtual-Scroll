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
  OnDestroy,
} from '@angular/core';

import { BehaviorSubject, Observable, fromEvent, Subscription } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { GridTableDataSource } from '../virtual-scroll/grid-table-data-source';

import { SunGridViewComponent } from './grid-view.component';

import { SunColumn } from '../column.model';

@Component({
  selector: 'app-virtual-scroll-view',
  templateUrl: './virtual-scroll-view.component.html',
  styleUrls: ['./virtual-scroll-view.component.scss']

})
export class SunVirtualScrollViewComponent<T> implements AfterViewInit, OnDestroy {
  @Input() columns: SunColumn[];
  @Input() dataSource: GridTableDataSource<T>;
  @Input() pending: boolean;

  @ViewChild(CdkVirtualScrollViewport) viewport: CdkVirtualScrollViewport;
  @ViewChild(SunGridViewComponent) gridView: SunGridViewComponent;

  @Output() sunViewportReadyEvent: EventEmitter<object> = new EventEmitter<object>();
  @Output() sunNextPageEvent: EventEmitter<object> = new EventEmitter<object>();


  isDataSourceReady: boolean;
  offset: Observable<number>;
  sticky: boolean;

  page = 1;
  pageSize = 80;

  private sub: Subscription;

  constructor(
  ) { }

  ngAfterViewInit() {
    setTimeout(() => {
      this.offset = this.viewport.renderedRangeStream.pipe(
        map(() => -this.viewport.getOffsetToRenderedContentStart())
      );
      this.sunViewportReadyEvent.emit({viewport: this.viewport});
    }, 10);
    this.sub = this.gridView.sunDataSourceReadyEvent.subscribe((e) => { this.isDataSourceReady = true; } );
  }
  nextBatch(event) {
    if ( !this.sticky ) { this.sticky = true; }
    const range = this.viewport.getRenderedRange();
    this.sunNextPageEvent.emit({range: range});
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
