import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  pageLoading: boolean = false;

  constructor() { }

  ngOnInit() {
    this.pageLoading = true;
  }

  ngAfterContentChecked(): void{
    if (this.pageLoading){
      setTimeout(() => {
        this.pageLoading = false
      }, 2000);
    }
  }
}
