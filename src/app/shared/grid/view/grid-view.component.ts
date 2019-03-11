import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

import { BehaviorSubject, Observable, fromEvent } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';
import { MatTableDataSource, MatSort, MatTable } from '@angular/material';

import { SunColumn } from '../column.model';

@Component({
  selector: 'sun-grid-view',
  templateUrl: './grid-view.component.html',
  styleUrls: ['./grid-view.component.scss']

})
export class SunGridViewComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() columns: SunColumn[];
  @Input() dataSource: any;

  @ViewChild(MatTable) table: MatTable<any>;

  @Output() sunDataSourceReadyEvent: EventEmitter<object> = new EventEmitter<object>();

  visibleColumns: SunColumn[] = [];
  totalVisibleColumns: number;
  displayedColumns: string[];
  isDataSourceReady = false;
  pending: boolean;
  sticky = false;
  offset: Observable<number>;

  constructor(
  ) { }

  ngOnInit() {
    this.setGridColumView(this.columns);
  }
  public setGridColumView(columns: SunColumn[] = []) {
    this.visibleColumns = [];
    columns.forEach(item => {
      if ( !item.hidden ) { this.visibleColumns.push(item); }
    });
    this.visibleColumns = columns;
    this.displayedColumns = this.visibleColumns.map(column => column.field);
    this.totalVisibleColumns = this.visibleColumns.length;
  }
  ngOnChanges(changes: SimpleChanges) {
    if ( !this.isDataSourceReady && changes.dataSource && changes.dataSource.currentValue ) {
      setTimeout(() => {
        this.isDataSourceReady = true;
        this.sunDataSourceReadyEvent.emit({isDataSourceReady: this.isDataSourceReady})
      }, 10);
    }
  }
  ngAfterViewInit() {
  }
  nextBatch(event) {
    if ( !this.sticky ) { this.sticky = true; }
  }
}
