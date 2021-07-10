import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { tap, map } from 'rxjs/operators'; //Sirve para lanzar un efecto secundario
//Ejecuta el observable cada vez que este devuelve un valor

import { CarteleraResponse, Movie } from '../interfaces/cartelera-response';
import { MovieResponse } from '../interfaces/movie-response';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private baseUrl: string = 'https://api.themoviedb.org/3';
  private carteleraPage: number = 1;
  public cargando : boolean = false;

  constructor( private http : HttpClient) { };

  get params(){
    return {
      api_key :'8f3ad1cb69ee0dfc3bb6eb25f16208dc',
      language : 'es-ES',
      page : this.carteleraPage.toString()
    }
  }

  resetCartelera(){
    this.carteleraPage = 1;
  }

  getCartelera(): Observable<Movie[]>{

    // return this.http.get<CarteleraResponse>(`${this.baseUrl}/movie/now_playing?api_key=8f3ad1cb69ee0dfc3bb6eb25f16208dc&language=es-ES&page=1`);
      
    if ( this.cargando){
      return of([]);
    }
  
    console.log("Cargando API")
    this.cargando = true;
  
     return this.http.get<CarteleraResponse>(`${this.baseUrl}/movie/now_playing`,{
       params : this.params
     }).pipe(
       map( (resp) => resp.results ),
       tap( ()=>{
         this.carteleraPage +=1; //Incrementa en uno la variable 
         this.cargando = false;
       })
     );
    
  
    }

  buscarPelicula(texto : string): Observable<Movie[]>{
   //https://api.themoviedb.org/3/search/movie?api_key=8f3ad1cb69ee0dfc3bb6eb25f16208dc&language=es-ES&query=mulan&page=1&include_adult=false

    const params = {...this.params, page : '1', query : texto};

    return this.http.get<CarteleraResponse>(`${this.baseUrl}/search/movie`,{
      params 
    }).pipe(
      map(resp => resp.results)
    )
    }


  getPeliculaDetalle(id : string ){


    //https://api.themoviedb.org/3/movie/588228?api_key=8f3ad1cb69ee0dfc3bb6eb25f16208dc&language=es-ES
    return this.http.get<MovieResponse>(`${this.baseUrl}/movie/${id}`, {
      params: this.params
    });
  }


  }



