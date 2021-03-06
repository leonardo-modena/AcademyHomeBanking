import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from "../../components/Shared/spinner/spinner.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatTabsModule } from "@angular/material/tabs";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { LoadingPageComponent } from 'src/app/components/Shared/loading-page/loading-page.component';
import {NoDotPipe} from "../../pipes/no-comma.pipe";
import { MatDialogModule } from "@angular/material/dialog";
import { DialogComponent } from 'src/app/components/Shared/dialog/dialog.component';
import { ErrorComponent } from 'src/app/components/Shared/error/error.component';
import { AlertComponent } from 'src/app/components/Shared/alert/alert.component';
import { ErrorService } from 'src/app/services/error.service';
import { AlertService } from 'src/app/services/alert.service';
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    SpinnerComponent,
    LoadingPageComponent,
    NoDotPipe,
    DialogComponent,
    ErrorComponent,
    AlertComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTabsModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    HttpClientModule
  ],
  exports: [
    SpinnerComponent,
    LoadingPageComponent,
    DialogComponent,
    AlertComponent,
    ErrorComponent,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    NoDotPipe,
    MatDialogModule,
  ],
  providers: [
    ErrorService,
    AlertService
  ]
})
export class SharedModule { }
