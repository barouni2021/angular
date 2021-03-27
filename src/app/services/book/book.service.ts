import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument,AngularFirestoreCollection } from '@angular/fire/firestore';

import {  Book } from './../../models/book.model';
import { Observable } from 'rxjs';

//import * as firebase from 'firebase';
import { AngularFireStorage } from '@angular/fire/storage';


@Injectable({
  providedIn: 'root'
})
export class BookService {

books : Observable<Book[]>;
booksCollection : AngularFirestoreCollection<Book>;
  
  constructor(private afs: AngularFirestore, 
              private router : Router , 
              private storage : AngularFireStorage) { }


addBook(book: Book){
  return new Promise<any>((resolve, reject) => {
    this.afs.collection('books')
        .add(book)
        .then(res => {
          this.router.navigate(['/book/book-list']);
        }, err => {
          reject(err);
          window.alert(err.messge);
        });
  } );
}  




getBooks(): Observable<Book[]> {
  this.booksCollection  = this.afs.collection('books');
   return this.books = this.booksCollection.valueChanges();
  
}

}
