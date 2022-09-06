import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
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

  // Assembly
  assemblyList!: any[];

  assemblySelected!: any[];

  // Booth
  boothList!: any[];

  boothSelected!: any[];

  form!: FormGroup;

  electionData: any = [{}];

  noData: boolean = false;


  constructor(private electionService: ElectionService, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      assemblyList: []
    })
  }

  ngOnInit(): void {
    this.loadElections();
    this.loadAssembly();
  }

  // load the initial election list
  loadElections() {
    this.electionService.getElectionName().subscribe(response => {
      for (let prop in response) {
        if (response[prop] !== 0) {
          this.electionList = response[prop];
          // console.log(`Election List: ${this.electionList}`);
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

  loadAssembly() {
    this.electionService.getAssembly().subscribe(response => {
      for (let prop in response) {
        if (response[prop] !== 0) {
          this.assemblyList = response[prop];
          // console.log(`Assembly List: ${this.assemblyList}`);
        }
      }
    })
  }

  loadBooth() {
    this.electionService.getBooth(this.constituencySelected).subscribe(response => {
      for (let prop in response) {

        if (response[prop] !== 0 && response[prop] !== 1) {
          this.boothList = response[prop];
          console.log(`Booth List: ${this.boothList}`);
        } else {
          this.boothList = [];
          this.noData = true;
        }
      }
    })
  }


  assemblySubmit() { }

  onConstituencySelect() {
    this.loadBooth();
  }

  displayedColumns: String[] = ['rowNumber', 'ElectionName', 'Constituency', 'Assembly', 'BoothNo', 'VotersNo', 'Edit', 'Delete']
}
