import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from 'src/models/user.class';

@Injectable({
  providedIn: 'root'
})
export class VatcheckService {
  vatState: string = '';

  constructor(private firestore: AngularFirestore) { }

  async vat(vatNo: string, userId?: string) {
    console.log(vatNo);
    let url = 'https://api.vatcomply.com/vat?vat_number=';
    try {
      let response = await fetch(url+vatNo);      
      if (response.status == 200 && response.ok == true) {
        let vatInfo = await response.json();
        console.log(vatInfo.valid, vatInfo);
        if(vatInfo.valid) {
          console.log('valid');
          this.vatState = 'valid';
        } else {
          console.log('invalid');
          this.vatState = 'invalid';
        }        
      }
      this.saveVatState(this.vatState, userId, vatNo);

    } catch (e) {
      console.log('error occured', e);
      this.vatState = 'unable to check';
    }
  }

  saveVatState(vatState: string, userId: string, vatNo : string) {
    this.firestore
      .collection('crmusers')
      .doc(userId)
      .update({vatState: vatState, vat: vatNo})
      .then(() => {
        console.log('updated vatState and vatNo');
      })
  }
}

