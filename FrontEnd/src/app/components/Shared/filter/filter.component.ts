import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {animate, style, transition, trigger} from "@angular/animations";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
  animations: [
    trigger('fadeIn', [
      transition('void => *', [
        style({opacity: 0}),
        animate(1000, style({opacity: 1}))
      ]),
      transition('* => void', [
        animate(500, style({opacity: 0}))
      ])
    ])
  ]
})
export class FilterComponent implements OnInit {

  selectionChoicesValues = [
    {value: 'last10', description: 'Ultime 10 operazioni'},
    {value: 'last3', description: 'Ultimi 3 mesi'},
    {value: 'dateSelection', description: 'Dal ... al ...'}
  ];

  @Input() onSearchFunction:any;


  dateSelection:boolean = false;
  selectedChoice = 'last10';
  today: Date = new Date();

  invalidDate = false;

  filterForm!:FormGroup;
  isVisible = true;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
   const stringToday = this.today.getFullYear() + '-' + (this.today.getMonth() + 1).toString().padStart(2, '0') + '-' + this.today.getDate().toString().padStart(2, '0');
    this.filterForm = new FormGroup({
      'selectedChoice': new FormControl(this.selectedChoice),
      'startDate': new FormControl(stringToday),
      'endDate': new FormControl(stringToday)
    });
  }

  toggleFilter() {
    this.isVisible = !this.isVisible;
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
      }
      else {
        this.invalidDate = true;
      }
    }
    else {
      this.invalidDate = false;
      this.dateSelection = false;
    }
  }

  onSubmit() {
    const selectedChoiceValue = this.filterForm.controls.selectedChoice;
    this.onSearchFunction(true);
    if (selectedChoiceValue.value === 'dateSelection' && !this.invalidDate) {
      //Get between dates
      this.userService.getOperationList({type: 'dateSelection', startDate: this.filterForm.controls.startDate.value, endDate: this.filterForm.controls.endDate.value});
    }
    else {
      this.userService.getOperationList({type: selectedChoiceValue.value})
    }
  }
}
