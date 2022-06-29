import { Injectable } from '@angular/core';
import { OAuthService, AuthConfig } from 'angular-oauth2-oidc'
import { environment } from 'src/environments/environment';

const oAuthConfig: AuthConfig = {
  issuer: 'https://accounts.google.com',
  strictDiscoveryDocumentValidation: false,
  redirectUri: window.location.origin,
  clientId: environment.GOOGLE_OAUTH2,
  scope: 'openid profile'
}

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {

  constructor(private authService: OAuthService) {
    authService.configure(oAuthConfig)

  }

  loginWithGoogle() {
    this.authService.loadDiscoveryDocument().then(() => {
      this.authService.tryLoginImplicitFlow().then(() => {
        if (!this.authService.hasValidAccessToken()) {
          this.authService.initLoginFlow()
        } else {
          this.authService.loadUserProfile().then(userProfile => {
            this.storeAuthentication(userProfile)
          })
        }
      })
    })
  }

  logout() {
    this.authService.logOut();
  }

  storeAuthentication(googleUser: any) {
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
