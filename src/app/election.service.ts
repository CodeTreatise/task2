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
    const getElectionURL = `http://demoeelection.erpguru.in/Service.asmx/Web_Election_Get_ElectionNameHaveConstituency?UserId=${this.userId}`;
    return this.http
      .get<any>(getElectionURL)
      .pipe(
      // tap(data => console.log(`Constituency: ${JSON.stringify(data)}`)),
    )
  }

  getConstituency(selectedElection: number) {
    const getConstituencyURL = `http://demoeelection.erpguru.in/Service.asmx/Web_Election_Get_ConstituencyName?UserId=${this.userId}`;

    let param = new HttpParams().set('ElectionId', selectedElection)

    return this.http
      .get<any>(getConstituencyURL, { params: param })
      .pipe(
      // tap(data => console.log(`Constituency: ${JSON.stringify(data)}`)),
    )
  }

  getAssembly() {
    const getAssemblyURL = `http://demoeelection.erpguru.in/Service.asmx/Web_Election_GetAssembly?UserId=${this.userId}`;
    return this.http
      .get<any>(getAssemblyURL)
      .pipe(
      // tap(data => console.log(`Constituency: ${JSON.stringify(data)}`)),
    )
  }
  getBooth(selectedConstituency: number) {
    // console.log('from booth', selectedConstituency)
    const getBoothURL = `http://demoeelection.erpguru.in/Service.asmx/Web_Election_GetBoothList?UserId=${this.userId}`;
    let param = new HttpParams().set('ConstituencyId', selectedConstituency);

    return this.http
      .get<any>(getBoothURL, { params: param })
      .pipe(
        // tap(data => console.log(`Constituency: ${JSON.stringify(data)}`)),
      )
  }



}
