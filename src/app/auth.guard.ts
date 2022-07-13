import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { FireauthService } from './fireauth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(public router: Router, public fs: FireauthService) { }

  canActivate(
    _next: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): boolean {

    if (this.fs.isLoggedIn !== true) {
      alert('Access Denied, Login is required to Access This Page!');
      this.router.navigate(['/login']);
    }
    return true;
  }

}
