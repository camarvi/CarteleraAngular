import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { tap } from 'rxjs/operators'; //Sirve para lanzar un efecto secundario
//Ejecuta el observable cada vez que este devuelve un valor

import { CarteleraResponse } from '../interfaces/cartelera-response';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private baseUrl: string = 'https://api.themoviedb.org/3';
  private carteleraPage: number = 1;

  constructor( private http : HttpClient) { };

  get params(){
    return {
      api_key :'8f3ad1cb69ee0dfc3bb6eb25f16208dc',
      language : 'es-ES',
      page : this.carteleraPage.toString()
    }
  }

  getCartelera(): Observable<CarteleraResponse>{

  // return this.http.get<CarteleraResponse>(`${this.baseUrl}/movie/now_playing?api_key=8f3ad1cb69ee0dfc3bb6eb25f16208dc&language=es-ES&page=1`);
    
   return this.http.get<CarteleraResponse>(`${this.baseUrl}/movie/now_playing`,{
     params : this.params
   }).pipe(
     tap( ()=>{
       this.carteleraPage +=1; //Incrementa en uno la variable 
     })
   );
  

  }

}
