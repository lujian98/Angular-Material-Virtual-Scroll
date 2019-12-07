import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';

import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import {
  map, distinctUntilChanged,
  switchMap, startWith, tap, delay, debounceTime
} from 'rxjs/operators';

import { GridTableDataSource } from '../virtual-scroll/data-source';
import { MatSort } from '@angular/material';
import { GridAbstractDataService, GridDataState } from './grid-abstract-data.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridComponent<T> implements OnInit {
  @Input() visibleColumns: any[];
  displayedColumns: string[];

  pending: boolean = true;
  @ViewChild(CdkVirtualScrollViewport) viewport: CdkVirtualScrollViewport;
  dataSource: GridTableDataSource<T>;

  _alldata: any[];

  page = 1;
  pageSize = 80;

  vm$: Observable<GridDataState> = this.dataSourceService.vm$;

  constructor(
    private dataSourceService: GridAbstractDataService,
  ) {
  }

  ngOnInit() {
    this.displayedColumns = this.visibleColumns.map(column => column.field);

    this.init();

    this.vm$.subscribe((data: GridDataState)  => {
      console.log(data);
      this._alldata = data['data'];
      this.dataSource.allData = this._alldata.slice(0, this.pageSize);
    });

    /*
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
      ); */

      // const {criteria} = this.dataSourceService.getStateSnapshot();

      // this.searchTerm = this.dataSourceService.buildSearchTermControl();
      // this.searchTerm.patchValue(criteria, { emitEvent: false });
  }

  private init() {
    if (this.dataSource) {
      return;
    }
    this.dataSource = new GridTableDataSource([], {
      viewport: this.viewport,
    });
  }

  nextBatch(event) {
    const buffer = 20;
    const range = this.viewport.getRenderedRange();
    const end = range.end;
    if (this.dataSource.allData && this.dataSource.allData.length > 0) {
      if (end + buffer > this.page * this.pageSize) {
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
