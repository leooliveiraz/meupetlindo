import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { GoogleAuthService } from 'src/app/services/auth/google-auth.service';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-google',
  templateUrl: './login-google.component.html',
  styleUrls: ['./login-google.component.css'],
})
export class LoginGoogleComponent implements OnInit {
  googleIcon = faGoogle;
  isAutenthicated = false;
  
  constructor(private googleAuth: GoogleAuthService) {}

  ngOnInit(): void {
    this.googleAuth.configure();
    this.isAutenthicated = this.googleAuth.isAuthenticated();
  }

  loginWithGoogle() {
    this.googleAuth.loginWithGoogle();
  }
}
