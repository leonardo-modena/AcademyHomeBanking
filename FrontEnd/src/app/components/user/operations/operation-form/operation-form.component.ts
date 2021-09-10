import {Component, Input, OnInit, Output, EventEmitter, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../../services/user.service";
import {User} from "../../../../model/user";
import {Subscription} from "rxjs";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-operation-form',
  templateUrl: './operation-form.component.html',
  styleUrls: ['./operation-form.component.css']
})
export class OperationFormComponent implements OnInit, OnDestroy {

  user!: User;
  userSubscription!: Subscription;

  operation_ok = false;
  timer:any;

  @Input() op_type!: 'DEPOSIT' | 'WITHDRAWAL';

  operationForm!:FormGroup;
  maxAmount: number = 5000000;
  selectedBill!: number;

  @Output() isLoading = new EventEmitter<boolean>(false);

  constructor(private userService: UserService, private titleService: Title) { }

  ngOnInit(): void {

    this.userSubscription = this.userService.user.subscribe((user) => {
      this.user = user;

      this.titleService.setTitle(
        `OPERA SUL CONTO | ${this.user.firstName} ${this.user.lastName}`
      );

      if (user.bankAccounts.length > 0) {
        this.selectedBill = this.user.bankAccounts[0];
        this.getBalance();
      }
    });
    this.operationForm = new FormGroup({
      'bill': new FormControl(this.user.bankAccounts[0], Validators.required),
      'amount': new FormControl('', Validators.required),
      'reason': new FormControl('', [Validators.required, Validators.maxLength(100)])
    });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
    clearTimeout(this.timer)
  }

  onChangeBill() {
   this.getBalance();
  }

  private getBalance() {
    this.userService.getBalance(this.selectedBill).subscribe((balance) => {
      this.maxAmount = balance;
    });
  }

  onSubmit() {
    this.isLoading.emit(true);
    if (this.op_type === 'DEPOSIT') {
      this.userService.doDeposit(this.operationForm.value.bill, this.operationForm.value.amount, this.operationForm.controls.reason.value ).subscribe(() => {
        this.operationDoneCorrectly();
      }, () => {
        this.isLoading.emit(false);
      });
    }
    else {
      this.userService.doWithdrawal(this.operationForm.controls.bill.value, this.operationForm.controls.amount.value, this.operationForm.controls.reason.value ).subscribe(() => {
        this.operationDoneCorrectly();
      }, () => {
        this.isLoading.emit(false);
      });
    }

    this.timer = setTimeout(() => {
      this.operation_ok = false;
    }, 5000);
  }

  private operationDoneCorrectly() {
    this.userService.getUser(parseInt(this.user.id));
    this.operation_ok = true;
    this.isLoading.emit(false);
    this.operationForm.reset({'bill': this.user.bankAccounts[0]});
  }

}
