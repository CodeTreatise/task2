import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, map } from 'rxjs/operators';
import { Constituency } from './model/constituency';

@Injectable({
  providedIn: 'root'
})
export class ElectionService {

  rawData: string[] = [];

  constructor(private http: HttpClient) { }

  getElectionName() {
    const getElection = `http://demoeelection.erpguru.in/Service.asmx/Web_Election_Get_ElectionNameHaveConstituency?UserId=1`;
    return this.http
      .get(getElection).pipe(
      )
      

  }
}
