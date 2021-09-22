import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Subscription} from "rxjs";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.css']
})
export class OperationsComponent implements OnInit, OnDestroy {
  
  selectedOperation!: number;

  inactiveSubscription!:Subscription;
  inactive:boolean = false;

  closingSubscription!:Subscription;
  closing: boolean = false;

  isLoading!: boolean;


  constructor(private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.params.subscribe( (params) => {
      this.selectedOperation = (params['operationType'] === 'versamento') ? 0 : 1;
    })

    this.inactiveSubscription = this.userService.inactiveUser.subscribe((inactive) => {
      this.inactive = inactive;
    });

    this.closingSubscription = this.userService.closingAccount.subscribe((closing) => {
      this.closing = closing;
    });
  }

  ngOnDestroy() {
    this.inactiveSubscription.unsubscribe();
    this.closingSubscription.unsubscribe();
  }


}
