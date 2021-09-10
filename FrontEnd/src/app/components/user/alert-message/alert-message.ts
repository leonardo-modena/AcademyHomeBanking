import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-alert-message',
  templateUrl: './alert-message.html',
  styleUrls: ['./alert-message.css']
})
export class AlertMessage implements OnInit {

  @Input() type!: 'closing' | 'inactive';
  closingString = 'Il tuo account è in fase di chiusura, non appena uno degli amministratori approverà la cancellazione l\'account verrà eliminato.';
  inactiveString = 'Il tuo conto non è ancora stato attivato, non appena sarà attivo potrai effettuare le operazioni.<br>Riprova più tardi.'

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onLogout() {
    this.authService.logout();
  }
}
