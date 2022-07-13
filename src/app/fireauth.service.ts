import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class FireauthService {
  userData: any;
  constructor(public auth: AngularFireAuth, public router: Router) {

    // Setting logged in user in localstorage else null
    this.auth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user'));
      }
    });
  }

  // Returns true when user is logged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null ? true : false;
  }


  // GoogleSingIn
  loginGoogle() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  // Sign in with mail and password
  async loginMail(email, password) {
    let currentUser = await this.auth.signInWithEmailAndPassword(email, password);
    let user = currentUser.user;
  }

  // Sign in as Guest
  async loginGuest() {
    let currentUser = await this.auth.signInAnonymously();
    let result = await currentUser.user.updateProfile({
      displayName: 'Guest' //update name to Guest
    })
  }

  //Logout
  logout() {
    this.auth.signOut();
    this.router.navigate(['']);
  }
}
