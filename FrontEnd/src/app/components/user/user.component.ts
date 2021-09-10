import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {AuthService} from "../../services/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  pageLoading: boolean = false;
  userId!: number;


  idSubscription!: Subscription;
  loadingSubscription!: Subscription;

  constructor(private userService: UserService, private authService:AuthService) { }

  ngOnInit() {
    this.pageLoading = true;

    this.idSubscription = this.authService.actualId.subscribe((id) => {
      this.userId = id;
      this.userService.getUser(this.userId);
    });

    this.loadingSubscription = this.userService.bankAccounts.subscribe(() => {
      setTimeout(() => {
        this.pageLoading = false;
      }, 1000);
    });
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
    this.idSubscription.unsubscribe();
  }
}
