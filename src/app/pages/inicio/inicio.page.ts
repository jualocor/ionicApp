import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  componentes: Componente[] = [
    {
      icon: 'american-football',
      name: 'Action Sheet',
      redirectTo: '/action-sheet'
    },
    {
      icon: 'appstore',
      name: 'Alert',
      redirectTo: '/alert'
    },
    {
      icon: 'beaker',
      name: 'avatar',
      redirectTo: '/avatar'
    },
    {
      icon:'radio-button-on',
      name:"Botones",
      redirectTo: "/buttons"
    },
    {
      icon:'browsers',
      name:"Card",
      redirectTo: "/card"
    },
    {
      icon:'checkmark-circle-outline',
      name:"Checbox",
      redirectTo: "/check"
    },
    {
      icon:'calendar',
      name:"Datetim3",
      redirectTo: "/date-time"
    },
    {
      icon:'car',
      name:"fabs",
      redirectTo: "/fab"
    },
    {
      icon:'bluetooth',
      name:"Bluetooth",
      redirectTo: "/blue"
    }
  ];


  constructor() { }

  ngOnInit() {
  }

}

interface Componente {
  icon:string;
  name:string;
  redirectTo:string;
}
