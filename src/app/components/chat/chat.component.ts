import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { CroqService } from 'src/app/croq.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit  {
  topics:any[]=[
    {
      id:1,name:'Sociedades Comerciales',
      description:'¿Qué son? ¿Cómo se constituyen? ¿Cuáles son? ¡Descúbrelo paso a paso!',
      subtopics:
        [
          {
            id:1,
            name:'Generalidades',
            description:'Por el contrato de sociedad comercial dos o más personas se ....',
            descriptionComplete:'Por el contrato de sociedad comercial dos o más personas se obligan a efectuar aportes para aplicarlos al logro del fin común y a repartirse entre sí los beneficios o soportar las pérdidas'
          },
          {
            id:2,
            name:'Sociedades Anónimas',
            description:'Son sociedades de capital porque no interesan las personas, sino el capital que pueden aportar ....',
            descriptionComplete:'Son sociedades de capital porque no interesan las personas, sino el capital que pueden aportar y es precisamente a este hecho que deben su nombre de sociedades anónimas'
          },
          {
            id:3,
            name:'Sociedades Colectivas',
            description:'Sociedades de personas porque en su ....',
            descriptionComplete:'Sociedades de personas porque en su organización prevalecen la confianza y los lazos de amistad o de familiaridad entre las personas y no así el capital que disponen'
          },
          {
            id:4,
            name:'Sociedad de Responsabilidad Limitada',
            description:'Tipo de sociedad intermedia entre las sociedades....',
            descriptionComplete:'Tipo de sociedad intermedia entre las sociedades de personas y de capital, concebidas para empresas pequeñas'
          },
          {
            id:5,
            name:'Sociedades en Comandita',
            description:'En su composición social existe desigualdad ....',
            descriptionComplete:'En su composición social existe desigualdad jurídica entre sus socios, pues unos tienen responsabilidad ilimitada y otros limitada'
          },
          {
            id:6,
            name:'Asociaciones Accidentales',
            description:'Son de carácter transitorio o temporales, porque están constituidas ....',
            descriptionComplete:'Son de carácter transitorio o temporales, porque están constituidas con ausencia de las formalidades que dan el carácter definitivo a las sociedades'
          }
        ]
    },
    {
      id:2,
      name:'Patrimonio de las Sociedades Comerciales',
      description:'Aprende a analizar la estructura patrimonial de una empresa.',
      subtopics:
      [
        {
          id:1,
          name:'Generalidades',
          description:'Patrimonio es la propiedad o derecho que tienen los ....',
          descriptionComplete:'Patrimonio es la propiedad o derecho que tienen los socios en una empresa y se encuentra determinado por la diferencia entre el activo y el pasivo de su Balance General'

        },
        {
          id:2,
          name:'Aportes de Capital',
          description:'El capital social puede ser aportado ...',
          descriptionComplete:'El capital social puede ser aportado en distintas formas, en razón de que todos los bienes que pueden ser objeto de contrato pueden también ser objeto de aportación'
        },
        {
          id:3,
          name:'Superavit',
          description:'Es el capital adicional de los socios obtenido ...',
          descriptionComplete:'Es el capital adicional de los socios obtenido como resultado de la actividad de la sociedad y que les pertenece en forma proporcional a sus aportes'
        }
      ]
    },
    {
      id:3,
      name:'Disolución y Liquidación de Sociedades Comerciales',
      description:'¿Qué pasa cuando una empresa deja de operar? Aprende a cerrar correctamente.',
      subtopics:
        [
          {
            id:1,
            name:'Disolución',
            description:'Disolver una sociedad, es dar por finalizada su existencia, anulando los ....',
            descriptionComplete:'Disolver una sociedad, es dar por finalizada su existencia, anulando los vínculos jurídicos y sociales creados entre la sociedad, los sociones y terceras personas'

          },
          {
            id:2,
            name:'Liquidación',
            description:'Liquidar una sociedad, es la acción de realizar su activo con el objeto de cancelar su ...',
            descriptionComplete:'Liquidar una sociedad, es la acción de realizar su activo con el objeto de cancelar su activo con el objeto de cancelar su pasivo distribuir el patrimonio neto entre los socios'
          }
        ]},
    {
      id:4,
      name:'Transformación y Fusión de Sociedades Comerciales',
      description:'¿Te suena fusión de empresas? Aprende cómo y por qué sucede.',
      subtopics:
      [
        {
          id:1,
          name:'Transformación',
          description:'Es el cambio del tipo de una sociedad ....',
          descriptionComplete:'Es el cambio del tipo de una sociedad por otro, es decir, una modificación externa que no afecta a su esencia ni a su personalidad jurídica, porque conserva sus derechos y obligaciones'

        },
        {
          id:2,
          name:'Fusión',
          description:'Fusión es la unión de dos o más sociedades que para ese efecto ...',
          descriptionComplete:'Fusión es la unión de dos o más sociedades que para ese efecto se disuelven sin liquidarse, no existe liquidación debido a que la fusión se realiza sobre la base de los bienes existentes de las sociedades  y de nuevos socios de ser necesario'
        }
      ]},
    {
      id:5,
      name:'Mandato, Agencias y Sucursales',
      description:'Comprende cómo las empresas se expanden y delegan funciones.',
      subtopics:
      [
        {
          id:1,
          name:'Mandato',
          description:'Las sociedades para ampliar su campo de acción encargan a terceras personas ....',
          descriptionComplete:'Las sociedades para ampliar su campo de acción encargan a terceras personas efectuen actividades comerciales por cuenta de ellas y por las cuales deberán cancelar una remuneración'

        },
        {
          id:2,
          name:'Agencias',
          description:'Por el contrato de agencia un comerciante asume el cargo de promover o ...',
          descriptionComplete:'Por el contrato de agencia un comerciante asume el cargo de promover o explotar negocios en determinado ramo y dentro de una zona prefijada como intermediario de otro empresario'
        },
        {
          id:3,
          name:'Sucursales',
          description:'Es la parte de la casa matriz que ubicada en un área distinta de ...',
          descriptionComplete:'Es la parte de la casa matriz que ubicada en un área distinta de ella, tiene el objeto de coadyuvar en la actividad empresarial'
        }
      ]
    }]
  loading : boolean = false;
  topicSelected:any=null;
  subTopicSelected:any=null;
  constructor(
    private croqService:CroqService,
    private router: Router ){

  }

  messages:any[] = [];
  message!:string;
  ngOnInit(): void {}


  topicSelection(topic:any){
    this.topicSelected = topic;
    this.messages = [];
  }
  subTopicSelection(subtopic:any){
    this.subTopicSelected = subtopic;
    this.messages = [];
  }
  return(){
    this.topicSelected = null;
  }
  returnTopic(){
    this.subTopicSelected = null;
  }
  async question(){
    try{
      let answer:any = await firstValueFrom(this.croqService.question(this.message));
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
        Swal.fire('Error', 'Ocurrió un problema al obtener la respuesta.', 'error');
        return;
      }
  }

  menu(){
    this.router.navigate(['/']);
  }
}
