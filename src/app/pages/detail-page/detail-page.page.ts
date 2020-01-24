import { Component, OnInit, NgZone, Input } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController, AlertController } from '@ionic/angular';
import { BLE } from '@ionic-native/ble/ngx';
@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.page.html',
  styleUrls: ['./detail-page.page.scss'],
})
export class DetailPagePage implements OnInit {

  device;
  peripheral: any = {};
  datos = [];
  colorButton = "danger";
  status = "Disconnected";
  constructor(public navCtrl: NavController,
              private toastCtrl: ToastController,
              private ble: BLE,
              private ngZone: NgZone,
              private alertCtrl: AlertController,
              private router: Router,
              private route: ActivatedRoute
              ) { 
                this.route.queryParams.subscribe(
                  params => {
                    console.log('Paramas');
                    
                    if (this.router.getCurrentNavigation().extras.state) {

                      this.device = this.router.getCurrentNavigation().extras.state.device;
                    }
                  }
                )
              }

  ngOnInit() {
    console.log(this.device);
    this.deviceSelected();
  }
  deviceSelected() {
    console.log(JSON.stringify(this.device) + 'selected');
    this.ble.connect(this.device.id).subscribe(
      peripheral => this.onConnected(peripheral),
      peripheral => this.onDeviceDisconnected(peripheral)
    )
  }
  async presentToast(message: string) {

    console.log(message);
    const toast = await this.toastCtrl.create({
      message,
      duration: 5000
    });
    toast.present();
  }
  onConnected(peripheral) {
    this.ngZone.run(() => {
      console.log(peripheral);
      this.datos= [];
      this.presentToast('Coneccted');
      this.peripheral = peripheral;
      this.startNotificiation(this.peripheral);
      this.colorButton = "success";
      this.status = "Connected"

      //this.writeModbusRegister(this.peripheral);
      
    })
  }
  disconnected() {
    this.ble.disconnect(this.peripheral.id).then(
      success => this.onDeviceDisconnected(this.peripheral),
      err => this.showAlert("ERROR", err)
    )
  }

  onDeviceDisconnected(peripheral) {
    this.colorButton = "Danger";
    this.status = "Disconnected";
    this.presentToast("Disconnected");

  }

  writeModbusRegister(peripheral, data) {

    console.log("Write Modbus => " + JSON.stringify(peripheral));

    this.ble.write(peripheral.id,"6e400001-b5a3-f393-e0a9-e50e24dcca9e","6e400002-b5a3-f393-e0a9-e50e24dcca9e", data.buffer).then(
      data => this.presentToast("Command Sent"),
      (err) => this.showAlert('ERROR', err)
    )
  }
  sendCommandRead(peripheral) {
    this.datos = [];
    let data = new Uint8Array(8);
    data[0] = 0x1;
    data[1] = 0x3;
    data[2] = 0x12;
    data[3] = 0xE;
    data[4] = 0x0;
    data[5] = 0x2;
    data[6] = 0xA0;
    data[7] = 0xB0;
    this.writeModbusRegister(peripheral, data);
  }
  sendCommandWrite(peripheral) {
    this.datos = [];
    let data = new Uint8Array(8);
    data[0] = 1;
    data[1] = 6;
    data[2] = 18;
    data[3] = 12;
    data[4] = 0;
    data[5] = 1;
    data[6] = 141;
    data[7] = 113;
    this.writeModbusRegister(peripheral, data);
  }


  startNotificiation(peripheral) {
    this.ble.startNotification(peripheral.id,"6e400001-b5a3-f393-e0a9-e50e24dcca9e","6e400003-b5a3-f393-e0a9-e50e24dcca9e").subscribe(
      data => {
        console.log("NOTIFICACION");
        
        let buffer = new Uint8Array(data);
        this.datos.push(buffer[0]);
        console.log((buffer)[0]);
        //this.presentToast("NOTIFICACION" + data);
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

}
