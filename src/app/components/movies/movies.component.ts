import { Component, OnInit, Input } from '@angular/core';
import { MovieComponent } from "../movie/movie.component";
import { ModalController } from "@ionic/angular";

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit {

  @Input() items;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  async showDetails(id, movieImage, title) {
  	const modal = await this.modalCtrl.create({
  		component: MovieComponent,
  		componentProps: {
  			id,
  			movieImage,
  			title
  		}
  	});

  	modal.present();
  }

}
