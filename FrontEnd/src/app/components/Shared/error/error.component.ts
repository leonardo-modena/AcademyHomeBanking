import { Component, OnDestroy, OnInit } from '@angular/core';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit, OnDestroy {



  errorMessage!: string;
  visible: boolean = false;

  visibilityTimeout!: any;

  constructor(private errorService: ErrorService) { }

  ngOnInit(): void {
    this.errorService.error.subscribe(
      (incomingError: string) => {
        this.errorMessage = incomingError;
        this.showMessage();
      }
    )
  }

  showMessage(): void{
    this.visible = true
    this.visibilityTimeout = setTimeout(() => {
      this.visible = false
    }, 10000);
  }

  exitClick(): void{
    clearTimeout(this.visibilityTimeout);
    this.visible = false;
  }

  ngOnDestroy(): void{
    clearTimeout(this.visibilityTimeout)
  }

}
