import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleAuthService } from 'src/app/services/auth/google-auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  @Input() showMenuButton: any;
  @Output() menuStatusChange = new EventEmitter();

  linkMainPage = "/";
  constructor(
    private authService: GoogleAuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.linkMainPage = this.authService.isAuthenticated() ? "/my-animals" : "/";
  }

  openOrCloseMenu() {
    this.menuStatusChange.emit();
  }

}
