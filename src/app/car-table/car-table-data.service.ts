import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GridAbstractDataService } from '../grid/grid-abstract-data.service';

@Injectable({
  providedIn: 'root'
})
export class CarTableDataService extends GridAbstractDataService{
  constructor(
    http: HttpClient,
  ) {
    super(http);
  }

  getRequetedData(criteria: string): Observable<any> {
    return this.http.get<any>('./assets/data/cars-huge.json').pipe(
      map((response: any) => {
        console.log( response);
        return response.data;
      })
    );
  }
}

