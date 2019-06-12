import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private afAuth: AngularFireAuth, private router: Router ) { }

  loginGoogle(){
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
    .then(res =>{
      this.router.navigateByUrl('/dashboard');
    })
    .catch(err=>{
      this.router.navigateByUrl('/dashboard');
    })
    
  }

  logout(){
    this.afAuth.auth.signOut()
    .then(res=>{
      this.router.navigateByUrl('/login');
    })
    .catch(err=>{
      this.router.navigateByUrl('/login');
    })
  }
}
