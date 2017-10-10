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
  counter: number;
  newer: boolean;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private dbhDb: FirebaseDbProvider
  ) {
    this.counter = 0;
    this.newer = true;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CardListPage');
  }

  // Comprobar si esto funciona correctamente

  savecard(card){
    //Preparamos una variable donde estaran las cartas
    this.dbhDb.getUserCards().subscribe(ucards=>{
      this.ucards = ucards;
    })
    
    let user_card = this.ucards;

    // Si no tenemos guardada la carta la guardamos, si ya la tenemos llamamos a cardcounter para que la sume
    
    for(let i = 0;i<user_card.length; i++){
      let test = user_card[i];
      if(test.card == card.id){
        this.newer = false;
        this.cardcounter(card);
        return;
      }
    }
    if(this.newer){
      this.dbhDb.saveCard(card.id, this.counter);
    }
    else{

    }
  }

  cardcounter(card){
    card.counter = card.counter + 1;
  }

  ionViewDidEnter(){
    this.dbhDb.getCards().subscribe(cards=>{
      this.cards = cards;
    })
  }
}
