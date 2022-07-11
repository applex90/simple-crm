import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'simple-crm';
  constructor(public auth: AngularFireAuth) {
  }

  loginGoogle() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  async loginMail(email, password) {
    let currentUser = await this.auth.signInWithEmailAndPassword(email, password);
    let user = currentUser.user;
  }

  async loginGuest() {
    let currentUser = await this.auth.signInAnonymously();
    let result = await currentUser.user.updateProfile({
        displayName: 'Guest'
    })
  }

  logout() {
    this.auth.signOut();
  }
}
