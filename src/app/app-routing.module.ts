import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { MainComponent } from './pages/main/main.component';
import { MyAnimalsComponent } from './pages/my-animals/my-animals.component';

const routes: Routes = [
  { path: 'about', component: AboutComponent },
  { path: 'my-animals', component: MyAnimalsComponent },
  { path: '', component: MainComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }