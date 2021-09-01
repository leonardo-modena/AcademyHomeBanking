import {Component, Input, OnInit} from '@angular/core';
import {DownloadService} from "../../../services/download.service";


@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css']
})
export class DownloadComponent implements OnInit {

  @Input() downloadData!:any;

  constructor(private downloadService: DownloadService) { }

  ngOnInit(): void {
  }

  // Scarica in formato pdf l'elenco dei movimenti selezionati
  download(): void {

    let list =``;
    this.downloadData.map((operation: any) => {
      list += `
        <div style="display: flex; justify-content: space-between; margin-bottom: 10px; border-radius: 5px; padding: 10px; border: 1px solid green">
          <div>
            <h4>${operation.causale}</h4>
            <p>${(operation.type === 'prelievo' ? operation.beneficiario : operation.mittente)}</p>
          </div>
          <div>
            <p style="text-align: right; color: ${operation.type === 'prelievo' ? 'red' : 'green'}" ">${(operation.type === 'prelievo' ? '-' : '')}${operation.importo}</p>
          </div>
        </div>`
    });

    this.downloadService.downloadAsPDF(list);
  }
}

