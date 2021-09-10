import {Component, Input, OnInit} from '@angular/core';
import {Operation} from "../../../../model/operation";
import {DownloadService} from "../../../../services/download.service";

@Component({
  selector: 'app-opertation-item',
  templateUrl: './opertation-item.component.html',
  styleUrls: ['./opertation-item.component.css']
})
export class OperationItemComponent implements OnInit {

  @Input() operation!: Operation;


  constructor(private downloadService: DownloadService) { }

  ngOnInit(): void {
  }

  downloadItem() {
  const date = new Date(this.operation.dateTransaction);
    const body = `
                <h2 style="margin-bottom: 20px">Dettagli dell'operazione n. ${this.operation.idTransaction}</h2>
                <p>CAUSALE: ${this.operation.causal}</p>
                <p>TIPO DI OPERAZIONE: ${this.operation.type === 'WITHDRAWAL' ? 'Versamento' : 'Deposito'}</p>
                <p>IMPORTO: € <span class="color: ${this.operation.type === 'WITHDRAWAL' ? '#d68c45' : '#2c6e49'}">${this.operation.type === 'WITHDRAWAL' ? '-' : ''}${this.operation.amount}</span></p>
                <p>DATA ESECUZIONE: ${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()} - ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}</p>`;
    this.downloadService.downloadAsPDF(body, [this.operation.idAccount]);
  }

}
