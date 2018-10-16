import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AdMobFree, AdMobFreeBannerConfig, AdMobFreeInterstitialConfig } from '@ionic-native/admob-free';

import { CardSearchPage } from '../card-search/card-search';
import { CardchangePage } from '../cardchange/cardchange';
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
  public collections; //Cardslistpage
  public cardsearch;  //RepeatedCardsPage
  private cardchange;
  private collectionsinfo;

  constructor(
    public navCtrl: NavController,
    public admob: AdMobFree, 
    public navParams: NavParams) {
      this.rootPage = RepeatedCardsPage;
      this.collections = RepeatedCardsPage;
      this.cardsearch = CardSearchPage;
      this.cardchange = CardchangePage;
      this.collectionsinfo = InfoPage;
    }

  gotoPage(page){
    this.navCtrl.push(page);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DbhMenuPage');

    let bannerConfig: AdMobFreeBannerConfig = {
      isTesting: false, // Remove in production
      autoShow: true,
      /* id: "ca-app-pub-8242370848921742~3459518738" */
      id: "ca-app-pub-8242370848921742/6283038915"
    };

    this.admob.banner.config(bannerConfig);

    this.admob.banner.prepare().then(() => {
      this.admob.banner.show()
    }).catch(e => console.log(e));

  }

}
