import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'meupetlindoapp';
  constructor(private router: Router) {
    console.log(environment.APP_VERSION);
    if (environment.production) {
      console.log(this.router.url)
      if (this.router.url.indexOf('https://') > -1) {
        window.location.assign('https://www.meupetlindo.com/');
      }
    }
  }
}
