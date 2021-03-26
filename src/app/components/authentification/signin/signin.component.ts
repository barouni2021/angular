import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder , Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../../../services/auth/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signInForm: FormGroup;


  constructor(private formBuilder : FormBuilder,
    private authService : AuthService) { }

  ngOnInit(): void {
    this.initForm();
  }

  get formControls(){  return this.signInForm.controls;    }
  
  initForm(){
    this.signInForm = this.formBuilder.group({
      email : ['', [Validators.required, Validators.email]],
      password : ['', [Validators.required,Validators.pattern('[0-9a-zA-Z]{6,}')]]
    });
    
  }


  onSubmit(){  
    this.authService.signIn(this.signInForm.value);
  }



  signInWithGoogle(){
     this.authService.signInWithGoogle();
  }


}
