import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { faPenToSquare, faShareNodes, faTrash, faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { ShareAnimalComponent } from 'src/app/components/share-animal/share-animal.component';
import { AnimalService } from 'src/app/services/animal.service';
import { ToastService } from 'src/app/services/toast.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2/dist/sweetalert2.js'



@Component({
  selector: 'app-my-animals',
  templateUrl: './my-animals.component.html',
  styleUrls: ['./my-animals.component.css']
})
export class MyAnimalsComponent implements OnInit {

  trashIcon = faTrash;
  editIcon = faPenToSquare;
  shareIcon = faShareNodes;
  openIcon = faUpRightFromSquare;

  constructor(private service: AnimalService,
    private toastService: ToastService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.carregar();
  }

  lista: any = [];
  listaCompartilhados: any = [];
  carregando = false;
  urlImagem = `${environment.API_URL}arquivo/`;

  excluir(id: any) {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Se confirmar, você irá excluir esse animalzinho e seu histórico.',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sim'
    }).then((result) => {
      if (result.value) {
        this.service.deletar(id).subscribe(res => {
          this.toastService.create('success', 'Animalzinho Excluído!');
          this.carregar();
        }, erro => {
          this.toastService.create('error', 'Não foi possível excluir esse Animalzinho! Tente novamente mais tarde');
        });
      }
    });
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
    const newDialog = this.dialog.open(ShareAnimalComponent, { data: {animal: item} });
    newDialog.afterClosed().subscribe(res => {

    })
  }

}
