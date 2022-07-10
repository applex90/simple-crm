import { formatDate } from '@angular/common';
import { Component, DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { user } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';
import { VatcheckService } from '../vatcheck.service';

@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss']
})
export class DialogEditUserComponent implements OnInit, DoCheck {

  constructor(public dialogRef: MatDialogRef<DialogEditUserComponent>, private firestore: AngularFirestore, public vatcheck: VatcheckService) { }
  user: User;
  userId: string;
  birthDate!: Date;  //! initialize later
  loading: boolean = false;

  ngOnInit(): void {
    this.birthDate = new Date(this.user.birthDate);
  }

  async updateVATState(vatNo: string, userId?: string) {
    await this.vatcheck.vat(vatNo, userId);
    this.user.vatState = this.vatcheck.vatState;
    console.log('vat updated');
  }

  ngDoCheck() {
    // this.user.vatState = this.vatcheck.vatState;
    // console.log('docheck');
  }

  saveUser() {
    this.user.birthDate = this.birthDate.getTime();
    this.user.vatState = this.vatcheck.vatState;
    this.loading = true;
    this.firestore
      .collection('crmusers')
      .doc(this.userId)
      .update(this.user.toJSON())
      .then(() => {
        this.loading = false;
        this.dialogRef.close();
      })
  }


}
