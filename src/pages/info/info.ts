import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { FirebaseDbProvider } from '../../providers/firebase-db/firebase-db';
import 'rxjs/add/operator/first';
/**
 * Generated class for the InfoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-info',
  templateUrl: 'info.html',
})
export class InfoPage {

  public collections: any;
  numberofCollections: number;
  cards: any;
  ucards: any;
  totalCards: Array<Object>;
  userCollectionCards: number;
  collectionProcessed: Object;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private dbhDb: FirebaseDbProvider
  ) {
    this.totalCards = [];
  }

  ionViewDidLoad() {

    //get collections
    this.dbhDb.getCollections().first().subscribe(collections=>{
      this.collections = collections;
      this.numberofCollections = this.collections.length;
    

      this.dbhDb.getUserCards().first().subscribe(ucards=>{
        this.ucards = ucards;

        for(let i=0; i < this.collections.length; i++){
          
          this.userCollectionCards = 0;
    
          for(let j=0; j < this.ucards.length; j++){
    
            if(ucards[j].collection){
    
              if(ucards[j].collection == this.collections[i].id.toUpperCase())
              {
                this.userCollectionCards++;
              }
            }
          }

          this.collectionProcessed = {
            collection_id: this.collections[i].id,
            collection_total_cards: this.collections[i].totalcards,
            collection_have_cards: this.userCollectionCards,
            collection_no_have_cards: this.collections[i].totalcards - this.userCollectionCards
          }
          
          this.totalCards.push(this.collectionProcessed);
        }
      });
    });

  }

}
