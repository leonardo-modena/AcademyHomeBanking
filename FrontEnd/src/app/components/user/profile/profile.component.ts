import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {UserService} from "../../../services/user.service";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "./confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user!: {nome: string, cognome: string, dataDiNascita: number, email: string, id: string};
  dataDiNascita!: Date;

  bills = [
    {billNumber: 235433, amount: 642.45, userId: 'C232'},
    {billNumber: 235432, amount: 12.45, userId: 'C232'}
  ];

  selectedBill: number = 0;
  maxAmount = this.bills[this.selectedBill].amount;
  constructor(private userService: UserService, public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.userService.user.subscribe((user) => {
      this.user = user;
      this.dataDiNascita = new Date(this.user.dataDiNascita);
    });
  }

  onNewBill(form: NgForm): void{
    console.log(form.form.value);
  }


  onCloseBill() {

    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // DELETE CONTO
      }
    });
  }
}
