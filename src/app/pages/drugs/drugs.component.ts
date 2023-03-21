import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimalService } from 'src/app/services/animal.service';
import { MedicarService } from 'src/app/services/medicar.service';
import { ToastService } from 'src/app/services/toast.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-drugs',
  templateUrl: './drugs.component.html',
  styleUrls: ['./drugs.component.css']
})
export class DrugsComponent implements OnInit {

  constructor(
    private animalService: AnimalService,
    private medicarService: MedicarService,
    private toastService: ToastService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
  }

  idAnimal: any = null;
  tipoMedicacao: any = null;
  nome = null;
  dataMedicamento = '';
  dataProxima = '';
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
      Swal.fire('', 'Por favor, escolha o bichinho, e informe a data e a medicação.', 'warning');
      return;
    }
    this.salvando = true;
    const medicacao: any = f.form.value;
    this.medicarService.salvar(medicacao).subscribe(res => {
      this.toastService.create('success', 'A medicação foi adicionada nas informações do seu bichinho!');
      this.router.navigateByUrl(`/animal/${medicacao.idAnimal}`);
    }, erro => {
      this.salvando = false;
      this.toastService.create('error', 'Não foi possível salvar essa medicação! Tente novamente mais tarde');
    });
  }

  carregarAnimais() {
    this.animalService.listar().subscribe(res => {
      this.listaAnimais = res;
    }, erro => {
    });
    this.animalService.listarCompartilhados('EDITAR').subscribe(res => {
      this.listaAnimais = this.listaAnimais.concat(res)
    }, erro => {
    });
  }
}
