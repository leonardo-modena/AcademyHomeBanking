import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../../services/user.service";
import {ErrorService} from "../../../../services/error.service";
import {User} from "../../../../model/user";

@Component({
  selector: 'app-operation-form',
  templateUrl: './operation-form.component.html',
  styleUrls: ['./operation-form.component.css']
})
export class OperationFormComponent implements OnInit {

  user!: User;

  @Input() op_type!: 'deposit' | 'taking';
  operation_ok = false;
  operationForm!:FormGroup;

  @Output() isLoading = new EventEmitter<boolean>();

  constructor(private userService: UserService, private errorService: ErrorService) { }

  ngOnInit(): void {

    this.userService.user.subscribe((user) => {
      this.user = user;
    })
    this.operationForm = new FormGroup({
      'bill': new FormControl(this.user.bankAccounts[0], Validators.required),
      'amount': new FormControl('', Validators.required),
      'reason': new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    console.log(this.operationForm.value);
    console.log(this.operationForm.value.bill);
    this.isLoading.emit(true); // Nella subscribe this.isLoading.emit(false)
    if (this.op_type === 'deposit') {
      this.userService.doDeposit(this.operationForm.value.bill, this.operationForm.value.amount, this.operationForm.controls.reason.value ).subscribe(() => {
        this.isLoading.emit(false);
      }, () => {
        this.isLoading.emit(false);
        this.errorService.newError('L\'operazione non è andata a buon fine. Riprova');
      });
    }
    else {
      this.userService.doWithdrawal(this.operationForm.controls.bill.value, this.operationForm.controls.amount.value, this.operationForm.controls.reason.value ).subscribe(() => {
        this.isLoading.emit(false);
      }, () => {
        this.isLoading.emit(false);
        this.errorService.newError('L\'operazione non è andata a buon fine. Riprova');
      });
    }
  }

}
