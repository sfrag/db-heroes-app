import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseDbProvider } from '../../providers/firebase-db/firebase-db';

import 'rxjs/add/operator/first';

/**
 * Generated class for the CardchangePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cardchange',
  templateUrl: 'cardchange.html',
})
export class CardchangePage {

  usersList: any;
  userCards: any;
  numberOfCards: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private dbhDb: FirebaseDbProvider
  ) {
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CardchangePage');
    
    this.dbhDb.getUsers().first().subscribe(users=>{
      this.usersList = users;
      for(let i = 0; i<this.usersList.length; i++)
        this.usersList[i].length
    })
  }  
}