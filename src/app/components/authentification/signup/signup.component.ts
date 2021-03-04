import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder , Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../../../services/auth/auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;

  constructor(private formBuilder : FormBuilder,
    private router: Router,
    private authService : AuthService) { }

  ngOnInit(): void {
    this.initForm();
  }


  initForm(){
    this.signUpForm = this.formBuilder.group({
      userName : ['', Validators.required],
      email : ['', [Validators.required, Validators.email]],
      password : ['', [Validators.required,Validators.pattern('[0-9a-zA-Z]{6,}')]]

    });
    
  }


  get formControls(){  return this.signUpForm.controls;    }




  onSubmit(){
    this.authService.createNewUser(this.signUpForm.value).then(() =>{
      console.log('Succes registration !');
      this.router.navigate(['/signin']);
    }).catch(err => {
      console.log('Error registration !',err);
    });
  }

}
