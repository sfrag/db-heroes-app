import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { FirebaseDbProvider } from '../../providers/firebase-db/firebase-db';
import 'rxjs/add/operator/first';

/**
 * Generated class for the RepeatedCardsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-repeated-cards',
  templateUrl: 'repeated-cards.html',
})
export class RepeatedCardsPage {
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private dbhDb: FirebaseDbProvider) {
  }

  collections: any;
  collections_rev: any;
  subscription: any;

  gotoCollection(idCollection){
      this.navCtrl.push(idCollection+'Page');
  }

  ionViewDidLoad() {
    this.dbhDb.getCollections().first().subscribe(collections=>{
      this.collections = collections;
      this.collections_rev = this.collections.reverse();
    });
  }
  
  ngOnDestroy(){
    if(this.subscription != undefined){
      this.subscription.unsubscribe();
    }
  }

}
