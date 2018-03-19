import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { FirebaseDbProvider } from '../../providers/firebase-db/firebase-db';
import { CardPreviewModalPage } from '../card-preview-modal/card-preview-modal';

//import { SearchCardsPipe } from '../../pipes/search-cards/search-cards';

import 'rxjs/add/operator/first';
import * as _ from 'lodash';

/**
 * Generated class for the CardSearchPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-card-search',
  templateUrl: 'card-search.html',
})
export class CardSearchPage {

  cards: any;
  tosearchcards: any;
  ucards: any;
  processedcards: any;
  ucardscount: any;
  counter: number;
  newer: boolean;
  subscription: any;
  filteredCards: any;
  cardsconcat: any;

  // esta variable indicara si estamos eliminando o añadiendo una carta
  deleting: boolean;

  // filter-able properties
  id: string;
  
  /// Active filter rules
  filters = {}

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private dbhDb: FirebaseDbProvider,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController
  ) {   
    this.counter = 1;
    this.cards = [];
    this.cardsconcat = [];
  }

  cardPreviewModal(card) {
    let modal = this.modalCtrl.create(CardPreviewModalPage, { cardProps: card }, { showBackdrop:true });
    modal.present();
  }

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

  searchCards(idsearch){
    this.cards = [];
    for (let i=0; i<this.cardsconcat.length; i++){
      if(((this.cardsconcat[i].id).indexOf(idsearch.toUpperCase())) != -1){
        this.cards.push(this.cardsconcat[i]);
      }
    }
    if(this.cards.length == 0){
      this.showAlert();
    }
  }
  
  ionViewDidLoad() {

    let toconcat: object[];

    console.log('loading only needed cards');
    
    this.dbhDb.getCards().first().subscribe(cards=>{  
      this.subscription = this.dbhDb.getUserCards().subscribe(ucards=>{
        
        this.ucards = ucards;

        // guardamos todas las cartas de las distintas colecciones en una misma variable

         for(let k = 0; k<cards.length; k++){
          if(k==0){
            this.cardsconcat = cards[k].cards;
          }
          else{
            toconcat = cards[k].cards;
            this.cardsconcat = _.concat(this.cardsconcat, cards[k].cards);
          }
        }
        
        //this.cards = this.cardsconcat;
        //let allcards = this.cardsconcat;

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
    //this.applyFilters();
  }

  ngOnDestroy(){
    if(this.subscription != undefined){
      this.subscription.unsubscribe();
    }
  }


  // Alerts and notifications

  showAlert(){
    let alert = this.alertCtrl.create({
      title: 'UPS! Not found',
      subTitle: 'Please try with another card id pattern.',
      buttons: ['OK']
    });
    alert.present();
  }

}
