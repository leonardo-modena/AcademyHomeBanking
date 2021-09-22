import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {UserService} from "../../../services/user.service";
import {MatDialog} from "@angular/material/dialog";
import {ErrorService} from "../../../services/error.service";
import {User} from "../../../model/user";
import {AuthService} from "../../../services/auth.service";
import {BankAccount} from "../../../model/BankAccount";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {DownloadService} from "../../../services/download.service";
import {Operation} from "../../../model/operation";
import {DialogComponent} from "../../Shared/dialog/dialog.component";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  inactiveSubscription!:Subscription;
  inactive:boolean = false;

  closingAccountSubscription!:Subscription;
  closing: boolean = false;

  user!: User;
  userSubscription!:Subscription;

  bankAccounts!: BankAccount[];
  bankAccountsSubscription!: Subscription;

  dateOfBirth!: Date;

  isDeleting = false;
  isCreatingNew = false;
  deleteOk = false;

  selectedBill: number = 0;
  deletingBill!: number;

  isDownloading = false;

  maxAmount = 5000000;
  private deletedTimer!: any;

  createdNew = false;
  private createdNewTimer!: any;

  moreThanAmountError = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthService,
    public dialog: MatDialog,
    private downloadService: DownloadService,
    private errorService: ErrorService,
    private titleService: Title) {
  }

  ngOnInit(): void {

    this.userSubscription = this.userService.user.subscribe((user: User) => {
      this.user = user;
      this.titleService.setTitle(
        `PROFILO | ${this.user.firstName} ${this.user.lastName}`
      );
      this.dateOfBirth = new Date(this.user.dateOfBirth);
      this.deletingBill = user.bankAccounts[0];
      if (user.bankAccounts.length > 0) {
        this.userService.getBalance(this.user.bankAccounts[this.selectedBill]).subscribe((balance) => {
          this.maxAmount = balance;
        });
      }
    });

    this.bankAccountsSubscription = this.userService.bankAccounts.subscribe((bankAccounts) => {
      this.bankAccounts = bankAccounts;
    });

    this.inactiveSubscription = this.userService.inactiveUser.subscribe((inactive) => {
      this.inactive = inactive;
    });

    this.closingAccountSubscription = this.userService.closingAccount.subscribe((closing) => {
      this.closing = closing;
    });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
    this.bankAccountsSubscription.unsubscribe();
    this.inactiveSubscription.unsubscribe();
    this.closingAccountSubscription.unsubscribe();
    clearTimeout(this.deletedTimer);
    clearTimeout(this.createdNewTimer);
  }

  changeBill() {
    this.userService.getBalance(this.user.bankAccounts[this.selectedBill]).subscribe((balance) => {
      this.maxAmount = balance;
    });
  }

  onNewBill(form: NgForm): void{
    this.isCreatingNew = true;
    this.userService.createNewBill(form.controls.amount.value, this.bankAccounts[form.controls.selectedBill.value].id).subscribe(() => {
      this.isCreatingNew = false;
      this.userService.getUser(parseInt(this.user.id));
      this.createdNew = true;
      this.createdNewTimer = setTimeout(() => {
        this.createdNew = false;
      }, 5000);
      form.resetForm({selectedBill: 0})
    }, () => {
      this.isCreatingNew = false;
    });
  }

  onCloseBill() {
    this.dialog
      .open(DialogComponent, {
        closeOnNavigation: true,
        data: {
          message: `Sei sicuro di voler eliminare il conto  n. ${this.deletingBill.toString().padStart(6, '0')}?`,
        },
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.isDeleting = true;
          this.userService.deleteBill(this.deletingBill).subscribe(() => {
            this.deleteOk = true;
            this.deletedTimer = setTimeout(() => {
              this.deleteOk = false;
            }, 5000)
            if (this.user.bankAccounts.length > 0) {
              this.userService.getUser(parseInt(this.user.id));
            }
            this.isDeleting = false;
          }, () => {
            this.errorService.newError('Non è stato possibile cancellare il conto. Riprova.')
            this.isDeleting = false
          });
        }
      });
  }

  onDownloadAllOperations() {
    this.isDownloading = true;
    this.userService.getAllOperations(parseInt(this.user.id)).subscribe((operations) => {
      let operationsList: Operation[] = operations.map((op) => {
        return {causal: op.causal, type: op.type, amount: op.amount, dateTransaction: op.dateTransaction, idAccount: op.id_account.id, idTransaction: op.id, }
      });

      operationsList.sort((op1, op2) => {
        return op2.dateTransaction - op1.dateTransaction;
      });

      let downloadData = '<h2>Movimenti di tutti i tuoi conti</h2><table style="" class=\'green\'>';

      operationsList.map((operation) => {
        const date = new Date(operation.dateTransaction);
        downloadData += `
      <tr class='row'>
        <td style="text-align:left; border: none; vertical-align: middle">
            <h6>${operation.idAccount.toString().padStart(6, '0')}</h6>
        </td>
        <td style="text-align:left; border: none;">
          <h4>${operation.causal}</h4>
          <p>${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()} - ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}</p>
        </td>
        <td style="border: none">
          <div>
          <h3 style="text-align: right; color: ${operation.type === 'DEPOSIT' ? '#2c6e49' : '#d68c45'}" ">€ ${operation.type === 'DEPOSIT' ? '' : '-'} ${operation.amount.toFixed(2).toLocaleString()}</h3>
          </div>
        </td>
      </tr>
    `
      });
      downloadData += '</table>'
      this.downloadService.downloadAsPDF(downloadData, this.user.bankAccounts);
      this.isDownloading = false;
    });
  }
}
