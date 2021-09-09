import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  pageLoading: boolean = false;
  userId!: number;

  constructor(private userService: UserService, private authService:AuthService) { }

  ngOnInit() {

    this.authService.actualId.subscribe((id) => {
      this.userId = id;
      this.userService.getUser(this.userId);
    });
    this.pageLoading = true;

    this.userService.bankAccounts.subscribe(() => {
      setTimeout(() => {
        this.pageLoading = false;
      }, 1000);
    });
  }
}
