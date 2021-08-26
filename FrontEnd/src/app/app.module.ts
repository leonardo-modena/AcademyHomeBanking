import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonComponent } from './components/Shared/UI/button/button.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { UserComponent } from './components/user/user.component';
import { AdminComponent } from './components/admin/admin.component';
import { FooterComponent } from './layout/footer/footer.component';
import { SpinnerComponent } from './components/Shared/spinner/spinner.component';
import { DownloadComponent } from './components/user/download/download.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { OperationsComponent } from './components/user/operations/operations.component';
import { ListComponent } from './components/Shared/list/list.component';
import { ListItemComponent } from './components/Shared/List/list-item/list-item.component';
import { NotFoundComponent } from './layout/not-found/not-found.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    NavbarComponent,
    HomepageComponent,
    LoginComponent,
    RegistrationComponent,
    UserComponent,
    AdminComponent,
    FooterComponent,
    SpinnerComponent,
    DownloadComponent,
    ProfileComponent,
    OperationsComponent,
    ListComponent,
    ListItemComponent,
    NotFoundComponent,

  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

