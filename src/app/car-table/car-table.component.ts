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
}
