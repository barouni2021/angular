import {  User } from './../../models/user.model';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import * as firebase from 'firebase/firebase';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAut : AngularFireAuth,
    private afs : AngularFirestore,
    private router: Router
  ) {
      this.afAut.authState.subscribe(user => { 
        if(user) {localStorage.setItem('user',JSON.stringify(user));
        }else{
          localStorage.setItem('user',null);
        }

       });



   }



  createNewUser(signUpForm){
    return this.afAut.createUserWithEmailAndPassword(signUpForm.email, signUpForm.password)
    .then((result) => {
        this.SetUserData(result.user,signUpForm.userName);
    } ).catch((error) =>{
        window.alert(error.messge);
    });
  }

  SetUserData(user, userName){
    const userRef: AngularFirestoreDocument<any> = this.afs.doc('users/${user.uid}');
    const userData: User = {
      id: user.uid,
      email:user.email,
      userName:user.userName
    };
    return userRef.set(userData, {merge:true});

  }
//signInWithEmailAndPassword
  signIn(signInForm){
    return this.afAut.signInWithEmailAndPassword(signInForm.email, signInForm.password)
    .then((result) => { this.router.navigate(['/user-profile']);
    } ).catch((error) =>{
        window.alert(error.messge);
    });

  }

  signInWithGoogle(){
    return this.afAut.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .then((result) => { this.SetUserData(result.user,result.user);
      this.router.navigate(['/user-profile']);

    }).catch((error) =>{
        window.alert(error.messge);
    });

  }
/*
  SetUserData(user, userName?){
    const userRef:AngularFirestoreDocument<any> = this.afs.doc('user/${user.uid}');
    const userData: User = {
      id:user.uid,
      email:user.email,
      userName:userName || user.displayName,
    };

    return userRef.set(userData, {merge:true});

  }*/

}
