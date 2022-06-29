import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthService, AuthConfig } from 'angular-oauth2-oidc';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

const oAuthConfig: AuthConfig = {
  issuer: 'https://accounts.google.com',
  strictDiscoveryDocumentValidation: false,
  redirectUri: window.location.origin,
  clientId: environment.GOOGLE_OAUTH2,
  scope: 'openid profile',
};

@Injectable({
  providedIn: 'root',
})
export class GoogleAuthService {
  
  public authStatus = new BehaviorSubject(this.isAuthenticated());

  constructor(private authService: OAuthService, private router: Router) {
    authService.configure(oAuthConfig);
  }

  configure() {
    this.authService.loadDiscoveryDocument().then(() => {
      console.log('loadDiscoveryDocument');
      this.authService.tryLoginImplicitFlow().then(() => {
        if (this.authService.hasValidAccessToken()) {
          this.authService.loadUserProfile().then((userProfile) => {
            this.storeAuthentication(userProfile);
            this.authStatus.next(true);
            this.router.navigate(['/my-animals']);
          });
        }
      });
    });
  }

  loginWithGoogle() {
    this.authService.initLoginFlow();
  }

  logout() {
    this.authService.logOut();
    localStorage.clear();
    this.authStatus.next(false);
    this.router.navigate(['/']);
  }

  storeAuthentication(googleUser: any) {
    console.log(googleUser);
    localStorage.setItem('profile', JSON.stringify(googleUser));
  }

  getUser() {
    const usuarioJSON = localStorage.getItem('profile');
    return JSON.parse(usuarioJSON ? usuarioJSON : '');
  }

  isAuthenticated() {
    return localStorage.getItem('profile') == null ? false : true;
  }
}
