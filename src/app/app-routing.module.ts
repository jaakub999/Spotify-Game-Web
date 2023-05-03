import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteUrl } from "./shared/route-url";
import { AuthGuard } from "./guards/auth.guard";
import { AuthComponent } from "./components/auth/auth.component";
import { RegisterComponent } from "./components/register/register.component";
import { HomeComponent } from "./components/home/home.component";
import { ChangePasswordComponent } from "./components/change-password/change-password.component";
import { ForgotPasswordComponent } from "./components/forgot-password/forgot-password.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: RouteUrl.HOME,
    pathMatch: 'full'
  },
  {
    path: RouteUrl.HOME,
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: RouteUrl.AUTH,
    component: AuthComponent
  },
  {
    path: RouteUrl.REGISTER,
    component: RegisterComponent
  },
  {
    path: RouteUrl.PASSWORD,
    component: ForgotPasswordComponent
  },
  {
    path: RouteUrl.PASSWORD_TOKEN,
    component: ChangePasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes, {
      onSameUrlNavigation: 'reload'
    }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule {}
