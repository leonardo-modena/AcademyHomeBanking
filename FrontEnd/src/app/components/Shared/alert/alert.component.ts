import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({opacity: 0}),
        animate(500, style({opacity: 1}))
      ]),
      transition('* => void', [
        animate(1500, style({opacity: 0}))
      ])
    ])
  ]
})
export class AlertComponent implements OnInit {

  allertMessage!: string;

  visible: boolean = false;

  visibilityTimeout!: any;

  constructor(private alertService: AlertService) { }

  ngOnInit(): void {
    this.alertService.actualAllert.subscribe( (msg) => {
      if(msg != ""){
        this.allertMessage = msg;
        this.showMessage()
      }

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
