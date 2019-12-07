import { Component, OnInit } from '@angular/core';
import { GridAbstractDataService } from '../grid/grid-abstract-data.service';
import { UserTableDataService } from './user-table-data.service';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
  providers: [
    {
      provide: GridAbstractDataService,
      useClass: UserTableDataService
    }
  ]
})
export class UserTableComponent<T> implements OnInit {
  visibleColumns: any[];

  constructor(
  ) {

    this.visibleColumns = [{
      field: 'cell'
    }, {
      field: 'email'
    }, {
      field: 'gender'
    }, {
      field: 'year'
    }, {
      field: 'color'
    }];
  }

  ngOnInit() {
  }
}
