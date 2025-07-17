import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CroqService {
  ruta:string  = 'https://agentebackend.onrender.com/';
  rutaLocal:string  = 'http://localhost:3000/';
  constructor(private http: HttpClient) { }

  opening(prompt:string, process:any){
    let params:HttpParams = new HttpParams().set("prompt",prompt).set("numeration",process.numeration);
    return this.http.get(`${this.ruta}api/croq/opening_process`,  { params })
  }

  question(prompt:string){
    let params:HttpParams = new HttpParams().set("prompt",prompt);
    return this.http.get(`${this.ruta}api/croq/question`,  { params })
  }
  evaluation(prompt:string, messages:any[], topic:string,numeration:number){
    let params:HttpParams = new HttpParams().set("prompt",prompt).set("messages",JSON.stringify(messages)).set("topic",topic).set("numeration",numeration);
    return this.http.get(`${this.ruta}api/croq/evaluation/formative`,  { params })
  }
}
