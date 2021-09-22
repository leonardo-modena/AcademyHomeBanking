import { Location } from '@angular/common';
import {Component, OnDestroy, OnInit} from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
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


  constructor(private userService: UserService, private route: ActivatedRoute, private location: Location) { }

  ngOnInit(): void {

    this.route.params.subscribe( (params) => {
      if (params['operationType'] === 'versamento') {
        this.selectedOperation = 0;
      }else {
        this.selectedOperation = 1;
        this.location.replaceState('/user/operazioni/ricarica')
      }
    })

    this.inactiveSubscription = this.userService.inactiveUser.subscribe((inactive) => {
      this.inactive = inactive;
    });

    this.closingSubscription = this.userService.closingAccount.subscribe((closing) => {
      this.closing = closing;
    });
  }

  changeUrl($event: MatTabChangeEvent){
    this.location.replaceState(`/user/operazioni/${$event.tab.textLabel.toLocaleLowerCase()}`)
  }

  ngOnDestroy() {
    this.inactiveSubscription.unsubscribe();
    this.closingSubscription.unsubscribe();
  }


}
