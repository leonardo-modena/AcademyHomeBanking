import {Component, Input, OnInit} from '@angular/core';
import {Operation} from "../../../../model/operation";
import {DownloadService} from "../../../../services/download.service";

@Component({
  selector: 'app-opertation-item',
  templateUrl: './opertation-item.component.html',
  styleUrls: ['./opertation-item.component.css']
})
export class OpertationItemComponent implements OnInit {

  @Input() operation!: Operation;


  constructor(private downloadService: DownloadService) { }

  ngOnInit(): void {
  }

  downloadItem() {
  const operation_date = new Date(this.operation.dataPrelievo);
    const body = `<p>Tipo di operazione: ${this.operation.type}<br>
                        Operazione: ${this.operation.causale}<br>
                        Importo: ${this.operation.type === 'prelievo' ? '-' : ''}${this.operation.importo}<br>
                        Data: ${operation_date.toLocaleString()}
                        </p>`;
    this.downloadService.downloadAsPDF(body);

  }

}
