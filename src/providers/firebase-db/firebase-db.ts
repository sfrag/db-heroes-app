import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthProvider } from '../auth/auth';

/*
  Generated class for the FirebaseDbProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class FirebaseDbProvider {

  testeo: any;
  usercads: any;
  globalcards: any;
  totalcards: any;

  constructor(
    public afDB: AngularFireDatabase, 
    public auth: AuthProvider
  ) {
    console.log('Hello FirebaseDbProvider Provider');
  }

  getUserCards(){
    return this.afDB.list('/users/' + this.auth.getUser());
  }

  getCollections(){
    return this.afDB.list('/collections');
  }

  // obtiene un listado de todas las cartas existentes en la base de datos
  getCards(){
    return this.afDB.list('/cards');
  }

  // guardamos la carta en la que hacemos click en la base de datos de los usuarios.
  // cada carta la guardamos con su id para luego poder buscarla en la base de datos
  // de todas las cartas.

  saveCard(newcard){
    //this.countCards(newcard.id, newcard.counter);
    return this.afDB.database.ref('users/' + this.auth.getUser() + '/' + newcard.id).set(newcard);
    //return this.afDB.database.ref('users/' + this.auth.getUser() + '/' + "counter").set(this.counter);
  }

  countCards(card_id, counter){
    return this.afDB.database.ref('users/' + this.auth.getUser() + '/' + card_id + '/' + "counter").set(counter);
  }

  getCardCount(card){
    return this.afDB.list('/users/' + this.auth.getUser() + '/' + card.id);
  }

}
