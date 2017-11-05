import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseDbProvider } from '../../providers/firebase-db/firebase-db';

import 'rxjs/add/operator/first';
import * as _ from 'lodash';

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

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private dbhDb: FirebaseDbProvider
  ) {   
    this.counter = 1; 
  }

  cards: any;
  ucards: any;
  processedcards: any;
  ucardscount: any;
  counter: number;
  newer: boolean;
  subscription: any;
  filteredCards: any;

  // filter-able properties
  id: string;
  
  /// Active filter rules
  filters = {}

  getItems(ev){
    
    /* let val = ev.target.value;

    if(val && val.trim() != ''){
      this.processedcards = this.processedcards.filter((tonto)=>{
        return (tonto.toLowerCase().indexOf(val.toLowerCase())>-1)
      })
    } */
  }

  private applyFilters() {
    this.filteredCards = _.filter(this.cards, _.conforms(this.filters) )
  }

  /// filter property by equality to rule
  filterExact(property: string, rule: any) {
    this.filters[property] = val => _.includes(val, rule)
    this.applyFilters()
  }

  savecard(card){
    
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

  updatecounter(card){
    if(this.ucards != undefined){
          this.ucardscount = card.counter;
          this.ucardscount ++;
          this.dbhDb.countCards(card.id,this.ucardscount);
      }
  }

  ionViewDidEnter() {
    console.log('ionViewDidLoad Sdbh7Page');
    
    this.dbhDb.getCards().first().subscribe(cards=>{  
      this.subscription = this.dbhDb.getUserCards().subscribe(ucards=>{
        
        this.ucards = ucards;
        this.cards = (cards[1].cards).concat(cards[2].cards);
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
      });
    });
    this.applyFilters();
  }

  ngOnDestroy(){
    if(this.subscription != undefined){
      this.subscription.unsubscribe();
    }
  }

}
