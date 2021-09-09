import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.css']
})
export class OperationsComponent implements OnInit, OnDestroy {

  inactiveSubscription!:Subscription;
  inactive:boolean = false;

  isLoading!: boolean;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.inactiveSubscription = this.userService.inactiveUser.subscribe((inactive) => {
      this.inactive = inactive;
    });
  }

  ngOnDestroy() {
    this.inactiveSubscription.unsubscribe();
  }


}
