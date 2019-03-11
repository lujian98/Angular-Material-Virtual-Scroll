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
  //@ViewChild(SunGridViewComponent) gridView: SunGridViewComponent;
  @ViewChild(SunVirtualScrollViewComponent) gridVirtualScroll: SunVirtualScrollViewComponent;

  columns: SunColumn[] = [];
  dataSource: GridTableDataSource<T>;
  _alldata: any[];
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
    //this.gridView.sunViewportReadyEvent.subscribe((e) => this.onViewportReadyEvent(e) );
    this.gridVirtualScroll.sunViewportReadyEvent.subscribe((e) => this.onViewportReadyEvent(e) );

  }
  initDataSource(viewport) {
    if (this.dataSource) {
      return;
    }
    console.log(viewport)
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
          console.log(  this.dataSource )
          this.dataSource.allData = this._alldata.slice(0, this.pageSize);
        },
      (err: any) => console.log(err)
    );
  }
  onViewportReadyEvent(e) {
    this.initDataSource(e.viewport);
  }
}
