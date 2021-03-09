import { SigninComponent } from    './components/authentification/signin/signin.component';
import { SignupComponent } from    './components/authentification/signup/signup.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: ''           ,   redirectTo:  'signin'  , pathMatch:   'full'},
  { path: 'signin'     ,               component: SigninComponent},
  { path: 'signup'     ,               component: SignupComponent},
  { path: 'user-profile' , loadChildren: () => import('./components/user-profile/user-profile.module').then(mod=>mod.UserProfileModule) }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }