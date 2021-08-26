import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css']
})
export class DownloadComponent implements OnInit {

  @Input() downloadData!:any;

  constructor() { }

  ngOnInit(): void {
  }

  // Scarica in formato pdf l'elenco dei movimenti selezionati
  download(): void {
    console.log('Downloading...')
  }
}
