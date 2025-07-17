import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { GeminiService } from 'src/app/gemini.service';
import Swal from 'sweetalert2';
import { CroqService } from '../../croq.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.css']
})
export class EvaluationComponent implements OnInit  {

  loading : boolean = false;
  constructor(
    private geminiService:GeminiService,
    private croqService:CroqService,
    private router: Router   ){

  }
  topics:any[]=[
    {
      id:1,name:'Sociedades Comerciales - Aspectos Generales',
      numeration:0
    },
    {
      id:2,name:'Sociedades Comerciales - Aspectos Legales',
      numeration:1
    },
    {
      id:3,name:'Sociedad Anónima',
      numeration:2
    },
    {
      id:4,name:'Sociedad de Responsabilidad Limitada',
      numeration:3
    },
    {
      id:5,name:'Sociedad Comandita',
      numeration:4
    },
    {
      id:6,name:'Sociedad Colectiva',
      numeration:5
    },
    {
      id:7,
      name:'Asociación Accidental',
      numeration:6
    },
    {
      id:8,
      name:'Patrimonio de las Sociedades Comerciales',
      numeration:7
    },
    {
      id:9,
      name:'Disolución y Liquidación de Sociedades Comerciales',
      numeration:8
    },
    {
      id:10,
      name:'Transformación y Fusión de Sociedades Comerciales',
      numeration:9,
    },
    {
      id:11,
      name:'Mandato',
      numeration:10
    },
    {
      id:12,
      name:'Agencia',
      numeration:11,
    },
    {
      id:13,
      name:'Sucursal',
      numeration:12,
    }]
  topic:any=null;
  messages:any[] = [];
  message!:string;
  ngOnInit(): void {}
  async question(){
    try{
      let answer:any = await firstValueFrom(this.geminiService.question(this.message))
      console.log(answer)
      if(answer.error)throw answer.detail
      this.messages.push({texto: answer.respuesta.candidates[0].content.parts[0].text,  tipo: 'bot' })
      this.message = '';

    }catch(e){
      console.log("el error es el siguiente",e)
    }
  }


 async topicSelection(topic:any){
    this.topic = topic;
    this.messages.push({ texto: 'Quiero una evaluacion formativa, acerca de:', tipo: 'usuario' });
    this.loading = true;
    this.messages.push({ texto: topic.name, tipo: 'usuario' });

    try {
      await this.evaluation( 'Quiero una evaluacion formativa, acerca de:'+topic.name);
      this.loading = false;
    } catch (e) {
      Swal.fire('Error', 'Ocurrió un problema al obtener la respuesta.', 'error');
      return;
    }
  }
  newTopic(){
    this.topic =  null;
    this.messages = [];
  }


  async evaluation(message:string){
    try{
      let answer:any = await firstValueFrom(this.croqService.evaluation(message, this.messages,this.topic.name,this.topic.numeration));
      if(answer.error)throw answer.detail
      this.messages.push({texto: answer.message,  tipo: 'bot' });
      this.message = '';
    }catch(e){
      throw e;
    }
  }

  async sendMessage(): Promise<void> {
    if (!this.message.trim()) return;
    this.loading = true;
    this.messages.push({ texto: this.message, tipo: 'usuario' });
    try {
      await this.evaluation(`RESPUESTA USUARIO ${this.message}, CORREGILE SI ESTA MAL, OJO COSIDERA EL INCISO QUE TE ESTA DICIENDO`);
      this.loading = false;
    } catch (e:any) {
      Swal.fire('Error', 'Ocurrió un problema al obtener la respuesta. '+(e || e.message) , 'error');
      return;
    }
  }

  menu(){
    this.router.navigate(['/']);
  }
}
