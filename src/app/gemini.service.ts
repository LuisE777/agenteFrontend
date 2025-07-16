import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class GeminiService {

  constructor(private http: HttpClient) { }
  see(){
    alert("hola")
  }
  question(prompt:string){
    let params:HttpParams = new HttpParams().set("prompt",prompt);
    return this.http.get("http://localhost:3000/api/gemini/prompts",  { params })
  }
  evaluation(prompt:string, messages:any[]){
    let params:HttpParams = new HttpParams().set("prompt",prompt).set("messages",JSON.stringify(messages));
    return this.http.get("http://localhost:3000/api/gemini/evaluation/formative",  { params })
  }

}
