import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { MainComponent } from './pages/main/main.component';
import { MyAnimalsComponent } from './pages/my-animals/my-animals.component';
import { NewAnimalComponent } from './pages/new-animal/new-animal.component';
import { AuthGuardService } from './services/auth/auth-guard.service';

const routes: Routes = [
  { path: 'about', component: AboutComponent },
  { path: 'my-animals', component: MyAnimalsComponent , canActivate: [AuthGuardService]},
  { path: 'new-animal', component: NewAnimalComponent , canActivate: [AuthGuardService]},
  { path: 'edit/:id', component: NewAnimalComponent, canActivate: [AuthGuardService] },
  { path: '', component: MainComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }