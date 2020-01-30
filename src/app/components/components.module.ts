import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { MoviesComponent } from "src/app/components/movies/movies.component";
import { MovieComponent } from "../components/movie/movie.component";



@NgModule({
  entryComponents: [
    MovieComponent
  ],
  declarations: [
    HeaderComponent,
    MoviesComponent,
    MovieComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    HeaderComponent,
    MoviesComponent,
    MovieComponent
  ]
})
export class ComponentsModule { }
