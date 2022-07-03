import { Component, HostListener, OnInit } from '@angular/core';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { GoogleAuthService } from 'src/app/services/auth/google-auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  exitIcon = faArrowRightFromBracket;
  innerWidth: any = window.innerWidth;
  isMobile = innerWidth < 600;
  sideNavOpened = false;

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
  
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
    this.isMobile = innerWidth < 600;
  }

  changeSideMenuStatus(){
    this.sideNavOpened = !this.sideNavOpened;
  }

  closeMenu(){
    this.sideNavOpened = false;
  }
}
