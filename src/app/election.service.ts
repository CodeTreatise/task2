import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { tap, map, filter } from 'rxjs/operators';
import { Election } from './model/election';

@Injectable({
  providedIn: 'root'
})
export class ElectionService {

  private userId = 1;

  constructor(private http: HttpClient) { }

  getElectionName() {
    const getElection = `http://demoeelection.erpguru.in/Service.asmx/Web_Election_Get_ElectionNameHaveConstituency?UserId=${this.userId}`;
    return this.http
      .get<any>(getElection)
      .pipe(
      // tap(data => console.log(`Constituency: ${JSON.stringify(data)}`)),
    )
  }

  getConstituency(selectedElection: number) {
    const getConstituency = `http://demoeelection.erpguru.in/Service.asmx/Web_Election_Get_ConstituencyName?UserId=${this.userId}`;

    let param = new HttpParams().set('ElectionId', selectedElection)

    return this.http
      .get<any>(getConstituency, { params: param })
      .pipe(
      // tap(data => console.log(`Constituency: ${JSON.stringify(data)}`)),
    )
  }



}
