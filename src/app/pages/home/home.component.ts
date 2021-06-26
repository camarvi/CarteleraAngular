import { Component, HostListener, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/cartelera-response';
import { PeliculasService } from '../../services/peliculas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public movies : Movie[]=[];
  public moviesSlideshow : Movie[]=[];

  @HostListener('window:scroll',['$event'])
  onScroll(){
    
    const pos = (document.documentElement.scrollTop || document.body.scrollTop ) + 1300;
    const max = (document.documentElement.scrollHeight || document.body.scrollHeight);

    if (pos > max){
      // LLAMAR AL SERVICIO
      this.peliculasService.getCartelera().subscribe(resp =>{
        this.movies.push(...resp.results);
      });
      console.log('Llamar al servicio');
    }

   

  }

  constructor(private peliculasService: PeliculasService) { 


  }

  ngOnInit(): void {
    
    this.peliculasService.getCartelera()
    .subscribe(resp=>{
     // console.log(resp.results);
      this.movies = resp.results;
      this.moviesSlideshow = resp.results;
    })     
  }

}
