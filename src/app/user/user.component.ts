import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/models/user.class';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  user = new User();
  allUsers = [];

  constructor(public dialog: MatDialog, private firestore: AngularFirestore) { }


  ngOnInit(): void {
    this.firestore
      .collection('crmusers')
      .valueChanges({ idField: 'customIdName' }) //Get entity of unique document
      .subscribe((changes: any) => {
        console.log('Received changes from DB', changes);
        this.allUsers = changes;
      });
  }

  deleteUser(userId, event) {
    event.stopPropagation();
    this.firestore
      .collection('crmusers')
      .doc(userId)
      .delete();
  }

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }
}

