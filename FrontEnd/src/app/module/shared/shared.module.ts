import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SpinnerComponent} from "../../components/Shared/spinner/spinner.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatTabsModule} from "@angular/material/tabs";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";



@NgModule({
  declarations: [
    SpinnerComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTabsModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
  ],
  exports: [
    SpinnerComponent,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
