import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimalService } from 'src/app/services/animal.service';
import { ExameService } from 'src/app/services/exame.service';
import { ToastService } from 'src/app/services/toast.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.css']
})
export class ExamsComponent implements OnInit {

  constructor(
    private animalService: AnimalService,
    private exameService: ExameService,
    private toastService: ToastService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }
  idAnimal: any = null;
  nome: any = null;
  dataExame = '';
  dataProxima = '';
  observacao = null;
  urlImagem = `${environment.API_URL}arquivo/`;

  listaAnimais: any = [];
  salvando = false;

  ngOnInit() {
    const animal = this.activatedRoute.snapshot.queryParamMap.get('animal');
    if (animal) {
      this.idAnimal = parseInt(animal);
    }
    this.carregarAnimais();
  }

  cadastrar(f: any) {
    if (f.form.status === 'INVALID') {
      Swal.fire('', 'Por favor, escolha o bichinho, e informe a data e o exame realizado.', 'warning');
      return;
    }
    this.salvando = true;
    const exame: any = f.form.value;
    this.exameService.salvar(exame).subscribe(res => {
      this.toastService.create('success', 'O Exame foi adicionado nas informações do seu bichinho!');
      this.router.navigateByUrl(`/animal/${exame.idAnimal}`);
    }, erro => {
      this.salvando = false;
      this.toastService.create('error', 'Desculpe, não foi possível salvar esse exame!');
    });
  }

  carregarAnimais() {
    this.animalService.listar().subscribe(res => {
      this.listaAnimais = this.listaAnimais.concat(res)
    }, erro => {
    });

    this.animalService.listarCompartilhados('EDITAR').subscribe(res => {
      this.listaAnimais = this.listaAnimais.concat(res)
    }, erro => {
    });
  }

}
