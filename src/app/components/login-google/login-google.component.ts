import { Component, OnInit } from '@angular/core';
import { GoogleAuthService } from 'src/app/services/auth/google-auth.service';
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'

@Component({
  selector: 'app-login-google',
  templateUrl: './login-google.component.html',
  styleUrls: ['./login-google.component.css']
})
export class LoginGoogleComponent implements OnInit {
  
  googleIcon = faGoogle;
  isAutenthicated = false;
  constructor(private googleAuth: GoogleAuthService) { }

  ngOnInit(): void {
    this.isAutenthicated = this.googleAuth.isAuthenticated()
    console.log(this.isAutenthicated)
  }

  loginWithGoogle() {
    this.googleAuth.loginWithGoogle()
  }

  logout() {
    this.googleAuth.logout();
  }

}
