import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  electionFrom!: FormGroup;

  // Election
  electionList: any[] = [];

  electionSelected!: number;

  // Constituency
  constituencyList: any[] = [];

  constituencySelected!: number;

  // Assembly
  assemblyList: any[] = [];
  ;

  assemblySelectedArray: any[] = [];

  // Booth
  boothList: any[] = [];

  boothSelected!: any[];



  electionData: any = [{}];

  noData: boolean = false;

  isChecked: any;


  constructor(private electionService: ElectionService, private formBuilder: FormBuilder) {
    this.electionFrom = this.formBuilder.group({
      electionId: ['0', Validators.required],
      constituencyId: ['0', Validators.required],

      assemblyList: this.formBuilder.array([]),
      boothList: this.formBuilder.array([])

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

  // called when assembly checkbox checked or unchecked
  // it loads data in booth depending upon is any checkbox checked or not checked
  loadBooth() {
    if (this.assemblySelectedArray.length !== 0) {
      this.assemblySelectedArray.forEach(assembly => {
        this.electionService.getBooth(assembly.Id).subscribe(response => {
          for (let prop in response) {
            if (response[prop] !== 0) {
              this.boothList.push(...response[prop]);
            }
          }
        })
      })

    }
  }

  assemblySubmit() { }
  onConstituencySelect() {
  }

  // use to gather data and push it data source
  displayData() {
    console.log('disply  clicked');
  }

  // also reset boothList array to load new responce data
  // on cheeckbox check or uncheck event
  // if isChecked
  // it push the value inside assembly array
  // then it calles loadBooth() which makes http request based on id
  // if isUnchecked
  // get the index of assembly array
  // take that element out
  // run loadBooth()
  getChecked(data: any, id: string, isChecked: boolean) {
    if (isChecked) {
      this.assemblySelectedArray.push({ ...data, id });
    } else {
      let index = this.assemblySelectedArray.findIndex(obj => { return obj.id === id })
      this.assemblySelectedArray.splice(index, 1);
    }
    this.boothList.length = 0;
    this.loadBooth()
  }

  displayedColumns: String[] = ['rowNumber', 'ElectionName', 'Constituency', 'Assembly', 'BoothNo', 'VotersNo', 'Edit', 'Delete']
}
