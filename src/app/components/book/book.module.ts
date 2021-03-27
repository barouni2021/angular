import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookRoutingModule } from './book-routing.module';
import { BookListModule } from './book-list/book-list.module';
import { BookFormModule } from './book-form/book-form.module';
import { BookListComponent } from './book-list/book-list.component';
import { BookFormComponent } from './book-form/book-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [BookListComponent, BookFormComponent],
  imports: [
    CommonModule,
    BookRoutingModule,
    BookListModule,
    BookFormModule,
    ReactiveFormsModule
  ]
})
export class BookModule { }
