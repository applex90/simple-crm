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
      this.userData = user;
      if (!user) {
        this.router.navigate([{ outlets: { 'login-area': ['login'] }}]);
      }
    });
  }

  // GoogleSingIn
  async loginGoogle() {
    try {
      let resp = await this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
      if (resp.user) {
        this.userData = resp.user;
        this.router.navigate(['/dashboard']);
      }
    }
    catch (error) {
      console.log('Error occured:', error);
    }
  }

  // Sign in with mail and password
  async loginMail(email, password) {
    try {
      let resp = await this.auth.signInWithEmailAndPassword(email, password);
      if (resp.user) {
        this.userData = resp.user;
        this.router.navigate(['/dashboard']);
      }
    }
    catch (error) {
      console.log('Error occured:', error);
    }
  }

  // Sign in as Guest
  async loginGuest() {
    try {
      let resp = await this.auth.signInAnonymously();
      await resp.user.updateProfile({
        displayName: 'Guest' //update name to Guest
      });
      if (resp.user) {
        this.userData = resp.user;
        this.router.navigate(['/dashboard']);
      }
    }
    catch (error) {
      console.log('Error occured:', error);
    }
  }

  //Logout
  logout() {
    this.auth.signOut();
  }
}
