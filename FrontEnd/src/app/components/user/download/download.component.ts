import {Component, Input, OnInit} from '@angular/core';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
const htmlToPdfmake = require("html-to-pdfmake");
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
    // let content = [];
    // content.push({text:'Academy Bank', style:'h1'});
    // content.push({text:'paragrafo con la descrizione', style: 'p'})
    //
    // let docDefinition = {
    //   content: [content],
    //   styles: {
    //     'h1': {
    //       fontSize: 30,
    //       color: '#2f2f2f',
    //     },
    //   }
    // }

    let html = `
      <div>
        <h1>My title</h1>
        <p>
          This is a sentence with a <strong>bold word</strong>, <em>one in italic</em>,
          and <u>one with underline</u>. And finally <a href="https://www.somewhere.com">a link</a>.
        </p>
      </div>
`   ;

    const docDefinition = {
      content: [
        htmlToPdfmake(html)
      ],
    };

    pdfMake.createPdf(docDefinition).download('transazione.pdf');
  }
}

