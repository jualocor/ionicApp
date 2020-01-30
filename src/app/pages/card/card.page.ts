import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "src/app/auth/authentication.service";
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'app-card',
  templateUrl: './card.page.html',
  styleUrls: ['./card.page.scss'],
})
export class CardPage implements OnInit {

  items = [];
  valid;

  page = 0;
  constructor(
    private authenticationService: AuthenticationService,
    private modalCtrl: ModalController
    ) { }
  ngOnInit() {
  }
  ionViewDidEnter() {
    console.log("ionViewDidEnter");
    this.test(this.page);
  }
  async test(page) {
    this.page = this.page + 1;
    let result = await this.authenticationService.movieApi(this.page);
    console.log(result);
    this.valid = result;
    this.valid.forEach(element => {
      element.vote_average = element.vote_average / 10;
      this.items.push(element);
    });
  }

  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      this.test(this.page);
      event.target.complete();
    })
  }

}

