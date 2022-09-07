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

  assemblySelectedArray: any[] = [];

  currentAssemblyLength: number = 0;

  // Booth
  boothList: any[] = [];

  boothSelected!: any[];

  form!: FormGroup;

  electionData: any = [{}];

  noData: boolean = false;

  isChecked: any;


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

  // use constituency dropdown to get constituencyId
  loadBooth() {
    if (this.assemblySelectedArray.length !== 0) {
      if (this.assemblySelectedArray.length !== this.currentAssemblyLength) {

        this.currentAssemblyLength = this.assemblySelectedArray.length;

        this.assemblySelectedArray.forEach(assembly => {

          // console.log(assembly)
          // console.log(assembly.Id)
          this.boothList.length = 0;

          this.electionService.getBooth(assembly.Id).subscribe(response => {
            for (let prop in response) {
              if (response[prop] !== 0) {
                this.boothList.push(...response[prop]);
                console.log(`Booth length `, this.boothList.length);
              }
            }
          })
        })
      }
    }

  }


  assemblySubmit() { }
  onConstituencySelect() {

  }


  // use to gather data and push it data source
  displayData() {
    console.log('disply  clicked');
  }

  getChecked(data: any) {
    this.assemblySelectedArray.push(data);
    this.loadBooth()
  }

  displayedColumns: String[] = ['rowNumber', 'ElectionName', 'Constituency', 'Assembly', 'BoothNo', 'VotersNo', 'Edit', 'Delete']
}
