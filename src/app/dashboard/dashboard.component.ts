import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }



  async init() {
    let url = 'https://api.vatcomply.com/vat?vat_number=NL810462783B01';
    try {
      let response = await fetch(url);
      if (1==1) {
        console.log(response);
        let vatInfo = await response.json();
        console.log(vatInfo.valid, vatInfo);
        if(vatInfo.valid) {
          console.log('gültig');
          
        } else {
          console.log('nicht gültig');
        }
       
      }

    } catch (e) {
      console.log('Fehler aufgetreten');
    }
  }
}


