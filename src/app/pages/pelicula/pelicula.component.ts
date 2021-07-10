import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieResponse } from 'src/app/interfaces/movie-response';
import { PeliculasService } from '../../services/peliculas.service';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {

  constructor(private activatedRoute : ActivatedRoute,
              private peliculasService : PeliculasService) { }

  ngOnInit(): void {

   const id = this.activatedRoute.snapshot.params.id;
   //Tambien se puede hacer mediante desctructuracion
   //const {id} = this.activatedRoute.snapshot.params;

   console.log("Valor recibido");
   console.log(id);
   this.peliculasService.getPeliculaDetalle(id)
     .subscribe( (movie )=>{
       console.log(movie);
     })
  
  }

}
