import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FireauthService } from './services/fireauth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  msg: string = `Access denied.\nLogin is required to access this page!`;
  constructor(public router: Router, public fs: FireauthService, private _snackBar: MatSnackBar) { }

  canActivate(
    _next: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): boolean {

    if (!this.fs.userData) {
      this.openSnackBar();
      return false;
    }
    return true;
  }
 
    openSnackBar() {
      this._snackBar.open(this.msg, '', {
        duration: 3000,
        // here specify the position
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
        panelClass: ['access-denied']
      });
    }
}