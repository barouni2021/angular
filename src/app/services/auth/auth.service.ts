import {  User } from './../../models/user.model';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAut : AngularFireAuth,
    private afs : AngularFirestore
  ) { }



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

}
