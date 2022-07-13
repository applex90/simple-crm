import { Component, OnInit } from '@angular/core';
import { FireauthService } from '../fireauth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public fs: FireauthService) { }

  ngOnInit(): void {
  }

}
