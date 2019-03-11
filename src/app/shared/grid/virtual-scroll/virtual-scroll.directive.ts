import { VIRTUAL_SCROLL_STRATEGY } from '@angular/cdk/scrolling';
import {
  AfterViewInit,
  ContentChild,
  Directive,
  forwardRef,
  Input,
  OnChanges,
  SimpleChanges,
  OnDestroy,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { GridTableDataSource } from './grid-table-data-source';
import { GridTableVirtualScrollStrategy } from './virtual-scroll.strategy';

import { SunGridViewComponent } from '../view/grid-view.component';

@Directive({
  selector: '[gridTableVirtualScroll]',
  providers: [
    {
      provide: VIRTUAL_SCROLL_STRATEGY,
      useFactory: (scroll: GridTableVirtualScrollDirective) => scroll.scrollStrategy,
      deps: [forwardRef(() => GridTableVirtualScrollDirective)],
    },
  ],
})
export class GridTableVirtualScrollDirective
  implements AfterViewInit, OnChanges, OnDestroy {
  @Input() rowHeight = 48;
  @Input() offset = 56;
  @Input() isDataSourceReady;
  @ContentChild(SunGridViewComponent) gridView: SunGridViewComponent;

  scrollStrategy: GridTableVirtualScrollStrategy;

  private sub: Subscription;

  constructor() {
    this.scrollStrategy = new GridTableVirtualScrollStrategy(
      this.rowHeight,
      this.offset
    );
  }

  ngAfterViewInit() {
  }
  ngOnChanges(changes: SimpleChanges) {
    if ( changes.isDataSourceReady.currentValue) {
      this.initialScrollStrateg();
    }
    this.scrollStrategy.setScrollHeight(this.rowHeight, this.offset);
  }
  initialScrollStrateg() {
    const table = this.gridView.table;
    if (table.dataSource instanceof GridTableDataSource) {
      this.sub = table.dataSource.queryData.subscribe(data => {
        this.scrollStrategy.setDataLength(data.length);
      });
    }
  }
  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
