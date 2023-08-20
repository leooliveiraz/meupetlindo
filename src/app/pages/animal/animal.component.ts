import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faCakeCandles, faHeart, faStar, faTrash } from '@fortawesome/free-solid-svg-icons';
import { AnimalService } from 'src/app/services/animal.service';
import { AntiPulgaService } from 'src/app/services/antiPulga.service';
import { ExameService } from 'src/app/services/exame.service';
import { MedicarService } from 'src/app/services/medicar.service';
import { PesoService } from 'src/app/services/peso.service';
import { ToastService } from 'src/app/services/toast.service';
import { VacinaService } from 'src/app/services/vacina.service';
import { VermifugoService } from 'src/app/services/vermifugo.service';
import { VetService } from 'src/app/services/vet.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-animal',
  templateUrl: './animal.component.html',
  styleUrls: ['./animal.component.css']
})
export class AnimalComponent implements OnInit {

  cakeIcon = faCakeCandles;
  heartIcon = faHeart;
  starIcon = faStar;
  deleteIcon = faTrash;

  idAnimal: any;
  carregando = false;
  animal: any;
  srcImg: any = null;
  tempoDeVida = '';

  listaPeso: any = [];
  listaVermifugo: any = [];
  listaVacina: any = [];
  listaMedicacao: any = [];
  listaExame: any = [];
  listaAntiPulga: any = [];
  listaConsulta: any = [];

  public innerWidth: any = 900;
  public lineChartData: any[] = [
    { data: [], label: '' },
  ];
  public lineChartLabels: any[] = [];
  public lineChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{
        ticks: {
          beginAtZero: true,
          stepSize: 1,
          min: 0,
          maxRotation: 89,
          minRotation: (this.innerWidth < 900 ? 80 : 0),
          autoSkip: false
        }
      }],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
          ticks: {
            beginAtZero: true
          }
        },

      ]
    }
  };

  constructor(private animalService: AnimalService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private pesoService: PesoService,
    private antiPulgaService: AntiPulgaService,
    private vermifugoService: VermifugoService,
    private vacinaService: VacinaService,
    private medicacaoService: MedicarService,
    private exameService: ExameService,
    private toastService: ToastService,
    private vetService: VetService) { }

  ngOnInit(): void {
    this.idAnimal = this.activatedRoute.snapshot.paramMap.get('id');
    this.carregarAnimal();
  }

  carregarAnimal() {
    this.carregando = true;
    this.animalService.buscar(this.idAnimal).subscribe(res => {
      this.animal = res;
      if (this.animal.idArquivo) {
        this.srcImg = `${environment.API_URL}arquivo/${this.animal.idArquivo}.jpg`;
      }
      if (this.animal == null) {
        Swal.fire('Desculpe, não conseguimos encontrar o registro do seu bichinho.', '', 'warning')
          .then(
            () => this.router.navigateByUrl('/my-animals')
          );
      }
      this.carregarConsultas();
      this.carregarExames();
      this.carregarPesos();
      this.carregarVacinas();
      this.carregarMedicacoes();
    }, erro => {
      this.carregando = false;
    });
  }

  configurarGrafico() {
    this.lineChartData[0].label = this.animal.nome;
    this.lineChartData[0].data = [];
    this.lineChartLabels = [];
    for (const item of this.listaPeso) {
      this.lineChartData[0].data.push(item.peso);
      this.lineChartLabels.push(new DatePipe('en-US').transform(item.dataPesagem, 'dd/MM/yy'));
    }
    this.listaPeso.sort((a: any, b: any) => {
      if (a.dataPesagem > b.dataPesagem) return -1;
      if (a.dataPesagem < b.dataPesagem) return 1;
      return 0;
    })
  }

  carregarExames() {
    this.exameService.listarPorAnimal(this.idAnimal).subscribe(res => {
      this.listaExame = res;
      this.carregando = false;
    }, erro => console.error(erro));
  }

  carregarPesos() {
    this.pesoService.listarPorAnimal(this.idAnimal).subscribe(res => {
      this.listaPeso = res;
      this.carregando = false;
      this.configurarGrafico();
    }, erro => this.carregando = false);
  }

  carregarVermifugos() {
    this.vermifugoService.listarPorAnimal(this.idAnimal).subscribe(res => {
      this.listaVermifugo = res;
    }, erro => this.carregando = false);
  }

  carregarVacinas() {
    this.vacinaService.listarPorAnimal(this.idAnimal).subscribe(res => {
      this.listaVacina = res;
      this.carregando = false;
    }, erro => this.carregando = false);
  }

  carregarMedicacoes() {
    this.medicacaoService.listarPorAnimal(this.idAnimal).subscribe(res => {
      this.listaMedicacao = res;
      this.carregando = false;
    }, erro => this.carregando = false);
  }

  
  carregarConsultas() {
    this.vetService.listarPorAnimal(this.idAnimal).subscribe(res => {
      this.listaConsulta = res;
      this.carregando = false;
    }, erro => this.carregando = false);
  }

  carregarAntiPulgas() {
    this.antiPulgaService.listarPorAnimal(this.idAnimal).subscribe(res => {
      this.listaAntiPulga = res;
      this.carregando = false;
    }, erro => this.carregando = false);
  }

  excluirPeso(id: any) {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Ao confirmar essa ação, você concorda em excluir essa pesagem.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sim'
    }).then((result) => {
      if (result.value) {
        this.pesoService.deletar(id).subscribe(res => {
          this.toastService.create('success','Pesagem Excluída!');
          this.carregarPesos();
        }, erro => {
          this.toastService.create('error','Não foi possível excluir essa pesagem! Tente novamente mais tarde');
        });
      }
    });
  }

}
