import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { environment } from 'src/environments/environment';
import { ToastService } from './services/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Meu Pet Lindo';
  constructor(private toastService: ToastService,
    private swUpdate: SwUpdate) {
    console.log(environment.APP_VERSION);
  }

  ngOnInit() {
    if (this.swUpdate.isEnabled) {
        this.swUpdate.available.subscribe(() => {
          this.toastService.create('success','Uma nova versão está disponível, iremos atualizar o APP!');
          window.location.reload();
        });
    }        
}
}
