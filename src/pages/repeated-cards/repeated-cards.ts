import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { FirebaseDbProvider } from '../../providers/firebase-db/firebase-db';
import 'rxjs/add/operator/first';

import { CardListPage } from '../card-list/card-list';

/**
 * Generated class for the RepeatedCardsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-repeated-cards',
  templateUrl: 'repeated-cards.html',
})
export class RepeatedCardsPage {
  collections: any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private dbhDb: FirebaseDbProvider) {
  }

  gotoCollection(idCollection){
    
      this.navCtrl.push(CardListPage);
    
  }

  ionViewDidLoad() {
    this.dbhDb.getCollections().subscribe(collections=>{
      this.collections = collections;
    });
  }

}
