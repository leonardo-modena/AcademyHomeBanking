import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FilterComponent} from "../../components/Shared/filter/filter.component";
import {ProfileComponent} from "../../components/user/profile/profile.component";
import {OperationsComponent} from "../../components/user/operations/operations.component";
import {RouterModule} from "@angular/router";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {ReactiveFormsModule} from "@angular/forms";
import {OperationListComponent} from "../../components/user/operation-list/operation-list.component";
import {OpertationItemComponent} from "../../components/user/operation-list/opertation-item/opertation-item.component";
import {BankAccountComponent} from "../../components/user/bank-account/bank-account.component";

@NgModule({
  declarations: [
    FilterComponent,
    OperationListComponent,
    OpertationItemComponent,
  ],

  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', redirectTo: 'conto', pathMatch: 'full'},
      {path: 'conto', component: BankAccountComponent},
      {path: 'profilo', component: ProfileComponent},
      {path: 'operazioni', component: OperationsComponent}
    ]),
    MatDatepickerModule,
    ReactiveFormsModule
  ],
  exports: [
    FilterComponent,
    OperationListComponent
  ],
})
export class UserModule { }
