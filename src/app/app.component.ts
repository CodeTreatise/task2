import { Component, OnInit } from '@angular/core';
import { ElectionService } from './election.service';
import { Constituency } from './model/constituency';
import { Responce } from './model/responce';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'task - 2';

  listconstituency!: any;

  electionData: any = [{}];


  constructor(private electionService: ElectionService) {

  }

  ngOnInit(): void {
    this.onElectionSelected();
  }

  onElectionSelected() {
    this.electionService.getElectionName().subscribe(response => {
      for (let prop in response) {
        if (response[prop] !== 0) {
          this.listconstituency = response[prop];
        }
      }
      console.log(this.listconstituency);

    })
  }


  onConstituencySelected() {

  }

  displayedColumns: String[] = ['rowNumber', 'ElectionName', 'Constituency', 'Assembly', 'BoothNo', 'VotersNo', 'Edit', 'Delete']
}
