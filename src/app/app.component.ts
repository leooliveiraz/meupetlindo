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
    console.log(environment);
    if (environment.production) {
      console.log(this.router.url)
      console.log(this.router.url.indexOf('https://') )
      if (this.router.url.indexOf('https://') === -1) {
        window.location.href = 'https://www.meupetlindo.com/';
      }
    }
  }
}
