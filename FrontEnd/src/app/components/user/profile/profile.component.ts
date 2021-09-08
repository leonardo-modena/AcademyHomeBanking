import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {UserService} from "../../../services/user.service";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "./confirm-dialog/confirm-dialog.component";
import {ErrorService} from "../../../services/error.service";
import {User} from "../../../model/user";
import {AuthService} from "../../../services/auth.service";
import {BankAccount} from "../../../model/BankAccount";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  inactiveSubscription!:Subscription;
  inactive:boolean = false;

  user!: User;
  userSubcription!:Subscription;

  bankAccounts!: BankAccount[];
  bankAccountsSubscription!: Subscription;

  dateOfBirth!: Date;

  isDeleting = false;
  isCreatingNew = false;

  selectedBill: number = 0;
  deletingBill!: number;

  maxAmount = 5000000;

  constructor(private userService: UserService, private authService: AuthService, public dialog: MatDialog, private errorService: ErrorService) {
  }

  ngOnInit(): void {
    this.userSubcription = this.userService.user.subscribe((user: User) => {
      this.user = user;
      this.dateOfBirth = new Date(this.user.dateOfBirth);
      this.deletingBill = user.bankAccounts[0];
      this.userService.getBalance(this.user.bankAccounts[this.selectedBill]).subscribe((balance) => {
        this.maxAmount = balance;
      });
    });

    this.bankAccountsSubscription = this.userService.bankAccounts.subscribe((bankAccounts) => {
      this.bankAccounts = bankAccounts;
    });

    this.inactiveSubscription = this.userService.inactiveUser.subscribe((inactive) => {
      this.inactive = inactive;
    });
  }

  ngOnDestroy() {
    this.userSubcription.unsubscribe();
    this.bankAccountsSubscription.unsubscribe();
    this.inactiveSubscription.unsubscribe();
  }

  changeBill() {
    this.userService.getBalance(this.user.bankAccounts[this.selectedBill]).subscribe((balance) => {
      this.maxAmount = balance;
    });
  }

  onNewBill(form: NgForm): void{
    this.isCreatingNew = true;
    console.log(this.bankAccounts[form.controls.selectedBill.value].id);
    this.userService.createNewBill(form.controls.amount.value, this.bankAccounts[form.controls.selectedBill.value].id).subscribe(() => {
      this.isCreatingNew = false;
      this.userService.getUser(parseInt(this.user.id));
    }, () => {
      this.isCreatingNew = false;
    });
  }

  onCloseBill() {

    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.isDeleting = true;
        this.userService.deleteBill(this.deletingBill).subscribe(() => {
          this.userService.getUser(parseInt(this.user.id));
          this.isDeleting = false;
        }, () => {
          this.errorService.newError('Non è stato possibile cancellare il conto. Riprova.')
          this.isDeleting = false
        });
      }
    });
  }
}
