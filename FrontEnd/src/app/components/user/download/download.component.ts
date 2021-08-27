import {Component, Input, OnInit} from '@angular/core';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

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
    console.log('Downloading...');


    let docDefinition = {
      header: 'C#Corner PDF Header',
      content: "sdjfdsf"
      }
    pdfMake.createPdf(docDefinition).download('transazione.pdf');
  }
}

