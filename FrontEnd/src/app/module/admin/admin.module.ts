import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTabsModule } from '@angular/material/tabs';

import { AdminComponent } from 'src/app/components/admin/admin.component';
import { ListComponent } from 'src/app/components/admin/list/list.component';
import { UserListComponent } from 'src/app/components/admin/user-list/user-list.component';
import { UserListItemComponent } from 'src/app/components/admin/user-list/user-list-item/user-list-item.component';
import { AccountListComponent } from 'src/app/components/admin/account-list/account-list.component';
import { AccountListItemComponent } from 'src/app/components/admin/account-list/account-list-item/account-list-item.component';
import { SharedModule } from "../shared/shared.module";



@NgModule({
  declarations: [
    AdminComponent,
    ListComponent,
    UserListComponent,
    UserListItemComponent,
    AccountListComponent,
    AccountListItemComponent,
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class AdminModule { }
