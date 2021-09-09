import {Component, Input, OnDestroy, OnInit, Output, EventEmitter} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {animate, style, transition, trigger} from "@angular/animations";
import {UserService} from "../../../services/user.service";
import {User} from "../../../model/user";
import {Subscription} from "rxjs";


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
export class FilterComponent implements OnInit, OnDestroy {

  selectionChoicesValues = [
    {value: 'lastTen', description: 'Ultime 10 operazioni'},
    {value: 'lastThreeMonths', description: 'Ultimi 3 mesi'},
    {value: 'betweenTwoDates', description: 'Dal ... al ...'}
  ];

  user!: User;
  userSubscription!: Subscription;

  // @Input() onSearchFunction:any;
  @Input() selectedBill: number = 0;
  @Output() filterString = new EventEmitter<string>();


  dateSelection:boolean = false;
  selectedChoice = this.selectionChoicesValues[0].value;
  today: Date = new Date();

  invalidDate = false;

  filterForm!:FormGroup;
  isVisible = true;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userSubscription = this.userService.user.subscribe((user) => {
      this.user = user;
    });

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
    console.log(event.target.value);
    this.selectedChoice = event.target.value.substring(3);
  }

  onChangeVisualization() {

    const selectedChoiceValue = this.filterForm.controls.selectedChoice;

    if (selectedChoiceValue.value === 'betweenTwoDates') {
      this.dateSelection = true;
      if (new Date(this.filterForm.controls.startDate.value) <= new Date(this.filterForm.controls.endDate.value)) {
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
    if (selectedChoiceValue.value === 'betweenTwoDates' && !this.invalidDate) {
      //Get between dates

      const startDate = new Date(this.filterForm.controls.startDate.value + ' 00:00:00');
      const endDate = new Date(this.filterForm.controls.endDate.value + ' 23:59:00');
      const startDateMillisec = startDate.getTime();
      const endDateMillisec = endDate.getTime();

      this.userService.getOperationList(this.user.bankAccounts[this.selectedBill], {type: 'betweenTwoDates', startDate: startDateMillisec, endDate: endDateMillisec});
      this.filterString.emit(`Stai visualizzando le operazioni effettuate dal
                                    ${startDate.getDate().toString().padStart(2, '0')}/${(startDate.getMonth() + 1).toString().padStart(2, '0')}/${startDate.getFullYear()}
                                    al ${endDate.getDate().toString().padStart(2, '0')}/${(endDate.getMonth() + 1).toString().padStart(2, '0')}/${endDate.getFullYear()}.` )
    }
    else {
      this.userService.getOperationList(this.user.bankAccounts[this.selectedBill], {type: selectedChoiceValue.value, startDate: 0, endDate: 0});
      if (selectedChoiceValue.value === 'lastTen') {
        this.filterString.emit('Stai visualizzando le ultime 10 operazioni.');
      }
      else {
        this.filterString.emit('Stai visualizzando le operazioni degli ultimi 3 mesi.');
      }
    }
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
