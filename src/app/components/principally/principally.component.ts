import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-principally',
  templateUrl: './principally.component.html',
  styleUrls: ['./principally.component.css']
})
export class PrincipallyComponent implements OnInit {
  showPopup = true;
  phrase:string='';
  phrases:string[] = [
    "Detrás de cada gran decisión financiera, hay un contador comprometido y preciso.",
    "La contabilidad no solo organiza los números, también da forma al futuro de las empresas.",
    "Un contador no solo cierra balances; abre caminos hacia el éxito.",
    "Donde otros ven cifras, el contador ve oportunidades.",
    "Contar bien no es solo sumar números, es sumar valor.",
    "La ética del contador es su activo más valioso.",
    "Precisión, compromiso y verdad: los pilares de un contador público.",
    "El contador no se equivoca por suerte, se perfecciona por constancia.",
    "En cada asiento contable, hay una historia de esfuerzo y responsabilidad.",
    "La contabilidad no es solo una ciencia; es también un arte de confianza.",
    "Ser contador es tener la responsabilidad de cuidar lo invisible: la confianza.",
    "No se trata solo de cuadrar cifras, sino de generar transparencia y confianza.",
    "Un contador marca la diferencia, incluso cuando nadie lo nota.",
    "Contador: el guardián silencioso de la verdad financiera.",
    "Cuando los números hablan claro, es porque un contador habló primero."
  ];
  ngOnInit(): void {
    this.phrase = this.phrases[Math.floor(Math.random() * this.phrases.length)];
  }
  closePopup() {
    this.showPopup = false;
  }
}
