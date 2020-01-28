import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginNubePageRoutingModule } from './login-nube-routing.module';
import { LoginComponent} from './login-nube.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginNubePageRoutingModule,
    ComponentsModule
  ],
  declarations: [LoginComponent]
})
export class LoginNubePageModule {}
