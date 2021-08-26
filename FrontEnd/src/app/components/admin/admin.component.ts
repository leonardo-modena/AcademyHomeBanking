import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  adminInfo!: {nome: string, cognome: string};

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.adminService.actualAdmin.subscribe( (admin) => {
      this.adminInfo = admin;
    } )
  }

}
