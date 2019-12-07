import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GridAbstractDataService, Pagination } from '../grid/grid-abstract-data.service';

export interface User {
  gender: string;
  name: {
    first: string;
    last: string;
  }
}

export interface RandomUserResponse {
  results: any[];
}

@Injectable({
  providedIn: 'root'
})
export class UserTableDataService extends GridAbstractDataService{
  constructor(
    http: HttpClient,
  ) {
    super(http);
  }

  getAllData(): Observable<any[]> {
    return this.http.get<any[]>('./assets/data/cars-huge.json');
  }

  getRequetedData(criteria: string): Observable<any> {
    const url = buildUserUrl(criteria);
    return this.http.get<any>(url).pipe(
      map((response: any) => response.results)
    );
  }
}

function buildUserUrl(criteria: string): string {
  const pagination = {
    currentPage: 0,
    selectedSize: 80,
    pageSizes: [5, 10, 20, 50]
  };
  const URL = 'https://randomuser.me/api/';
  const currentPage = `page=${pagination.currentPage}`;
  const pageSize = `results=${pagination.selectedSize}&`;
  const searchFor = `seed=${criteria}`;

  return `${URL}?${searchFor}&${pageSize}&${currentPage}`;
}
