import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  allertMessage!: string;

  constructor(private alertService: AlertService) { }

  ngOnInit(): void {
    this.alertService.actualAllert.subscribe( (msg) => {
      this.allertMessage = msg;
    })
  }

}
