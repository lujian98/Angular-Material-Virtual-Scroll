import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { distinctUntilChanged, map, switchMap } from 'rxjs/operators';

export interface Pagination {
  selectedSize: number;
  currentPage: number;
  pageSizes: number[];
}

export interface GridDataState {
  data: any[];
  criteria?: string;
  loading: boolean;
}


@Injectable({
  providedIn: 'root'
})
export abstract class GridAbstractDataService {
  _gridDataState: GridDataState = {
    data: [],
    criteria: '',
    loading: false
  };

  private store = new BehaviorSubject<GridDataState>(this._gridDataState);
  private state$ = this.store.asObservable();

  data$ = this.state$.pipe(map(state => state.data), distinctUntilChanged());
  criteria$ = this.state$.pipe(map(state => state.criteria), distinctUntilChanged());
  loading$ = this.state$.pipe(map(state => state.loading));

  vm$: Observable<GridDataState> = combineLatest(this.data$, this.loading$).pipe(
    map(([data, loading]) => {
      return { data, loading };
    })
  );

  constructor(protected http: HttpClient) {
    combineLatest(this.criteria$).pipe(
      switchMap(([criteria]) => {
        return this.getRequetedData(criteria);
      })
    ).subscribe(data => {
      this.updateState({ ...this._gridDataState, data, loading: false });
    });
  }

  getAllData(): Observable<any[]> {
    return of();
  }

  private updateState(state: GridDataState) {
    this.store.next(this._gridDataState = state);
  }

  getRequetedData(criteria: string): Observable<any> {
    return of();
  }
}

