import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FilterComponent} from "../../components/Shared/list/filter/filter.component";
import {ProfileComponent} from "../../components/user/profile/profile.component";
import {OperationsComponent} from "../../components/user/operations/operations.component";
import {RouterModule} from "@angular/router";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    FilterComponent
  ],

  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {path: 'profilo', component: ProfileComponent},
      {path: 'operazioni', component: OperationsComponent}]),
    MatDatepickerModule,
    ReactiveFormsModule
  ],
  exports: [
    FilterComponent
  ],
})
export class UserModule { }
