import { Component, OnInit } from '@angular/core';
import { PesoService } from '../service/peso.service';
import { AnimalService } from '../service/animal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Label } from 'ng2-charts';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { MzToastService } from 'ngx-materialize';
import { environment } from 'src/environments/environment';
import { VermifugoService } from '../service/vermifugo.service';
import { VacinaService } from '../service/vacina.service';
import { MedicarService } from '../service/medicar.service';
import { ExameService } from '../service/exame.service';
import { AntiPulgaService } from '../service/antiPulga.service';
import { SeoService } from '../service/seo.service';

@Component({
  selector: 'app-painel-animal',
  templateUrl: './painel-animal.component.html',
  styleUrls: ['./painel-animal.component.css']
})
export class PainelAnimalComponent implements OnInit {

  constructor(
    private animalService: AnimalService,
    private pesoService: PesoService,
    private antiPulgaService: AntiPulgaService,
    private vermifugoService: VermifugoService,
    private vacinaService: VacinaService,
    private medicacaoService: MedicarService,
    private exameService: ExameService,
    private activatedRoute: ActivatedRoute,
    private toastService: MzToastService,
    private router: Router,
    private seo: SeoService
  ) {
    this.seo.addTitulo('Meu Pet Lindo - Painel do seu Bichinho')
    this.innerWidth = window.innerWidth;
   }

  idAnimal;
  carregando = false;
  animal: any;
  srcImg = null;
  tempoDeVida = '';
  listaPeso: any = [];
  listaVermifugo: any = [];
  listaVacina: any = [];
  listaMedicacao: any = [];
  listaExame: any = [];
  listaAntiPulga: any = [];

  public innerWidth: any = 900;
  public lineChartData: any[] = [
    { data: [], label: '' },
  ];
  public lineChartLabels: Label[] = [];
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

  ngOnInit() {
    this.idAnimal = this.activatedRoute.snapshot.paramMap.get('idAnimal');
    this.carregarAnimal();
  }

  carregarAnimal() {
    this.carregando = true;
      this.animalService.buscar(this.idAnimal).subscribe(res => {
        this.animal = res;
        if (this.animal.idArquivo) {
          this.srcImg = `${environment.API_URL}arquivo/${this.animal.idArquivo}`;
        }
        if (this.animal == null) {
          Swal.fire('Desculpe, n??o conseguimos encontrar o registro do seu bichinho.', '', 'warning')
          .then(
            () => this.router.navigateByUrl('/meus-bichinhos')
          );
        }
        this.carregarAntiPulgas();
        this.carregarExames();
        this.carregarPesos();
        this.carregarVermifugos();
        this.carregarVacinas();
        this.carregarMedicacoes();
      }, erro => {
        this.carregando = false;
      });
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
  
  carregarAntiPulgas() {
    this.antiPulgaService.listarPorAnimal(this.idAnimal).subscribe(res => {
      this.listaAntiPulga= res;
      this.carregando = false;
    }, erro => this.carregando = false);
  }

  configurarGrafico() {
    this.lineChartData[0].label = this.animal.nome;
    this.lineChartData[0].data = [];
    this.lineChartLabels = [];
    for (const item of this.listaPeso) {
      this.lineChartData[0].data.push(item.peso);
      this.lineChartLabels.push( new DatePipe('en-US').transform(item.dataPesagem, 'dd/MM/yy') );
    }
    this.listaPeso.sort(function(a, b)
    {
       if (a.dataPesagem > b.dataPesagem) return -1;
       if (a.dataPesagem < b.dataPesagem) return 1;
    })
  }


  excluirPeso(id) {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Ao confirmar essa a????o, voc?? concorda em excluir essa pesagem.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sim'
    }).then((result) => {
      if (result.value) {
        this.pesoService.deletar(id).subscribe(res => {
          this.toastService.show('Pesagem Exclu??da!', 1000, 'red');
          this.carregarPesos();
        }, erro => {
          this.toastService.show('N??o foi poss??vel excluir essa pesagem! Tente novamente mais tarde', 1000, 'red');
        });
      }
    });
  }

  excluirExame(id) {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Ao confirmar essa a????o, voc?? concorda em excluir esse registro de exame.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sim'
    }).then((result) => {
      if (result.value) {
        this.exameService.deletar(id).subscribe(res => {
          this.toastService.show('Exame Exclu??do!', 1000, 'red');
          this.carregarExames();
        }, erro => {
          this.toastService.show('N??o foi poss??vel excluir esse exame! Tente novamente mais tarde', 1000, 'red');
        });
      }
    });
  }

  excluirMedicacao(id) {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Ao confirmar essa a????o, voc?? concorda em excluir esse registro de medica????o.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sim'
    }).then((result) => {
      if (result.value) {
        this.medicacaoService.deletar(id).subscribe(res => {
          this.toastService.show('Medica????o Exclu??da!', 1000, 'red');
          this.carregarMedicacoes();
        }, erro => {
          this.toastService.show('N??o foi poss??vel excluir essa medica????o! Tente novamente mais tarde', 1000, 'red');
        });
      }
    });
  }

  excluirVermifugo(id) {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Ao confirmar essa a????o, voc?? concorda em excluir essa vermifuga????o.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sim'
    }).then((result) => {
      if (result.value) {
        this.vermifugoService.deletar(id).subscribe(res => {
          this.toastService.show('Vermifuga????o Exclu??da!', 1000, 'red');
          this.carregarVermifugos();
        }, erro => {
          this.toastService.show('N??o foi poss??vel excluir essa vermifuga????o! Tente novamente mais tarde', 1000, 'red');
        });
      }
    });
  }

  excluirVacina(id) {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Ao confirmar essa a????o, voc?? concorda em excluir essa vacina.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sim'
    }).then((result) => {
      if (result.value) {
        this.vacinaService.deletar(id).subscribe(res => {
          this.toastService.show('Vacina Exclu??da!', 1000, 'red');
          this.carregarVacinas();
        }, erro => {
          this.toastService.show('N??o foi poss??vel excluir essa vacina! Tente novamente mais tarde', 1000, 'red');
        });
      }
    });
  }

  excluirAntiPulga(id) {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Ao confirmar essa a????o, voc?? concorda em excluir esse registro.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sim'
    }).then((result) => {
      if (result.value) {
        this.antiPulgaService.deletar(id).subscribe(res => {
          this.toastService.show('Registro de exclu??do!', 1000, 'red');
          this.carregarAntiPulgas();
        }, erro => {
          this.toastService.show('N??o foi poss??vel excluir esse registro! Tente novamente mais tarde', 1000, 'red');
        });
      }
    });
  }


}
