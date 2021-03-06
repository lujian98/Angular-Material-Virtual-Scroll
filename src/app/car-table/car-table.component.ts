import { Component, OnInit } from '@angular/core';
import { GridAbstractDataService } from '../grid/grid-abstract-data.service';
import { CarTableDataService } from './car-table-data.service';

@Component({
  selector: 'app-car-table',
  templateUrl: './car-table.component.html',
  styleUrls: ['./car-table.component.scss'],
  providers: [
    {
      provide: GridAbstractDataService,
      useClass: CarTableDataService
    }
  ]
})
export class CarTableComponent<T> implements OnInit {
  visibleColumns: any[];

  constructor(
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
  }

  ngOnInit() {
  }
}
