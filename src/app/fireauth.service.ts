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
  async loginGoogle() {
    try {
      let resp = await this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
      if (resp.user) {
        this.userData = resp.user;
        console.log(resp.user);
        this.router.navigate(['/dashboard']);
      }
    }
    catch (error) {
      console.log('Error occured:', error);
      this.router.navigate(['/login']);
    }
  }

  // Sign in with mail and password
  async loginMail(email, password) {
    try {
      let resp = await this.auth.signInWithEmailAndPassword(email, password);
      if (resp.user) {
        console.log(resp.user);
        this.userData = resp.user;
        this.router.navigate(['/dashboard']);
      }
    }
    catch (error) {
      console.log('Error occured:', error);
      this.router.navigate(['/login']);
    }
  }

  // Sign in as Guest
  async loginGuest() {
    try {
      let resp = await this.auth.signInAnonymously();
      await resp.user.updateProfile({
        displayName: 'Guest' //update name to Guest
      });
      if(resp.user) {
          this.userData = resp.user;
          console.log(resp.user);
          this.router.navigate(['/dashboard']);
        }
      }
    catch (error) {
      console.log('Error occured:', error);
      this.router.navigate(['/login']);
    }
  }

  //Logout
  logout() {
    this.auth.signOut();
    this.router.navigate(['']);
  }
}
