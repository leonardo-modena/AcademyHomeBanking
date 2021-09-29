import {Component, Input, OnInit} from '@angular/core';
import {Operation} from "../../../model/operation";

@Component({
  selector: 'app-operation-list',
  templateUrl: './operation-list.component.html',
  styleUrls: ['./operation-list.component.css']
})
export class OperationListComponent implements OnInit {

  @Input() operationsList: Operation[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
