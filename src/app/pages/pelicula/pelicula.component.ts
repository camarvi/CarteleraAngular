import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieResponse } from 'src/app/interfaces/movie-response';
import { PeliculasService } from '../../services/peliculas.service';
import { Location } from '@angular/common';
import { Cast } from '../../interfaces/credits-response';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})

export class PeliculaComponent implements OnInit {

  public pelicula : MovieResponse;  
  public cast : Cast[] = [];


  constructor(private activatedRoute : ActivatedRoute,
              private peliculasService : PeliculasService,
              private router : Router,
              private location : Location) { }

  ngOnInit(): void {

   const id = this.activatedRoute.snapshot.params.id;
   //Tambien se puede hacer mediante desctructuracion
   //const {id} = this.activatedRoute.snapshot.params;

   //console.log("Valor recibido");
   //console.log(id);


  combineLatest([
    this.peliculasService.getPeliculaDetalle(id),
    this.peliculasService.getCast(id)
  ]).subscribe( ([pelicula,cast]) =>{
    if (!pelicula) {
      this.router.navigateByUrl('/home');
      return;
    }
    this.pelicula = pelicula;  
    this.cast = cast.filter(actor => actor.profile_path != null);
  })


  //  this.peliculasService.getPeliculaDetalle(id)
  //    .subscribe( (movie )=>{
  //      if (!movie) {
  //        this.router.navigateByUrl('/home');
  //        return;
  //      }

  //      console.log(movie);
  //      this.pelicula = movie;
  //    });

  //   this.peliculasService.getCast(id)
  //     .subscribe(cast => {
  //       console.log("Casting de la Peli");
  //       console.log(cast);
  //       this.cast = cast.filter(actor => actor.profile_path != null);
  //     }); 
  


  }

  onRegresar(){

      this.location.back();

  }

}
