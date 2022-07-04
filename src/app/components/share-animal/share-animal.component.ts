import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { faCopy, faShareNodes, faXmark } from '@fortawesome/free-solid-svg-icons';
import { CompartilharAnimalService } from 'src/app/services/compartilhar-animal.service';
import { ToastService } from 'src/app/services/toast.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-share-animal',
  templateUrl: './share-animal.component.html',
  styleUrls: ['./share-animal.component.css']
})
export class ShareAnimalComponent implements OnInit {

  animal: any;
  closeIcon = faXmark;

  urlImagem = `${environment.API_URL}arquivo/`;
  urlCompartilhamento = `${environment.APP_URL}share/`;
  codigoCompartilhamento = '';
  navegador: any = navigator;

  copyIcon = faCopy;
  shareIcon = faShareNodes;


  constructor(private service: CompartilharAnimalService,
    private toastService: ToastService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.animal = data.animal;
  }

  ngOnInit() {
    this.service.gerar(this.animal.id).subscribe(res => {
      const gerado: any = res;
      this.codigoCompartilhamento = gerado.codigo;
      this.urlCompartilhamento = `${this.urlCompartilhamento}`;
    })
  }

  copiar() {
    this.navegador.clipboard.writeText(`${this.urlCompartilhamento}${this.codigoCompartilhamento}`)
      .then()
      .catch((e: any) => console.error(e));
    this.toastService.create('success', 'Link copiado!');
  }

  compartilhar() {
    if (this.navegador.share) {
      this.navegador.share({
        title: 'Meu Pet Lindo - Compartilhar',
        text: `${this.animal.nome}`,
        url: `${this.urlCompartilhamento}${this.codigoCompartilhamento}`,
      }).then(() => console.log('Successful share'))
        .catch((error: any) => console.log('Error sharing', error));
    }
    this.toastService.create('success', 'Link Compartilhado!');

  }

}
