import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { FooterComponent } from './layout/footer/footer.component';
import { NotFoundComponent } from './layout/not-found/not-found.component';
import { ErrorComponent } from './components/Shared/error/error.component';
import { ErrorInterceptor } from './interceptor/error.interceptor';
import { EncryptInterceptor } from './interceptor/encrypt.interceptor';
import { UserModule } from "./module/user/user.module";
import { AlertComponent } from './components/Shared/alert/alert.component';
import { AdminModule } from "./module/admin/admin.module";
import { SharedModule } from "./module/shared/shared.module";
import { NoCommaPipe } from './pipes/no-comma.pipe';
import { DialogComponent } from './components/Shared/dialog/dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomepageComponent,
    LoginComponent,
    RegistrationComponent,
    FooterComponent,
    NotFoundComponent,
    ErrorComponent,
    AlertComponent,
    DialogComponent,
  ],
  imports: [
    SharedModule,
    BrowserModule,
    AdminModule,
    UserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule
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
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: EncryptInterceptor,
      multi: true
    },
  ],
  exports: [
    ErrorComponent,
    NoCommaPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

