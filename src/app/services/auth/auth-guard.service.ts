import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { GoogleAuthService } from './google-auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuardService implements CanActivate {

  constructor(public authService: GoogleAuthService, public router: Router) { }

  canActivate() {
    if (!this.authService.isAuthenticated()) {
      this.router.navigateByUrl('/');
      return false;
    }
    return true;
  }

}
