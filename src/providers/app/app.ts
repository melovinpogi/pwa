import { Injectable } from '@angular/core';
import { LoadingController, AlertController, ToastController, Toast, ActionSheetController, Platform } from 'ionic-angular';
import 'rxjs/add/operator/map';
@Injectable()
export class AppProvider {
  toast: Toast;
  public loading: any;
  public isSpecial:boolean = false;

  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public toastController: ToastController,
    private actionSheetCtrl: ActionSheetController,
    private platform: Platform,
  ) {
    
  }
  

  loadingState(message: string) {
    this.loading = this.loadingCtrl.create({
      content: message,
      spinner: 'crescent',
      dismissOnPageChange: true,
    });

  }

  loadingShow(message: string = null) {
    if (!this.loading) {
      this.loading = this.loadingCtrl.create({
        content: message,
        spinner: 'crescent',
      });
      this.loading.present();
    }
  }

  loadingHide() {
    setTimeout(() => {
      if (this.loading) {
        this.loading.dismiss();
        this.loading = null;
      }
    }, 100);

  }

  alertMsg(message: string) {

    this.toast = this.toastController.create({
      message: message,
      position: 'top',
      duration: 5000,
      cssClass: 'danger',
      showCloseButton: true
    });
    this.toast.present();
  }

  alertBox(title: string, message: string, btn: any[], css: string = null) {
    let defultBtn: any[] =
      [
        {
          text: 'Ok',
          handler: () => {
            console.log('Agree clicked');
          }
        }
      ];

    let confirm = this.alertCtrl.create({
      title: title,
      message: message,
      enableBackdropDismiss: false,
      buttons: btn == null ? defultBtn : btn,
      cssClass: css
    });

    // console.log(css)
    confirm.present();
  }

  alertInputBox(title: string, message: string, btn: any[], inputs: any[], css: string = null) {

    let confirm = this.alertCtrl.create({
      title: title,
      message: message,
      inputs: inputs,
      enableBackdropDismiss: false,
      buttons: btn,
      cssClass: css
    });

    // console.log(css)
    confirm.present();
  }


  present(buttons: Array<any>, title: string) {
    buttons.push({
      text: 'Cancel',
      role: 'cancel',
      // icon: 'close',
      cssClass: 'danger'
    });
    let actionSheet = this.actionSheetCtrl.create({
      title: title,
      buttons: buttons
    });
    actionSheet.present();
  }


  sortArray(array, property, direction) {
    direction = direction || 1;
    array.sort(function compare(a, b) {
      let comparison = 0;
      if (a[property] > b[property]) {
        comparison = 1 * direction;
      } else if (a[property] < b[property]) {
        comparison = -1 * direction;
      }
      return comparison;
    });
    return array;
  }


  pltfrm(): string {
    if (this.platform.is('ios')) {
      return "ios";
    }
    else {
      return "android";
    }
  }

  today() {
    return new Date();
  }

  onSearch(e) {
    if (e.keyCode == 13) {
      let activeElement = <HTMLElement>document.activeElement;
      activeElement && activeElement.blur && activeElement.blur();
    }
  }


}





