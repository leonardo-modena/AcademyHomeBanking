import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FilterComponent} from "../../components/Shared/list/filter/filter.component";
import {ProfileComponent} from "../../components/user/profile/profile.component";
import {OperationsComponent} from "../../components/user/operations/operations.component";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    FilterComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: 'profilo', component: ProfileComponent},
      { path: 'operazioni', component: OperationsComponent}])
  ]
})
export class UserModule { }
