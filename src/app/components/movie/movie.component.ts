import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from "src/app/auth/authentication.service";
import { ModalController } from "@ionic/angular";

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
})
export class MovieComponent implements OnInit {

	@Input() id;
	@Input() movieImage;
	@Input() title;
	cast;
  constructor(
    private authenticationService: AuthenticationService,
    private modalCtrl: ModalController
    ) { }

  async ngOnInit() {
  	let detailMovie = await this.authenticationService.movieDetail(this.id);
  	this.cast = detailMovie;
  }
  async closeModal() {
  	this.modalCtrl.dismiss();
  }

}
