import { Component, OnInit, NgZone, Input } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { ToastController, AlertController } from '@ionic/angular';
import { BLE } from '@ionic-native/ble/ngx';
import {DetailPagePage} from '../detail-page/detail-page.page';

@Component({
  selector: 'app-blue',
  templateUrl: './blue.page.html',
  styleUrls: ['./blue.page.scss'],
})
export class BluePage {

  devices: any[] = [];
  statusMessage: string;
  peripheral: any = {};

  constructor(public navCtrl: NavController,
              private toastCtrl: ToastController,
              private ble: BLE,
              private ngZone: NgZone,
              private alertCtrl: AlertController,
              private router: Router
  ) { }
  ionViewDidEnter() {
    console.log("ionViewDidEnter");
    this.scan();
  }
  scan(){
    this.presentToast("Scanning Blue devices");
    this.devices = [];
    this.ble.scan(["6e400001-b5a3-f393-e0a9-e50e24dcca9e"], 5).subscribe(
      device => this.onDeviceDiscovered(device),
      error => this.scanError(error)
    );

    setTimeout(this.setStatus.bind(this), 500, 'Scan Complete');
  }

  async presentToast(message: string, position: "bottom" | "middle" | "top" = "top") {

    console.log(message);
    const toast = await this.toastCtrl.create({
      message,
      duration: 5000,
      position
    });
    toast.present();
  }

  onDeviceDiscovered(device) {
    console.log("Discovered", JSON.stringify(device, null, 2));
    this.ngZone.run(()=> {
      if(device.name) {
        this.devices.push(device);
      }
    })
  }
  async scanError(error) {
    this.setStatus("Error" + error);
    let toast = await this.toastCtrl.create({
      message: "Error scanning for Bluetooth low energy devices",
      position: 'middle',
      duration: 5000
    });
    toast.present();
  }
  setStatus(message) {
    console.log(message);
    this.ngZone.run(()=> {
      this.statusMessage = message;
    });
  }

  deviceSelected(device) {
    console.log(JSON.stringify(device) + 'selected');
    this.ble.connect(device.id).subscribe(
      peripheral => this.onConnected(peripheral),
      peripheral => this.onDeviceDisconnected(peripheral)
    )
  }
  onConnected(peripheral) {
    this.ngZone.run(() => {
      console.log(peripheral);
      this.presentToast('Connectado');
      this.peripheral = peripheral;
      this.startNotificiation(this.peripheral);

      this.writeModbusRegister(this.peripheral);
      
    })
  }
  onDeviceDisconnected(peripheral) {
    this.presentToast(JSON.stringify(peripheral));
  }

  writeModbusRegister(peripheral) {

    console.log("Write Modbus => " + JSON.stringify(peripheral));
    let data = new Uint8Array(6);
    data[0] = 0x1;
    data[1] = 0x3;
    data[2] = 0x0;
    data[3] = 0x120C;
    data[4] = 0x0;
    data[5] = 0x1;
    this.ble.write(peripheral.id,"6e400001-b5a3-f393-e0a9-e50e24dcca9e","6e400002-b5a3-f393-e0a9-e50e24dcca9e", data.buffer).then(
      data => this.showAlert("WRITE", data),
      (err) => this.showAlert('ERROR', err)
    )
  }

  startNotificiation(peripheral) {
  
    this.ble.startNotification(peripheral.id,"6e400001-b5a3-f393-e0a9-e50e24dcca9e","6e400003-b5a3-f393-e0a9-e50e24dcca9e").subscribe(
      data => {
        console.log("NOTIFICACION");
        console.log(data);
        let buffer = new Uint8Array(data);
        this.presentToast("NOTIFICACION" + data);
      },
      (error) => this.showAlert('ERROR',error)
    );
  }

  async showAlert(title, message) {
    const alert = await this.alertCtrl.create({
      header: title,
      message: message,
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'Okay',
        handler: () => {
          //console.log('Confirm Okay');
        }
      }]
    });

    await alert.present();
  }

  bytesToString(buffer) {

    return String.fromCharCode.apply(null, new Uint8Array(buffer));
  }
  success() {
    console.log(this);
  }
  fail() {
    console.log(this);
  }

  goToDetail(device) {
    console.log('GoToDetail'+device)
    let navigationExtras: NavigationExtras = {
      state: {
        device
      }
    }
    this.router.navigate(['detail-page'],navigationExtras);
  }
  doRefresh(event) {
    setTimeout(() => {
      this.scan();
      event.target.complete();
    }, 1500)
    
  }
}
