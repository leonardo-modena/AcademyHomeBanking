import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-operation-form',
  templateUrl: './operation-form.component.html',
  styleUrls: ['./operation-form.component.css']
})
export class OperationFormComponent implements OnInit {

  @Input() op_type!: 'deposit' | 'taking';
  operation_ok = false;
  operationForm!:FormGroup;

  @Output() isLoading = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
    this.operationForm = new FormGroup({
      'bill': new FormControl('Conto 2', Validators.required),
      'amount': new FormControl('', Validators.required),
      'reason': new FormControl('', Validators.required),
      'category': new FormControl('Categoria 2', Validators.required)
    });
  }

  private onSubmitDeposit() {

    this.operation_ok = true;
    setTimeout(() => {
      this.operation_ok = false;
    }, 5000);

    console.log({...this.operationForm.value, type: 'deposit'});
  }

  private onSubmitTaking() {
    this.operation_ok = true;
    setTimeout(() => {
      this.operation_ok = false;
    }, 5000);
  }

  onSubmit() {
    console.log(this.operationForm.value);
    this.isLoading.emit(true); // Nella subscribe this.isLoading.emit(false)

    if (this.op_type === 'deposit') {
      this.onSubmitDeposit();
    }
    else {
      this.onSubmitTaking();
    }
  }

}
