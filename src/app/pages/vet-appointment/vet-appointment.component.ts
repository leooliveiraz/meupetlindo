import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimalService } from 'src/app/services/animal.service';
import { MedicarService } from 'src/app/services/medicar.service';
import { ToastService } from 'src/app/services/toast.service';
import { VetService } from 'src/app/services/vet.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vet-appointment',
  templateUrl: './vet-appointment.component.html',
  styleUrls: ['./vet-appointment.component.css']
})
export class VetAppointmentComponent implements OnInit {

  constructor(
    private animalService: AnimalService,
    private vetService: VetService,
    private toastService: ToastService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
  }

  idAnimal: any = null;
  local: any = null;
  profissional = null;
  dataConsulta = '';
  proximaConsulta = '';
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
      Swal.fire('', 'Por favor, escolha o bichinho, e informe a data local e profissional.', 'warning');
      return;
    }
    this.salvando = true;
    const medicacao: any = f.form.value;
    this.vetService.salvar(medicacao).subscribe(res => {
      this.toastService.create('success', 'A consulta foi adicionada nas informações do seu bichinho!');
      this.router.navigateByUrl(`/animal/${medicacao.idAnimal}`);
    }, erro => {
      this.salvando = false;
      this.toastService.create('error', 'Não foi possível salvar essa consulta! Tente novamente mais tarde');
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
