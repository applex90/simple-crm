import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user = new User();
  locationData = [];
  locationDataGrouped = [];
  constructor(private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.firestore
      .collection('crmusers')
      .valueChanges({ idField: 'customIdName' }) //Get entity of unique document
      .subscribe((changes: any) => {
        console.log('Received changes from DB', changes);
        changes.forEach(element => {
          const index = this.locationData.findIndex((item) => {
            return item.name === element.city;
          });
          //Check for doublets
          this.checkDoublet(index, element.city);
        });
        this.locationDataGrouped = this.locationData;
      });
  }

  citysToJSON(city, amount?) {
    return {
      "name": city,
      "value": 1
    }
  }

  checkDoublet(i, city) {
    if (i !== -1) {
      this.locationData[i].value++;
    } else {
      this.locationData.push(this.citysToJSON(city));
    }
  }

}


