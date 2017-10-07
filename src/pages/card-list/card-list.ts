import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
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
  ucards: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private dbhDb: FirebaseDbProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CardListPage');
  }

  // Comprobar si esto funciona correctamente

  savecard(card){
    //Guardamos la carta
    this.dbhDb.saveCard(card.id); //esto ya funciona
    this.searchcard();
  }

  searchcard(){
    //Si la carta no la teniamos, haremos una marca para saber que esa carta la tenemos
    //Si la carta ya la tenemos no haremos nada 
    this.dbhDb.getUserCards().subscribe(ucards=>{
      this.ucards = ucards;
    })
  }

  ionViewDidEnter(){
    this.dbhDb.getCards().subscribe(cards=>{
      this.cards = cards;
    })
  }
}
