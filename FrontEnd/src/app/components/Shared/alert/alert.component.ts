import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  allertMessage!: string;

  visible: boolean = false;

  visibilityTimeout!: any;

  constructor(private alertService: AlertService) { }

  ngOnInit(): void {
    this.alertService.actualAllert.subscribe( (msg) => {
      this.allertMessage = msg;
      this.showMessage()
    })
  }

  showMessage(): void {
    this.visible = true;
    this.visibilityTimeout = setTimeout(() => {
      this.visible = false;
    }, 10000);
  }

  ngOnDestroy(): void {
    clearTimeout(this.visibilityTimeout);
  }

}
