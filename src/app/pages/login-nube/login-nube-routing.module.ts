import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginNubePage } from './login-nube.page';

const routes: Routes = [
  {
    path: '',
    component: LoginNubePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginNubePageRoutingModule {}
