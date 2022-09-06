import { Component, OnInit } from '@angular/core';
import { ElectionService } from './election.service';
import { Election } from './model/election';
import { Responce } from './model/responce';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'task - 2';

  // Election
  electionList!: any[];

  electionSelected!: number;

  // Constituency
  constituencyList!: any[];

  constituencySelected!: number;

  electionData: any = [{}];


  constructor(private electionService: ElectionService) {

  }

  ngOnInit(): void {
    this.loadElections();
  }

  // load the initial election list
  loadElections() {
    this.electionService.getElectionName().subscribe(response => {
      for (let prop in response) {
        if (response[prop] !== 0) {
          this.electionList = response[prop];
        }
      }
    })
  }

  // load constituency data based on election selection
  onElectionSelect() {
    this.electionService.getConstituency(this.electionSelected).subscribe(response => {
      for (let prop in response) {
        if (response[prop] !== 0) {
          this.constituencyList = response[prop];
        }
      }
    })

  }


  onConstituencySelect() {
    console.log(this.constituencySelected);
  }

  displayedColumns: String[] = ['rowNumber', 'ElectionName', 'Constituency', 'Assembly', 'BoothNo', 'VotersNo', 'Edit', 'Delete']
}
