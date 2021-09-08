import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterComponent } from "../../components/Shared/filter/filter.component";
import { ProfileComponent } from "../../components/user/profile/profile.component";
import { OperationsComponent } from "../../components/user/operations/operations.component";
import { RouterModule } from "@angular/router";
import { OperationListComponent } from "../../components/user/operation-list/operation-list.component";
import { OpertationItemComponent } from "../../components/user/operation-list/opertation-item/opertation-item.component";
import { BankAccountComponent } from "../../components/user/bank-account/bank-account.component";
import { ConfirmDialogComponent } from "../../components/user/profile/confirm-dialog/confirm-dialog.component";
import { DownloadComponent } from "../../components/user/download/download.component";
import { OperationFormComponent } from "../../components/user/operations/operation-form/operation-form.component";
import { SharedModule } from "../shared/shared.module";
import {UserComponent} from "../../components/user/user.component";
import {UserGuard} from "../../guard/user.guard";
import {AppModule} from "../../app.module";
import {InactiveMessageComponent} from "../../components/user/inactive-message/inactive-message.component";

@NgModule({
  declarations: [
    UserComponent,
    FilterComponent,
    DownloadComponent,
    ProfileComponent,
    OperationsComponent,
    OperationListComponent,
    OpertationItemComponent,
    OperationFormComponent,
    ConfirmDialogComponent,
    BankAccountComponent,
    InactiveMessageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: 'user',  canActivate: [UserGuard], component: UserComponent, children: [
          {path: '', component: BankAccountComponent, pathMatch: 'full'},
          {path: 'profilo', component: ProfileComponent, pathMatch: 'full'},
          {path: 'operazioni', component: OperationsComponent, pathMatch: 'full'}
        ]
      }
    ]),
  ],
  exports: [
    RouterModule
  ]
})
export class UserModule { }
