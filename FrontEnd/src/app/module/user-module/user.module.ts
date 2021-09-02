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
import { MatDialogModule } from "@angular/material/dialog";
import { DownloadComponent } from "../../components/user/download/download.component";
import { OperationFormComponent } from "../../components/user/operations/operation-form/operation-form.component";
import { SharedModule } from "../shared/shared.module";
import { UserComponent } from 'src/app/components/user/user.component';

@NgModule({
  declarations: [
    FilterComponent,
    DownloadComponent,
    ProfileComponent,
    OperationsComponent,
    OperationListComponent,
    OpertationItemComponent,
    OperationFormComponent,
    ConfirmDialogComponent,
    BankAccountComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatDialogModule,
    RouterModule.forChild([
      { path: 'user', component: UserComponent, children: [
        { path: '', component: BankAccountComponent, },
        { path: 'profilo', component: ProfileComponent,  },
        { path: 'operazioni', component: OperationsComponent,  }
      ]}
    ]),
  ],
})
export class UserModule { }
