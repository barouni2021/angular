import { SigninComponent } from    './components/authentification/signin/signin.component';
import { SignupComponent } from    './components/authentification/signup/signup.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from  './services/guard/auth.guard';

const routes: Routes = [
  { path: ''           ,   redirectTo:  'signin'  , pathMatch:   'full'},
  { path: 'signin'     ,               component: SigninComponent},
  { path: 'signup'     ,               component: SignupComponent},
  { path: 'user-profile' , canActivate:[AuthGuard] ,  loadChildren: () => import('./components/user-profile/user-profile.module').then(mod=>mod.UserProfileModule) },
  { path: 'book' , canActivate:[AuthGuard] ,  loadChildren: () => import('./components/book/book.module').then(mod=>mod.BookModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }