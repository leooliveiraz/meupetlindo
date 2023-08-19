import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PushHandleService {

  constructor(private router: Router) { }

  handleWebPushMessages(message: any){
    console.log(message)
    switch (message.action) {
      case "aviso-vacina":
        const idAnimal = message.notification.data.idAnimal;
        this.router.navigateByUrl(`/animal/${idAnimal}`);
        break;
    
      default:
        break;
    }
  }
}
