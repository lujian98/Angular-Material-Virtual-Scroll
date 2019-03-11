import { Component, OnInit } from '@angular/core';
import { SunBaseGridComponent } from '../shared/grid/grid.component';
import { CarTableDataService } from './car-table-data.service';

@Component({
  selector: 'app-car-table',
  templateUrl: './car-table.component.html',
  styleUrls: ['./car-table.component.scss']
})
export class CarTableComponent extends SunBaseGridComponent implements OnInit {

  constructor(
    protected dataSourceService: CarTableDataService,
  ) {
    super();
    this.isVirtualScroll = true;
  }

  ngOnInit() {
    this.columns = [
      { field: 'id', header: 'id'},
      { field: 'vin', header: 'Vin' },
      { field: 'year', header: 'Year', filter: 'number' },
      { field: 'brand', header: 'Brand', filter: 'select' },
      { field: 'color', header: 'Color' }
    ];
    super.ngOnInit();
  }

  protected loadRemoteData() {
    setTimeout(() => {
      this.dataSource.allData = this._alldata.slice(0, this.page * this.pageSize);
      this.pending = false;
    }, 250);
  }
}
