import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from "../../components/Shared/spinner/spinner.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatTabsModule } from "@angular/material/tabs";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { LoadingPageComponent } from 'src/app/components/Shared/loading-page/loading-page.component';
import {NoCommaPipe} from "../../pipes/no-comma.pipe";
import { MatDialogModule } from "@angular/material/dialog";

@NgModule({
  declarations: [
    SpinnerComponent,
    LoadingPageComponent,
    NoCommaPipe,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTabsModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule
  ],
  exports: [
    SpinnerComponent,
    LoadingPageComponent,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    NoCommaPipe,
    MatDialogModule
  ]
})
export class SharedModule { }
