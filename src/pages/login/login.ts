import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController } from 'ionic-angular';

import { User, AppProvider, Strings } from '../../providers';
import { Storage } from '@ionic/storage';

@IonicPage({
  segment: "login"
})

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  account: { username: string, password: string } = {
    username: null,
    password: null
  };

  constructor(public navCtrl: NavController,
    public user: User,
    public storage: Storage,
    private menu: MenuController,
    private app: AppProvider) {
    console.log(window.innerWidth, window.screen.height);
  }

  ionViewDidLoad() {
    this.storage.get("_user").then(user => {
      if (user != null) {
        this.navCtrl.setRoot('HomePage');
      }
      else {
        this.menu.close()
      }
    })
  }

  doLogin() {
    this.user.login(this.account).subscribe((res: any) => {
      if (res._tknID != null && res._tkn != null) {
        this.navCtrl.setRoot('HomePage');
      }
    }, (err) => {
      this.app.alertMsg(JSON.stringify(err))
    });
  }

  signup() {
    this.navCtrl.push('SignupPage')
  }

}
