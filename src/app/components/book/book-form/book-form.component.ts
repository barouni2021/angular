import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder , Validators, FormControl } from '@angular/forms';
import { Routes, RouterModule, ActivatedRoute } from '@angular/router';
import { Subject , } from 'rxjs';
import { BookService } from 'src/app/services/book/book.service';
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


get formControls(){  return this.bookForm.controls;    }

  ngOnInit(): void {
    this.route.paramMap.pipe( 
      filter(p => !p.has('bookId')), tap(p => {
      this.Action = p.get('action') as FormAction;
      this.initForm();
    }),
    takeUntil(this.destroy$),
    ).subscribe();
    
  }



  initForm(){
    this.bookForm = this.formBuilder.group({
      title : ['', [Validators.required]],
      author : ['', [Validators.required]],
      synopsis :'',
    });
    
  } 


onSaveBook(){
this.bookService.addBook(this.bookForm.value)

}



ngOnDestroy(){
  this.destroy$.next();
  this.destroy$.complete();
}
}
