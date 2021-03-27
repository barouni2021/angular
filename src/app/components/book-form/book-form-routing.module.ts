import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookFormComponent } from './../book/book-form/book-form.component';

const routes: Routes = [
  { path: ':action',   component:BookFormComponent},
  { path: 'action/:bookId', component: BookFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookFormRoutingModule { }
