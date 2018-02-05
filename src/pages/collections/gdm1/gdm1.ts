import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { FirebaseDbProvider } from '../../../providers/firebase-db/firebase-db';
import { CardsProvider } from '../../../providers/cards/cards';
import 'rxjs/add/operator/first';
import * as _ from 'lodash';

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
  repeatedcards: any;
  cardswapper: any;
  counter: number;


  // esta variable indicara si estamos eliminando o añadiendo una carta
  deleting: boolean;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private dbhDb: FirebaseDbProvider,
    private dbCards: CardsProvider
    ) {
      this.cardswapper = "all";
      this.repeatedcards = [];
      this.counter = 1;
  }

  showrepeatedcards(event){
    this.repeatedcards = this.dbCards.showrepeated();
  }

  deletefromrepeated(card){
    this.repeatedcards = this.dbCards.deleterepeated(card);
  }

  savecard(card){
    this.dbCards.savecard(card);
    this.updatecounter(card);
  }

  deletecard(card){
    this.dbCards.deletecard(card);
    if(card.counter == 1){ this.deletefromrepeated(card); };
  }

  updatecounter(card){
    this.cards = this.dbCards.loadcards(9);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Sdbh7Page');
    this.cards = this.dbCards.loadcards(9);
  }

  ngOnDestroy(){
    this.dbCards.unsuscribe();
  }

}
