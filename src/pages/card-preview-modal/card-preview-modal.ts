import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the CardPreviewModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-card-preview-modal',
  templateUrl: 'card-preview-modal.html',
})
export class CardPreviewModalPage {

  selectedCard: Object;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    //console.log('Cartas', navParams.get('cardProps'));
    this.selectedCard = navParams.get('cardProps');
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CardPreviewModalPage');
    console.log('Cartas', this.navParams.get('cards'));
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
