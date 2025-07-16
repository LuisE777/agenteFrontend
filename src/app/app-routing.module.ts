import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipallyComponent } from './components/principally/principally.component';
import { SimulationComponent } from './components/simulation/simulation.component';
import { InformationComponent } from './components/information/information.component';
import { EvaluationComponent } from './components/evaluation/evaluation.component';
import { ChatComponent } from './components/chat/chat.component';


const routes: Routes = [
  { path: '', component: PrincipallyComponent },
  { path: 'simulation', component: SimulationComponent },
  { path: 'information', component: ChatComponent },
  { path: 'evaluation', component: EvaluationComponent },
  { path: '**', redirectTo: '' }
];


@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule { }
