import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { BankAccount } from 'src/app/model/BankAccount';
import { User } from 'src/app/model/user';
import { DownloadService } from 'src/app/services/download.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  @Input() operation!: boolean;

  @Input() toDeleteAccounts!: BankAccount[];

  @Input() allUsers!: User[];

  @Input() newRegistration!: BankAccount[];

  @Input() loading!: boolean;
  
  @Output() confirmAccountEventList = new EventEmitter();
  @Output() confirmDeleteEventList = new EventEmitter();


  fillIcon: boolean = false;

  constructor(private downloadService: DownloadService) { }

  ngOnInit(): void {
  }

  passConfirmAccountList(): void{
    this.confirmAccountEventList.emit()
  }

  passConfirmDeleteList(): void{
    this.confirmDeleteEventList.emit()
  }

  downloadExcel(): void{
    this.downloadService.downloadAsXLSX(this.allUsers)
  }

  iconSwitch(): void{
    this.fillIcon = !this.fillIcon
  }

}
