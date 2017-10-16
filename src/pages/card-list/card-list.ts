import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FirebaseDbProvider } from '../../providers/firebase-db/firebase-db';

import 'rxjs/add/operator/first';

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
  ucardscount: any;
  counter: number;
  newer: boolean;
  test2: any;


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
    
    let user_card = this.ucards;

    // Si no tenemos guardada la carta la guardamos, si ya la tenemos llamamos a cardcounter para que la sume
    
    for(let i = 0;i<user_card.length; i++){
      let test = user_card[i];
      if(test.card == card.id){
        this.newer = false;
        this.addcard(card);
        return;
      }
    }
    if(this.newer){
      this.dbhDb.saveCard(card.id, this.counter);
    }
  }

  addcard(card){

  }

  cardcounter(card){
    if(this.ucards != undefined){
      this.test2 = this.ucards;
      for(let i=0; i < this.test2.length; i++){
        if(this.test2[i].card == card.id){
          return this.test2[i].counter;
        }
      }
    }
  }

  /* ionViewDidEnter(){
    this.dbhDb.getCards().subscribe(cards=>{
      this.cards = cards;
    }) */

    ionViewDidEnter(){
    this.dbhDb.getCards().first().subscribe(cards=>{
      this.cards = cards;
    })
    
    //Preparamos una variable donde estaran las cartas que tiene el usuario
    this.dbhDb.getUserCards().first().subscribe(ucards=>{
      this.ucards = ucards;
    })
  }

}
