import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { CardListPage } from '../card-search/card-search';
import { RepeatedCardsPage } from '../repeated-cards/repeated-cards';
import { InfoPage } from '../info/info';

/**
 * Generated class for the DbhMenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dbh-menu',
  templateUrl: 'dbh-menu.html',
})
export class DbhMenuPage {
  
  private rootPage;
  private collections; //Cardslistpage
  private cardsearch;  //RepeatedCardsPage
  private collectionsinfo;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams) {
      this.rootPage = RepeatedCardsPage;
      this.collections = RepeatedCardsPage;
      this.cardsearch = CardListPage;
      this.collectionsinfo = InfoPage;
  }

  gotoPage(page){
    this.navCtrl.push(page);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DbhMenuPage');
  }

}
