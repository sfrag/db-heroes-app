import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

/**
 * Generated class for the DhbTabsPage tabs.
 *
 * See https://angular.io/docs/ts/latest/guide/dependency-injection.html for
 * more info on providers and Angular DI.
 */

@IonicPage()
@Component({
  selector: 'page-dhb-tabs',
  templateUrl: 'dhb-tabs.html'
})
export class DhbTabsPage {

  cardListRoot = 'CardListPage'
  repeatedCardsRoot = 'RepeatedCardsPage'
  infoRoot = 'InfoPage'


  constructor(public navCtrl: NavController) {}

}
