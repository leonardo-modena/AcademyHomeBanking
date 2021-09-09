import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from "./components/homepage/homepage.component";
import { RegistrationComponent } from "./components/registration/registration.component";
import { LoginComponent } from "./components/login/login.component";
import { AdminComponent } from "./components/admin/admin.component";
import { NotFoundComponent } from "./layout/not-found/not-found.component";
import {AdminGuard} from "./guard/admin.guard";
import {AuthGuard} from "./guard/auth.guard";


const routes: Routes = [
  { path: '', component: HomepageComponent, pathMatch: 'full' },
  { path: 'registrazione',canActivate: [AuthGuard], component: RegistrationComponent, pathMatch: 'full'},
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'user', pathMatch: 'full' ,  loadChildren: () => import('./module/user/user.module').then(m => m.UserModule)},
  { path: 'admin',pathMatch: 'full', component: AdminComponent,  canActivate: [AdminGuard], loadChildren: () => import('./module/admin/admin.module').then(m => m.AdminModule) },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
