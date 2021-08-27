import {Component, Input, OnInit} from '@angular/core';
import {Operation} from "../../../../model/operation";

@Component({
  selector: 'app-opertation-item',
  templateUrl: './opertation-item.component.html',
  styleUrls: ['./opertation-item.component.css']
})
export class OpertationItemComponent implements OnInit {

  @Input() operation!: Operation;

  constructor() { }

  ngOnInit(): void {
  }

}
