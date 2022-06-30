import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { faRotateLeft, faRotateRight } from '@fortawesome/free-solid-svg-icons';
import { ImageCropperComponent } from 'ngx-image-cropper';
import { AnimalService } from 'src/app/services/animal.service';
import { ToastService } from 'src/app/services/toast.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-animal',
  templateUrl: './new-animal.component.html',
  styleUrls: ['./new-animal.component.css']
})
export class NewAnimalComponent implements OnInit {

  @ViewChild(ImageCropperComponent, { static: false }) imageCropper: ImageCropperComponent | any;
  constructor(private animalService: AnimalService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private toastService: ToastService) { }

  id: any = null;
  nome = '';
  dataNascimento = '';
  dataAdocao = '';
  dataObito = '';
  declararObito = false;
  srcImagem = '';
  imagemAlterada = false;
  salvando = false;

  rotateLeftIcon = faRotateLeft;
  rotateRightIcon = faRotateRight;

  ngOnInit(): void {
    this.id = this.activateRoute.snapshot.paramMap.get('id');
    if (this.id != null) {
      this.animalService.buscar(this.id).subscribe(res => {
        const animal: any = res;
        this.configurar(animal, true);
      }, erro => {
        // this.configurar(animal, false);
      });
    }
  }


  private configurar(animal: any, online: any) {
    if (animal == null) {
      Swal.fire('Desculpe, não conseguimos encontrar o registro do seu bichinho.', '', 'warning')
        .then(
          () => this.router.navigateByUrl('/meus-bichinhos')
        );
    }
    this.nome = animal.nome;
    this.dataNascimento = animal.dataNascimento;
    this.dataAdocao = animal.dataAdocao;
    this.dataObito = animal.dataObito;
    this.declararObito = (this.dataObito != null && animal.dataObito.length > 0);
    if (animal.idArquivo) {
      this.srcImagem = `${environment.API_URL}arquivo/${animal.idArquivo}`;
    }
  }

  cadastrar(form: any) {
    if (form.form.status === 'INVALID') {
      Swal.fire('', 'Por favor, informe o nome do seu bichinho.', 'warning');
      return;
    }
    this.salvando = true;
    if (this.id) {
      this.animalService.alterar(form.form.value).subscribe(res => {
        this.toastService.create('success', 'Os dados do seu bichinho foram atualizados com sucesso!');
        if (this.srcImagem && this.imagemAlterada) {
          this.animalService.uploadImagem(this.id, this.srcImagem).subscribe(() => {
            this.router.navigateByUrl('/my-animals');
          });
        } else {
          this.router.navigateByUrl('/my-animals');
        }
      }, error => {
        this.salvando = false;
        this.toastService.create('error', 'Não foi possível salvar esse registro! Tente novamente mais tarde');
      });
    } else {
      this.animalService.salvar(form.form.value).subscribe(res => {
        const idAnimal = res;
        this.toastService.create('success', 'Salvo com sucesso!');
        if (this.srcImagem && this.imagemAlterada) {
          this.animalService.uploadImagem(idAnimal, this.srcImagem).subscribe(() => {
            this.router.navigateByUrl('/my-animals');
          });
        } else {
          this.router.navigateByUrl('/my-animals');
        }
      }, erro => {
        this.salvando = false;
        this.toastService.create('error','Não foi possível salvar esse registro! Tente novamente mais tarde');
      });
    }
  }

  alterarImagem(event: any) {
    this.srcImagem = event;
    this.imagemAlterada = true;
  }

  rodarDireita() {
    this.imageCropper.rotateRight();
  }

  rodarEsquerda() {
    this.imageCropper.rotateLeft();
  }
}
