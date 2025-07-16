import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { CroqService } from 'src/app/croq.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-simulation',
  templateUrl: './simulation.component.html',
  styleUrls: ['./simulation.component.css']
})
export class SimulationComponent {
  loading : boolean = false;
  societies:any[]=[{id:1,name:'Inscripción de Sociedad de Responsabilidad Limitada (S.R.L.), Sociedad Colectiva o Sociedad en Comandita Simple',numeration:1},{id:2,name:'Inscripción de Sociedad Anónima (S.A.) o Sociedad en Comandita por Acciones Constituidas por Acto Único',numeration:2},{id:3,name:'Inscripción de Sociedad Anónima (S.A.) o Sociedad en Comandita por Acciones por Suscripción Pública de Acciones',numeration:3}]
  messages:any[] = [];
  message!:string;
  constructor(
    private router:Router,
    private croqService:CroqService){

  }

  menu(){
    this.router.navigate(['/']);
  }
  async question(){
    try{
      let answer:any = await firstValueFrom(this.croqService.opening(this.message,this.process));
      this.messages.push({texto: answer.message,  tipo: 'bot' });
      this.message = '';
    }catch(e){
      throw e;
    }
  }

  async sendMessage() {
      if (!this.message.trim()) return;
      this.loading = true;
      this.messages.push({ texto: this.message, tipo: 'usuario' });
      try {
        await this.question();
        this.loading = false;
      } catch (e) {
        Swal.fire('Error', 'Ocurrió un problema al obtener la respuesta. '+e, 'error');
        this.loading = false;
        return;
      }
  }


  process: any = null;

  async processSelection(process: any) {
    this.process = process;
  }

  newProcess() {
    this.messages = [];
    this.process = null;
  }
}
