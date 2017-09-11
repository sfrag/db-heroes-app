import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseDbProvider } from '../../providers/firebase-db/firebase-db';

/**
 * Generated class for the CardListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-card-list',
  templateUrl: 'card-list.html',
})
export class CardListPage {

  cards: any;
  test: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public dbhDb: FirebaseDbProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CardListPage');
  }

  ionViewDidEnter(){
    this.dbhDb.getCards().subscribe(cards=>{
      this.cards = cards;
    })
  }
}
