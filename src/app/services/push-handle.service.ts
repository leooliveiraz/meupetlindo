import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PushHandleService {

  constructor(private router: Router) { }

  handleWebPushMessages(message: any){
    let idAnimal = 0
    switch (message.action) {
      case "aviso-vacina":
        idAnimal = message.notification.data.idAnimal;
        this.router.navigateByUrl(`/animal/${idAnimal}`);
        break;
      case "aviso-medicacao":
        idAnimal = message.notification.data.idAnimal;
        this.router.navigateByUrl(`/animal/${idAnimal}`);
        break;
    
      default:
        break;
    }
  }
}
