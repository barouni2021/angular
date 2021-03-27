import { Component, OnInit } from '@angular/core';
import { Book } from './../../../models/book.model';
import { BookService } from './../../../services/book/book.service';
import { filter, tap, takeUntil} from 'rxjs/operators';
import { Console } from 'node:console';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

books : Book[];

  constructor(private bookService : BookService) { }

  ngOnInit(): void {
    this.bookService.getBooks().pipe(
      tap(books => { 
        this.books = books;
      Console.log('books :',books);
    })
    ).subscribe();
  }

}
