import { Injectable } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseDbProvider } from '../../providers/firebase-db/firebase-db';
import Rx from 'rxjs/Rx';
import 'rxjs/add/operator/first';
import * as _ from 'lodash';

/*
  Generated class for the CardsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CardsProvider {

  constructor(private dbhDb: FirebaseDbProvider) {
    console.log('Hello CardsProvider Provider');
    this.counter = 1;
    this.repeatedcards = [];
  }

  // esta variable indicara si estamos eliminando o añadiendo una carta
  deleting: boolean;
  cards: any;
  ucards: any;
  processedcards: any;
  ucardscount: any;
  counter: number;
  newer: boolean;
  subscription: any;
  repeatedcards: any;

  savecard(card, ucards){

    this.deleting = false;
    this.newer = true;
    let user_card = ucards;

    // Si ya la tenemos, solo actualizaremos el valor de counter
    
    for(let i = 0;i<user_card.length; i++){
      let test = user_card[i];
      if(test.id == card.id){
        this.newer = false;
        this.ucardscount = this.updatecounter(test, ucards);
        return this.ucardscount;
      }
    }

    // Si la carta que queremos añadir es nueva, tenemos que añadir toda la carta a la base de datos de cartas de este usuario
    
    if(this.newer){
      let newcard = {}
      newcard = {
        collection: card.collection,
        id: card.id,
        counter: this.counter
      }
      this.dbhDb.saveCard(newcard);
    }
  }

  deletecard(card, ucards){

    this.deleting = true;
    let user_card = ucards;

    for(let i = 0;i<user_card.length; i++){
      let test = user_card[i];
      if(test.id == card.id){
        this.updatecounter(test, user_card);
        return;
      }
    }
  }

  updatecounter(card, ucards){
    if(ucards != undefined){
          this.ucardscount = card.counter;
          if(this.deleting == false){
            this.ucardscount ++;
            this.dbhDb.countCards(card.id,this.ucardscount);
            return this.ucardscount;
          }
          else if(this.deleting == true){
            // mientras el número de cartas que tengamos sea mayor que 1 simplemente restaremos el contador
            if(this.ucardscount>1){
              this.ucardscount --;
              //if( this.ucardscount == 1 ){ this.deleterepeated(card); }
              this.dbhDb.countCards(card.id,this.ucardscount);
            }
            // si el contador de cartas es 1 y eliminamos uno mas significa que ya no tenemos la carta
            // perder una carta es algo extraño pero podría suceder si el usuario se ha equivocado
            // en este caso sería interesante mostrar una alerta indicanto que la carta se va a borrar
            // de la base de datos y si lo acepta, la carta se borrará de la base de datos del usuario
            else if(this.ucardscount == 1){
              this.ucardscount --;
              this.dbhDb.countCards(card.id,this.ucardscount);
              this.dbhDb.deleteCard(card);
            }
            
          }
          
      }
  }

  showrepeated(cards){
    this.repeatedcards = [];
    for (let i=0; i<cards.length; i++){
      if(cards[i].counter > 1){
        this.repeatedcards.push(cards[i]);
      }
    }
    return this.repeatedcards;
  }

  deleterepeated(card){
    this.repeatedcards = _.remove(this.repeatedcards, function(n){
      return n.id != card.id;});
    return this.repeatedcards;
  }

  showrepeatedcards(event){
    this.repeatedcards = [];
    for (let i=0; i<this.cards.length; i++){
      if(this.cards[i].counter > 1){
        this.repeatedcards.push(this.cards[i]);
      }
    }
  } 

  loadcards(){
    //return cards observable
    return this.dbhDb.getCards().first();
  }

  loadusercards(){
    //return user cards observable
    return this.dbhDb.getUserCards();
  }

  unsuscribe(){
    if(this.subscription != undefined){
      this.subscription.unsubscribe();
    }
  }
}
