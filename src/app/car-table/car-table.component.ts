import {
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';

import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GridTableDataSource } from '../virtual-scroll/data-source';
import { MatSort } from '@angular/material';
import { CarTableDataService } from './car-table-data.service';

@Component({
  selector: 'app-car-table',
  templateUrl: './car-table.component.html',
  styleUrls: ['./car-table.component.scss']
})
export class CarTableComponent<T> implements OnInit {
  pending: boolean;
  sticky = true;
  @ViewChild(CdkVirtualScrollViewport) viewport: CdkVirtualScrollViewport;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: GridTableDataSource<T>;
  displayedColumns: string[];
  offset: Observable<number>;
  visibleColumns: any[];
  _alldata: any[];

  page = 1;
  pageSize = 80;

  constructor(
    protected dataSourceService: CarTableDataService,
  ) {
    this.visibleColumns = [{
      field: 'id'
    }, {
      field: 'vin'
    }, {
      field: 'brand'
    }, {
      field: 'year'
    }, {
      field: 'color'
    }];
    this.displayedColumns = this.visibleColumns.map(column => column.field);
  }

  ngOnInit() {
    this.init();
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
  private init() {
    if (this.dataSource) {
      return;
    }
    this.dataSource = new GridTableDataSource([], {
      viewport: this.viewport,
    });
    this.offset = this.viewport.renderedRangeStream.pipe(
      map(() => -this.viewport.getOffsetToRenderedContentStart())
    );
  }
  nextBatch(event) {
    const buffer = 20;
    const range = this.viewport.getRenderedRange();
    const end = range.end;
    if ( this.dataSource.allData && this.dataSource.allData.length > 0 ) {
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
