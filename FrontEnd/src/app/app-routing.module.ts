import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomepageComponent} from "./components/homepage/homepage.component";
import {RegistrationComponent} from "./components/registration/registration.component";
import {LoginComponent} from "./components/login/login.component";
import {UserComponent} from "./components/user/user.component";
import {ProfileComponent} from "./components/user/profile/profile.component";
import {OperationsComponent} from "./components/user/operations/operations.component";
import {AdminComponent} from "./components/admin/admin.component";
import {NotFoundComponent} from "./layout/not-found/not-found.component";

const routes: Routes = [
  {path: '', component: HomepageComponent },
  {path: 'registrazione', component: RegistrationComponent },
  {path: 'login', component: LoginComponent},

  { path: 'user', component: UserComponent, loadChildren: () => import('./module/user-module/user.module').then(m => m.UserModule)  },
  { path: 'admin', component: AdminComponent },
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
