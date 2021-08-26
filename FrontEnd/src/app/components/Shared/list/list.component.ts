import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  fruits:string[]=["mela","pera","banana","uva","melone","anguria","arancia","mandarino","limone","pompelmo"];
  

  constructor() { }

  ngOnInit(): void {
  }

}
