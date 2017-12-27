import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { FirebaseDbProvider } from '../../providers/firebase-db/firebase-db';
import 'rxjs/add/operator/first';
/**
 * Generated class for the InfoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-info',
  templateUrl: 'info.html',
})
export class InfoPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private dbhDb: FirebaseDbProvider
  ) {
  }
  
  collections: any;
  numberofCollections: number;
  cards: any;
  totalCards: number;

  ionViewDidLoad() {
    this.dbhDb.getCollections().first().subscribe(collections=>{
      this.collections = collections;
      this.numberofCollections = this.collections.length;
      //info page collections
    });

    this.dbhDb.getCards().first().subscribe(cards=>{
      this.cards = cards;
    });
  }
}
