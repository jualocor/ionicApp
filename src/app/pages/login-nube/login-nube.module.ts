import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginNubePageRoutingModule } from './login-nube-routing.module';

import { LoginNubePage } from './login-nube.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginNubePageRoutingModule
  ],
  declarations: [LoginNubePage]
})
export class LoginNubePageModule {}
