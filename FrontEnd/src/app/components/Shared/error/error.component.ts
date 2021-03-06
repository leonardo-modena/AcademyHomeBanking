import { Component, OnDestroy, OnInit } from '@angular/core';
import { fadeAnimation } from 'src/app/animation/animations';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
  animations: [
    fadeAnimation
  ]
})
export class ErrorComponent implements OnInit, OnDestroy {
  errorMessage!: string;
  visible: boolean = false;

  visibilityTimeout!: any;

  constructor(private errorService: ErrorService) {}

  ngOnInit(): void {
    this.errorService.error.subscribe((incomingError: string) => {
      if (incomingError) {
        this.errorMessage = incomingError;
        this.showMessage();
      }
    });
  }

  showMessage(): void {
    this.visible = true;
    this.visibilityTimeout = setTimeout(() => {
      this.visible = false;
    }, 10000);
  }

  exitClick(): void {
    clearTimeout(this.visibilityTimeout);
    this.visible = false;
  }

  ngOnDestroy(): void {
    clearTimeout(this.visibilityTimeout);
  }
}
