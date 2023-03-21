import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimalService } from 'src/app/services/animal.service';
import { PesoService } from 'src/app/services/peso.service';
import { ToastService } from 'src/app/services/toast.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-weight',
  templateUrl: './weight.component.html',
  styleUrls: ['./weight.component.css']
})
export class WeightComponent implements OnInit {


  idAnimal: any = null;
  peso: any = null;
  dataPesagem = '';
  urlImagem = `${environment.API_URL}arquivo/`;

  listaAnimais: any = [];
  salvando = false;

  constructor(
    private animalService: AnimalService,
    private pesoService: PesoService,
    private toastService: ToastService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    let animal = this.activatedRoute.snapshot.queryParamMap.get('animal');
    if (animal) {
      this.idAnimal = parseInt(animal);
    }
    this.carregarAnimais();
  }

  cadastrar(f: any) {
    if (f.form.status === 'INVALID') {
      Swal.fire('', 'Por favor, informe o qual animalzinho, a data da pesagem e o peso', 'warning');
      return;
    }
    this.salvando = true;
    let pesagem: any = f.form.value;
    pesagem.peso = parseFloat(pesagem.peso);

    this.pesoService.salvar(pesagem).subscribe(res => {
      this.toastService.create('success','A pesagem foi adicionada nas informações do seu bichinho!');
      this.router.navigateByUrl(`/animal/${pesagem.idAnimal}`);
    }, erro => {
      console.error(erro)
      this.salvando = false;
      this.toastService.create('error','Não foi possível salvar o peso do seu bichinho! Tente novamente mais tarde');
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
