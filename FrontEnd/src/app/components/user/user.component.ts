import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user!: {nome: string, cognome: string, dataDiNascita: number, email: string, id: string};
  saldo: number = 0;
  constructor(private userService: UserService) {
  }

  list = [
    {tipo: 'versamento', importo: '30,52', data: 1629410400000, mittente: "Mamma", id: 1},
    {tipo: 'prelievo', importo: '22,43', data: 1629410400000, beneficiario: "Panificio Nicolò", id: 2}
  ]
  ngOnInit(): void {
    this.userService.user.subscribe((user: { nome: string, cognome: string, dataDiNascita: number, email: string, id: string }) => {
      this.user = user;
      console.log(this.user);
    });

    // this.userService.getSaldo().subscribe((saldo) => {
    //   this.saldo = saldo;
    // })
    this.saldo = this.userService.getSaldo();
  }

}
