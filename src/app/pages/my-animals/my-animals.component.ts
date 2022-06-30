import { Component, OnInit } from '@angular/core';
import { faPenToSquare, faShareFromSquare, faTrash, faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { AnimalService } from 'src/app/services/animal.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-my-animals',
  templateUrl: './my-animals.component.html',
  styleUrls: ['./my-animals.component.css']
})
export class MyAnimalsComponent implements OnInit {

  trashIcon = faTrash;
  editIcon = faPenToSquare;
  shareIcon = faShareFromSquare;
  openIcon = faUpRightFromSquare;

  constructor(private service: AnimalService,) { }

  ngOnInit(): void {
    this.carregar();
  }

  lista: any = [];
  listaCompartilhados: any = [];
  carregando = false;
  urlImagem = `${environment.API_URL}arquivo/`;

  excluir(id: any) {
  }


  carregar() {
    this.carregando = true;
    this.service.listar().subscribe(res => {
        this.lista = res;
        this.carregando = false;
      }, erro => {
        this.carregando = false;
    });

    this.service.listarCompartilhados().subscribe(res => {
      this.listaCompartilhados = res;
    })
  }

  abrirCompartilhamento(item: any) {
    // this.modalService.open(CompartilharAnimalComponent,{animal: item})
  }

}
