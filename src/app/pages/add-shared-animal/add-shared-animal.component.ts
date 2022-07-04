import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GoogleAuthService } from 'src/app/services/auth/google-auth.service';
import { CompartilharAnimalService } from 'src/app/services/compartilhar-animal.service';
import { ToastService } from 'src/app/services/toast.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-shared-animal',
  templateUrl: './add-shared-animal.component.html',
  styleUrls: ['./add-shared-animal.component.css']
})
export class AddSharedAnimalComponent implements OnInit {

  constructor(private service: CompartilharAnimalService,
    private route: ActivatedRoute,
    private toastService: ToastService,
    private auth: GoogleAuthService,
    private router: Router
  ) { 
      this.estaLogado = auth.isAuthenticated();
      setInterval(()  => {
        this.estaLogado = auth.isAuthenticated();
      }, 300);
  }

  codigo:any = '';
  dados:any = {};
  srcImg:any = null;
  estaLogado = false;

  ngOnInit() {
    this.codigo = this.route.snapshot.paramMap.get('codigo');
    this.carregarDados();
  }

  carregarDados(){
    this.service.carregar(this.codigo).subscribe(res => {
      this.dados = res;
      if (this.dados.arquivo) {
        this.srcImg = `${environment.API_URL}arquivo/${this.dados.arquivo}`;
      }
    });
  }

  confirmar(){
    this.service.confirmar(this.codigo).subscribe(res => {
      const dto:any = res;
      this.toastService.create('success','O animalzinho foi adicionado a sua lista!');
      
      this.router.navigateByUrl('/animal/'+dto.id);
    }, error => {
      if(error.error.message)
        this.toastService.create('error',error.error.message);
    });
  }

  autenticou(){
    this.toastService.create('success','Login realizado com sucesso!');
    location.reload();
  }


}
