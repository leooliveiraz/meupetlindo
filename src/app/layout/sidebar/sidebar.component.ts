import { Component, OnInit } from '@angular/core';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { GoogleAuthService } from 'src/app/services/auth/google-auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  exitIcon = faArrowRightFromBracket;
  constructor(private authService: GoogleAuthService) { }

  isAutenthicated = false;

  ngOnInit(): void {
    this.isAutenthicated = this.authService.isAuthenticated();
    this.authService.authStatus.subscribe(status => this.isAutenthicated = status)
  }

  logout() {
    this.authService.logout();
    this.isAutenthicated = this.authService.isAuthenticated();
  }

}
