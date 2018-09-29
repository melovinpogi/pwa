import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root: any;
  tab2Root: any;
  tab3Root: any;

  tab1Title = " ";
  tab2Title = " ";
  tab3Title = " ";

  constructor(public navCtrl: NavController) {
  }
}
