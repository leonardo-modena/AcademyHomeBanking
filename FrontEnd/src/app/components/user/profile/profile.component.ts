import {Component, Input, OnInit} from '@angular/core';
import {FormGroup, NgForm} from "@angular/forms";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @Input() user!: {nome: string, cognome: string, dataDiNascita: number, email: string, id: string};
  dataDiNascita!: Date;

  bills = [
    {billNumber: 235433, amount: 642.45, userId: 'C232'},
    {billNumber: 235432, amount: 12.45, userId: 'C232'}
  ];

  selectedBill: number = 0;
  maxAmount = this.bills[this.selectedBill].amount;
  constructor() {

  }

  ngOnInit(): void {
    this.dataDiNascita = new Date(this.user.dataDiNascita);
  }

  onNewBill(form: NgForm): void{
    console.log(form.form.value);
  }
}
