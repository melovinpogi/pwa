import { Component, ViewChild } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';


@IonicPage({
  segment: "home"
})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('fileInput') fileInput;

  profilePic: any = null;
  constructor(public navCtrl: NavController,
    private camera: Camera) {

  }


  openPage(component: any) {
    this.navCtrl.push(component);
  }


  getPicture() {
    if (Camera['installed']()) {
      this.camera.getPicture({
        destinationType: this.camera.DestinationType.DATA_URL,
        targetWidth: 96,
        targetHeight: 96
      }).then((data) => {
        this.profilePic = 'data:image/jpg;base64,' + data
       // console.log('data:image/jpg;base64,' + data);
      }, (err) => {
        alert('Unable to take photo');
      })
    } else {
      this.fileInput.nativeElement.click();
    }
  }

  processWebImage(event) {
    let reader = new FileReader();
    reader.onload = (readerEvent) => {
      let imageData = (readerEvent.target as any).result;
     // console.log(imageData)
      this.profilePic = imageData;
    };

    reader.readAsDataURL(event.target.files[0]);
  }


  logout(){
    this.navCtrl.setRoot('LoginPage')
  }


}
