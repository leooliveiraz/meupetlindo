import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { AddSharedAnimalComponent } from './pages/add-shared-animal/add-shared-animal.component';
import { AnimalComponent } from './pages/animal/animal.component';
import { DrugsComponent } from './pages/drugs/drugs.component';
import { ExamsComponent } from './pages/exams/exams.component';
import { MainComponent } from './pages/main/main.component';
import { MyAnimalsComponent } from './pages/my-animals/my-animals.component';
import { NewAnimalComponent } from './pages/new-animal/new-animal.component';
import { VaccineComponent } from './pages/vaccine/vaccine.component';
import { WeightComponent } from './pages/weight/weight.component';
import { AuthGuardService } from './services/auth/auth-guard.service';

const routes: Routes = [
  { path: 'about', component: AboutComponent },
  { path: 'my-animals', component: MyAnimalsComponent , canActivate: [AuthGuardService]},
  { path: 'new-animal', component: NewAnimalComponent , canActivate: [AuthGuardService]},
  { path: 'edit/:id', component: NewAnimalComponent, canActivate: [AuthGuardService] },
  { path: 'animal/:id', component: AnimalComponent, canActivate: [AuthGuardService] },
  { path: 'weight', component: WeightComponent , canActivate: [AuthGuardService]},
  { path: 'drugs', component: DrugsComponent , canActivate: [AuthGuardService]},
  { path: 'antiflea', component: DrugsComponent , canActivate: [AuthGuardService]},
  { path: 'vermifuge', component: DrugsComponent , canActivate: [AuthGuardService]},
  { path: 'vaccine', component: VaccineComponent , canActivate: [AuthGuardService]},
  { path: 'exams', component: ExamsComponent , canActivate: [AuthGuardService]},
  { path: 'share/:codigo', component: AddSharedAnimalComponent },
  { path: '', component: MainComponent },
  { path: '**', pathMatch: 'full', component: MainComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }