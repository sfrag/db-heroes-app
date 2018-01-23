import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { FirebaseDbProvider } from '../../../providers/firebase-db/firebase-db';
import { CardsProvider } from '../../../providers/cards/cards';
import 'rxjs/add/operator/first';
/**
 * Generated class for the Gdm1Page page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gdm1',
  templateUrl: 'gdm1.html',
})
export class Gdm1Page {

  cards: any;
  ucards: any;
  processedcards: any;
  subscription: any;

  // esta variable indicara si estamos eliminando o añadiendo una carta
  deleting: boolean;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private dbhDb: FirebaseDbProvider,
    private dbCards: CardsProvider
    ) {
  }

  savecard(card){
    this.dbCards.savecard(card);
    this.updatecounter();
  }

  deletecard(card){
    this.dbCards.deletecard(card);
  }

  updatecounter(){
    this.cards = this.dbCards.loadcards(9);
  }

  ionViewDidEnter() {
    console.log('ionViewDidLoad Sdbh7Page');
    this.cards = this.dbCards.loadcards(9);
  }

  ngOnDestroy(){
    this.dbCards.unsuscribe();
  }

}
