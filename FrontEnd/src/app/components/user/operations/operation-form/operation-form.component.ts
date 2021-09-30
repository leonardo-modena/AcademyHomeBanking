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
  moreThanAmountError = false;

  inputAmount!: number;

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
      'reason': new FormControl(''),
      'recipient': new FormControl(''),
      'telephone': new FormControl('')
    });

    if (this.op_type === 'DEPOSIT') {
      this.maxAmount = 5000;
    }

    if (this.operationForm) {
      if (this.op_type === 'DEPOSIT') {
        this.operationForm.controls["reason"].setValidators([Validators.required, Validators.maxLength(100)]);
      }
      else {
        this.operationForm.controls["recipient"].setValidators([Validators.required, Validators.maxLength(100)]);
        this.operationForm.controls["telephone"].setValidators([Validators.required, Validators.pattern("[0-9 ]{11}")]);
      }
    }


  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
    clearTimeout(this.timer)
  }

  onChangeBill(event: any) {
    this.selectedBill = this.user.bankAccounts[event.target.options.selectedIndex];
   this.getBalance();
  }

  private getBalance() {
    this.userService.getBalance(this.selectedBill).subscribe((balance) => {
      this.maxAmount = balance;
      this.moreThanAmountError = this.operationForm.controls.amount.value > balance;
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
      const reason = `Ricarica cellulare ${this.operationForm.controls.recipient.value.trim()} n. ${this.operationForm.controls.telephone.value}`;
      this.userService.doWithdrawal(this.operationForm.controls.bill.value, this.operationForm.controls.amount.value, reason ).subscribe(() => {
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

  formatAmount(amountInput: any) {
    let amountString = amountInput.target?.value;

    for (let i = 0; i < amountString.length; i++) {
      if (amountString.charAt(i) !== '.') {
        if (amountString.charAt(i) === ',') {
          amountString = amountString.substring(0, i) + '.' + amountString.substring(i+1);
        }
      }
      else {
        amountString = amountString.substring(0, i) + amountString.substring(i+1);
      }
    }
    if (parseFloat(amountString)) {
      console.log(parseFloat(amountString + 'dd'));
    }
    else {

    }
  }
}
