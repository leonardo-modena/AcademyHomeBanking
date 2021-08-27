import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from "@angular/forms";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  selectionChoicesValues = [
    {value: 'last10', description: 'Ultime 10 operazioni'},
    {value: 'last3', description: 'Ultimi 3 mesi'},
    {value: 'dateSelection', description: 'Dal ... al ...'}
  ]


  dateSelection:boolean = false;
  selectedChoice = 'last10';
  today: Date = new Date();

  invalidDate = false;

  filterForm!:FormGroup;



  constructor() { }

  ngOnInit(): void {
    this.filterForm = new FormGroup({
      'selectedChoice': new FormControl(this.selectedChoice),
      'startDate': new FormControl(this.today),
      'endDate': new FormControl(this.today, /*filterDateValidator(this.startDate)*/)
    });
  }

  onChangeChoice(event: any) {
    this.selectedChoice = event.target.value.substring(3);
  }

  onChangeVisualization() {

    const selectedChoiceValue = this.filterForm.controls.selectedChoice;

    if (selectedChoiceValue.value === 'dateSelection') {
      this.dateSelection = true;
      if(new Date(this.filterForm.controls.startDate.value) <= new Date(this.filterForm.controls.endDate.value)) {
        this.invalidDate = false;
        //GET BETWEEN DATES
      }
      else {
        this.invalidDate = true;
      }
    }
    else {
      this.dateSelection = false;
      if (selectedChoiceValue.value === 'last10') {
        //GET LAST 10
      }
      else {
        //GET LAST 3 MONTH
      }
    }
  }
}
