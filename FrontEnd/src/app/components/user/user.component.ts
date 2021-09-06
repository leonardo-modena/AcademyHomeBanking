import {AfterContentChecked, Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, AfterContentChecked {
  pageLoading: boolean = false;
  inactive:boolean = false;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.pageLoading = true;
    this.userService.bankAccounts.subscribe((bankAccounts) => {
      if (bankAccounts.length === 1 && bankAccounts[0].account_status === 'INACTIVE') {
        this.inactive = true;
      }
      else {
        this.inactive = false;
      }
    });
  }

  ngAfterContentChecked(): void{
    if (this.pageLoading){
      setTimeout(() => {
        this.pageLoading = false
      }, 2000);
    }
  }
}
