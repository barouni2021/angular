import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
{ path:'book-list', loadChildren:()=> import('./book-list/book-list-routing.module').then(m=>m.BookListRoutingModule) },
{ path:'book-form', loadChildren:()=> import('./book-form/book-form-routing.module').then(m=>m.BookFormRoutingModule)  },
{ path:'', pathMatch: 'full', redirectTo: 'book-list'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookRoutingModule { }
