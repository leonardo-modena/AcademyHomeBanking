import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import { Router} from "@angular/router";
import {Operation} from "../../model/operation";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user!: {nome: string, cognome: string, dataDiNascita: number, email: string, id: string};
  balance: number = 0;
  routeUrl: string = '';
  operations: Operation[] = [
    {
      type: 'prelievo',
      importo: 234.54,
      dataPrelievo: 1628763225000,
      causale: 'Spese mediche',
      beneficiario: 'Ospedale di Piombino',
      mittente: ''
    },
    {
      type: 'versamento',
      importo: 403.46,
      dataPrelievo: 1622277132000,
      causale: 'Vendita mobile',
      beneficiario: '',
      mittente: 'Tizio Caio'
    }
  ];

  constructor(private userService: UserService, private router: Router) {  }

  list = [
    {tipo: 'versamento', importo: '30,52', data: 1629410400000, mittente: "Mamma", id: 1},
    {tipo: 'prelievo', importo: '22,43', data: 1629410400000, beneficiario: "Panificio Nicolò", id: 2}
  ]
  ngOnInit(): void {
    this.routeUrl = this.router.url;
    this.userService.user.subscribe((user: { nome: string, cognome: string, dataDiNascita: number, email: string, id: string }) => {
      this.user = user;
      console.log(this.user);
    });

    // this.userService.getSaldo(billNumber).subscribe((balance) => {
    //   this.balance = balance;
    // })
    this.balance = this.userService.getBalance();
  }

}
