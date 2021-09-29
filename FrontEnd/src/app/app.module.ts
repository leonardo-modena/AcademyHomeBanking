import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { UserModule } from "./module/user/user.module";
import { AdminModule } from "./module/admin/admin.module";
import { SharedModule } from "./module/shared/shared.module";

import { AppComponent } from './app.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { FooterComponent } from './layout/footer/footer.component';
import { NotFoundComponent } from './layout/not-found/not-found.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';

import { NoDotPipe } from './pipes/no-comma.pipe';

import { HttpInterceptorProviders } from './interceptor/provider.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomepageComponent,
    LoginComponent,
    RegistrationComponent,
    FooterComponent,
    NotFoundComponent,
  ],
  imports: [
    SharedModule,
    BrowserModule,
    AdminModule,
    UserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [
    HttpInterceptorProviders
  ],
  exports: [
    NoDotPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

