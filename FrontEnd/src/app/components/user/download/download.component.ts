import {Component, Input, OnInit} from '@angular/core';
import {DownloadService} from "../../../services/download.service";
import {Operation} from "../../../model/operation";


@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css']
})
export class DownloadComponent implements OnInit {

  @Input() downloadData!: Operation[];

  constructor(private downloadService: DownloadService) { }

  ngOnInit(): void {
  }

  // Scarica in formato pdf l'elenco dei movimenti selezionati
  download(): void {

    let list =``;
    let toPDF = `<div><h3 style="margin-bottom: 20px">Movimenti del conto: ${this.downloadData[0].idAccount.toString().padStart(6, '0')} </h3><table style="" class='green'>`

    if ( this.downloadData.length === 0){
      list = 'Non sono presenti operazioni.';
    }
    this.downloadData.map((operation: any) => {
      const date = new Date(operation.dateTransaction);
      list += `
      <tr class='row'>
        <td style="text-align:left; border: none;">
          <h4>${operation.causal}</h4>
          <p>${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()} - ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}</p>
        </td>
        <td style="border: none">
          <div>
          <h3 style="text-align: right; color: ${operation.type === 'DEPOSIT' ? '#2c6e49' : '#d68c45'}" ">€ ${operation.type === 'DEPOSIT' ? '' : '-'} ${operation.amount}</h3>
          </div>
        </td>
      </tr>`
    });

    toPDF += list + '</table></div>';
    this.downloadService.downloadAsPDF(toPDF, [this.downloadData[0].idAccount]);
  }
}

