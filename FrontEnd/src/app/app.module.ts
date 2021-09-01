import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonComponent } from './components/Shared/UI/button/button.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { UserComponent } from './components/user/user.component';
import { FooterComponent } from './layout/footer/footer.component';
import { SpinnerComponent } from './components/Shared/spinner/spinner.component';
import { DownloadComponent } from './components/user/download/download.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { OperationsComponent } from './components/user/operations/operations.component';
import { NotFoundComponent } from './layout/not-found/not-found.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import { ErrorComponent } from './components/Shared/error/error.component';
import { ErrorInterceptor } from './interceptor/error.interceptor';
import { EncryptInterceptor } from './interceptor/encrypt.interceptor';
import {UserModule} from "./module/user-module/user.module";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatTabsModule} from "@angular/material/tabs";
import { OperationFormComponent } from './components/user/operations/operation-form/operation-form.component';
import { AlertComponent } from './components/Shared/alert/alert.component';
import { ConfirmDialogComponent } from './components/user/profile/confirm-dialog/confirm-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";


@NgModule({
    declarations: [
        AppComponent,
        ButtonComponent,
        NavbarComponent,
        HomepageComponent,
        LoginComponent,
        RegistrationComponent,
        UserComponent,
        FooterComponent,
        SpinnerComponent,
        DownloadComponent,
        ProfileComponent,
        OperationsComponent,
        NotFoundComponent,
        ErrorComponent,
        OperationFormComponent,
        AlertComponent,
        
        ConfirmDialogComponent,

    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatTabsModule,
        UserModule,
        MatIconModule,
        MatButtonModule,
        MatDialogModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorInterceptor,
            multi: true,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: EncryptInterceptor,
            multi: true
        }
    ],
    exports: [
        ErrorComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

