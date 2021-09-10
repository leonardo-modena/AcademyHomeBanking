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
    console.log(this.downloadData);
    let toPDF = `<div><h3 style="margin-bottom: 20px">Movimenti del conto: ${this.downloadData[0].idAccount.toString().padStart(6, '0')} </h3>`

    this.downloadData.map((operation: any) => {
      const date = new Date(operation.dateTransaction);
      list += `<table style="" class='green'>
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
      </tr>
    </table>`
    //     `
    // <table style="">
    //   <tr>
    //     <td style="text-align:center">
    //       <p>${operation.causal}</p>
    //       <p>${operation.dateTransaction.getDate().toString().padStart(2, '0')}/${(operation.dateTransaction.getMonth() + 1).toString().padStart(2, '0')}/${operation.dateTransaction.getFullYear()} - ${operation.dateTransaction.getHours().toString().padStart(2, '0')}:${operation.dateTransaction.getMinutes().toString().padStart(2, '0')}</p>
    //     </td>
    //     <td>
    //       <div>
    //       <p style="text-align: right; color: ${operation.type === 'DEPOSIT' ? 'green' : 'red'}" ">${(operation.type === 'WITHDRAWAL' ? '-' : '')}${operation.importo}</p>
    //       </div>
    //     </td>
    //   </tr>
    // </table>`
    });

    //`
    //         <div style="display: flex; justify-content: space-between; margin-bottom: 10px; border-radius: 5px; padding: 10px; border: 1px solid green">
    //           <div>
    //             <h4>${operation.causal}</h4>
    //             <p>${operation.dateTransaction.getDate().toString().padStart(2, '0')}/${(operation.dateTransaction.getMonth() + 1).toString().padStart(2, '0')}/${operation.dateTransaction.getFullYear()} - ${operation.dateTransaction.getHours().toString().padStart(2, '0')}:${operation.dateTransaction.getMinutes().toString().padStart(2, '0')}</p>
    //           </div>
    //           <div>
    //             <p style="text-align: right; color: ${operation.type === 'prelievo' ? 'red' : 'green'}" ">${(operation.type === 'WITHDRAWAL' ? '-' : '')}${operation.importo}</p>
    //           </div>
    //         </div>`


    toPDF += list + '</div>';
    this.downloadService.downloadAsPDF(toPDF, [this.downloadData[0].idAccount]);
  }
}

