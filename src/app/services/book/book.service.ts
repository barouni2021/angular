import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument,AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators'; /**** a ajouter */
import {  Book } from './../../models/book.model';
import { Observable, Subject } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

//import 'rxjs/add/operator/map';
@Injectable({
  providedIn: 'root'
})
export class BookService {

books : Observable<Book[]>;
booksCollection : AngularFirestoreCollection<Book>;
downloadURL = new Subject<string>();

bookDocument : AngularFirestoreDocument<Book>;
  
  constructor(private afs: AngularFirestore, 
              private router : Router , 
              private storage : AngularFireStorage/***/) { }


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
   return this.books = this.booksCollection.snapshotChanges().pipe(
     map(actions => {
       return actions.map(a => {
         const data: Book  = a.payload.doc.data() as Book;
         const id : string = a.payload.doc.id;
         data.id = id;
         return (data);
       });
     }));
  
}


pushFileToStorage(file : File): Observable<number>{
    const basePath= 'images';
    const filePath= '${basePath}/${file.name}';
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath,file);


    uploadTask.snapshotChanges().pipe(
        finalize(() => {
          storageRef.getDownloadURL().subscribe(downloadURL => {
            this.downloadURL.next(downloadURL);
          });
        })

    ).subscribe();
    return uploadTask.percentageChanges();
}


getBookbyId(bookId: string): Observable<Book>{
  const bookPath = 'books/${bookId}';
  this.bookDocument = this.afs.doc(bookPath);
  return this.bookDocument.valueChanges();
}


updateBook(bookForm){
  return new Promise<any>((resolve,reject) => {
    this.afs.collection('books').doc(bookForm.id)
    .update(bookForm)
    .then(res => {
      this.router.navigate(['/book/book-list']);
    }, err => {
      reject(err);
      window.alert(err.messge);
    } );
  }  );
}

deleteBooK(bookId : string){
  const bookPath = 'books/${bookId}';
  this.bookDocument = this.afs.doc(bookPath);
  return this.bookDocument.delete();

}

}
