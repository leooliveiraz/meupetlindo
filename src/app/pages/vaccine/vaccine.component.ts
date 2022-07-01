import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimalService } from 'src/app/services/animal.service';
import { ToastService } from 'src/app/services/toast.service';
import { VacinaService } from 'src/app/services/vacina.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vaccine',
  templateUrl: './vaccine.component.html',
  styleUrls: ['./vaccine.component.css']
})
export class VaccineComponent implements OnInit {

  constructor(
    private animalService: AnimalService,
    private vacinaService: VacinaService,
    private toastService: ToastService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { 
  }

  idAnimal: any = null;
  nome = null;
  dataVacina = '';
  dataProximaVacina = '';

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
      Swal.fire('', 'Por favor, escolha o bichinho, e informe a vacina e a data de aplicação.', 'warning');
      return;
    }
    this.salvando = true;
    const vacinacao: any = f.form.value;

    this.vacinaService.salvar(vacinacao).subscribe(res => {
      this.toastService.create('success','O registro de Vacina foi adicionada nas informações do seu bichinho!');
      this.router.navigateByUrl(`/animal/${vacinacao.idAnimal}`);
    }, erro => {
      this.salvando = false;
      this.toastService.create('error','Não foi possível salvar esse registro de vacina! Por favor, tente novamente mais tarde');
    });
  }

  carregarAnimais() {
    this.animalService.listar().subscribe(res => {
      this.listaAnimais = res;
    }, erro => {
    });
  }


}
