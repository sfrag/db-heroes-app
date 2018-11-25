import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ModalController,
  ViewController
} from "ionic-angular";

import { CardPreviewModalPage } from "../../card-preview-modal/card-preview-modal";

import { FirebaseDbProvider } from "../../../providers/firebase-db/firebase-db";
import { CardsProvider } from "../../../providers/cards/cards";
import "rxjs/add/operator/first";
import * as _ from "lodash";

/**
 * Generated class for the Gdm1Page page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-univmis5",
  templateUrl: "univmis5.html"
})
export class Univmis5Page {
  cards: any;
  ucards: any;
  collectioncards: any;
  subscription: any;
  repeatedcards: any;
  cardswapper: any;
  counter: number;
  hidespinner: boolean;

  // esta variable indicara si estamos eliminando o añadiendo una carta
  deleting: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private dbhDb: FirebaseDbProvider,
    private dbCards: CardsProvider,
    public modalCtrl: ModalController
  ) {
    this.cardswapper = "all";
    this.repeatedcards = [];
    this.counter = 1;
    this.hidespinner = true;
  }

  cardPreviewModal(card) {
    let modal = this.modalCtrl.create(
      CardPreviewModalPage,
      { cardProps: card },
      { showBackdrop: true }
    );
    modal.present();
  }

  showrepeatedcards(event) {
    this.repeatedcards = this.dbCards.showrepeated(this.cards);
  }

  deletefromrepeated(card) {
    this.repeatedcards = this.dbCards.deleterepeated(card);
  }

  savecard(card) {
    this.counter = this.dbCards.savecard(card, this.ucards);
    //this.updatecounter(card);
  }

  deletecard(card) {
    this.dbCards.deletecard(card, this.ucards);
    if (card.counter == 1) {
      this.deletefromrepeated(card);
    }
  }

  updatecounter(card) {
    this.counter = this.dbCards.updatecounter(card, this.ucards);
  }

  ionViewDidLoad() {
    this.dbCards.loadcards().subscribe(cards => {
      //get cards
      this.cards = cards[54].cards;
      this.dbCards.loadusercards().subscribe(ucards => {
        this.ucards = ucards;
        this.collectioncards = this.cards;

        for (let i = 0; i < this.ucards.length; i++) {
          var ucard = this.ucards[i];
          for (let j = 0; j < this.collectioncards.length; j++) {
            var collectioncard = this.collectioncards[j];
            if (collectioncard.id == ucard.id) {
              collectioncard.counter = ucard.counter;
            }
          }
        }
        this.hidespinner = false;
      });
    });
  }

  ngOnDestroy() {
    this.dbCards.unsuscribe();
  }
}
