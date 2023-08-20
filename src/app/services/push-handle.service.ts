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
        this.goToLink(`/animal/${idAnimal}#vaccine-panel`);
        break;
      case "aviso-medicacao":
        idAnimal = message.notification.data.idAnimal;
        this.goToLink(`/animal/${idAnimal}#medication-panel`);
        break;
      case "aviso-consulta":
        idAnimal = message.notification.data.idAnimal;
        this.goToLink(`/animal/${idAnimal}#vet-care-panel`);
        break;
    
      default:
        break;
    }
  }
  goToLink(url: string){
    window.open(url, "_blank");
  }
}
