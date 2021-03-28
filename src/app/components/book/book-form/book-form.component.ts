import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder , Validators, FormControl } from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject , } from 'rxjs';
import { BookService } from './../../../services/book/book.service';
import { filter, tap, takeUntil} from 'rxjs/operators';

type FormAction = 'add' | 'edit';





@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit, OnDestroy {


  constructor(private formBuilder : FormBuilder,
              private route : ActivatedRoute,
              private bookService : BookService) { } 
  
Action : FormAction;
bookForm : FormGroup;
destroy$= new Subject();
percentage : number;
currentFileUpload :string;
bookId: string;


get formControls(){  return this.bookForm.controls;    }

  ngOnInit(): void {
    this.route.paramMap.pipe( 
      filter(p => !p.has('bookId')), 
      tap(p => {
      this.Action = p.get('action') as FormAction;
      this.bookId = p.get('bookId');
      this.getBookbyId(this.bookId);
      //this.initForm();
    }),
    takeUntil(this.destroy$),
    ).subscribe();
    
  }



  initForm(){
    this.bookForm = this.formBuilder.group({
      title : ['', [Validators.required]],
      author : ['', [Validators.required]],
      synopsis :''
    });
    
  } 


  onSaveBook(){
    let bookForm = this.bookForm.value;
    bookForm.image  = this.currentFileUpload;
    switch (this.Action){
      case 'add' : 
          this.bookService.addBook(bookForm); break;
      case 'edit' : 
          bookForm.id = this.bookId;
          this.bookService.updateBook(bookForm); break;
    }


    
  }



  ngOnDestroy(){
    this.destroy$.next();
    this.destroy$.complete();
  }


  detectFiles(event){
    this.bookService.pushFileToStorage(event.target.files[0]).subscribe( percentage => {
        console.log('pourcentage',percentage);
        this.percentage = percentage;
        if(this.percentage===100){
          this.bookService.downloadURL.pipe(takeUntil(this.destroy$)
          ).subscribe(currentFileUpload => {
            this.currentFileUpload = currentFileUpload ;
          });
        }
    });
    
  }

  getBookbyId(bookId:string){
    this.bookService.getBookbyId(bookId).subscribe(book => {
      
      this.bookForm = this.formBuilder.group({
        title : [book.title, [Validators.required]],
        author : [book.author, [Validators.required]],
        synopsis :book.synopsis
      });
      this.currentFileUpload = book.image;
    }
      )
  }

}
