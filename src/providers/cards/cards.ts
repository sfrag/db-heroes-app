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

  savecard(card){

    this.deleting = false;
    this.newer = true;
    let user_card = this.ucards;

    // Si ya la tenemos, solo actualizaremos el valor de counter
    
    for(let i = 0;i<user_card.length; i++){
      let test = user_card[i];
      if(test.id == card.id){
        this.newer = false;
        this.updatecounter(test);
        return;
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

  deletecard(card){

    this.deleting = true;
    let user_card = this.ucards;

    for(let i = 0;i<user_card.length; i++){
      let test = user_card[i];
      if(test.id == card.id){
        this.updatecounter(test);
        return;
      }
    }
  }

  updatecounter(card){
    if(this.ucards != undefined){
          this.ucardscount = card.counter;
          if(this.deleting == false){
            this.ucardscount ++;
            this.dbhDb.countCards(card.id,this.ucardscount);
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

  showrepeated(){
    this.repeatedcards = [];
    for (let i=0; i<this.cards.length; i++){
      if(this.cards[i].counter > 1){
        this.repeatedcards.push(this.cards[i]);
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

  loadcards(colnumber){

    /* Terminated by error still fires function */
    /* var source = Rx.Observable.throw(new Error())
    .finally(function () { console.log('Finally'); });

    var subscription = source.subscribe(
    function (x) {
      console.log('Next: %s', x);
    },
    function (err) {
      console.log('Error: %s', err);
    },
    function () {
      console.log('Completed');
    }); */

    // => Error: Error
    // => Finally

    var t1 = {}

    this.dbhDb.getCards().first().subscribe(cards=>{  
      this.cards = cards[colnumber].cards;
      /* this.subscription = this.dbhDb.getUserCards().subscribe(ucards=>{
        
        this.ucards = ucards;
        this.cards = cards[colnumber].cards;
        this.processedcards = cards;

        for(let i=0; i<this.ucards.length; i++){
          var pilla = this.ucards[i];
          for( let j=0; j<this.processedcards.length; j++){
            var pilla2 = this.processedcards[j];
            if(pilla.collection == pilla2.name){
              console.log("Es de esta colección, busco dentro");
              for(let k=0; k<pilla2.cards.length; k++){
                var pilla3 = pilla2.cards[k];
                if(pilla3.id == pilla.id){
                  pilla3.counter = pilla.counter;
                }
              }
            }
          }
        }
      }); */
    });
    return this.cards;
  }

  unsuscribe(){
    if(this.subscription != undefined){
      this.subscription.unsubscribe();
    }
  }
}
