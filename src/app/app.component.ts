import { Component } from '@angular/core';
import { FireauthService } from './services/fireauth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'simple-crm';
  constructor(public fs: FireauthService) {
  }

}
