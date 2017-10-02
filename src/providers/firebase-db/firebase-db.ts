import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AuthProvider } from '../auth/auth';

/*
  Generated class for the FirebaseDbProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class FirebaseDbProvider {

  constructor(
    public afDB: AngularFireDatabase, 
    public auth: AuthProvider 
  ) {
    console.log('Hello FirebaseDbProvider Provider');

    
  }

  saveCard(card){
    card.id = this.getCardId(card.id);
    return this.afDB.database.ref('cards/' + this.auth.getUser() + '/' + card.id)
  }

  // obtiene un listado de todas las cartas existentes en la base de datos
  getCards(){
    return this.afDB.list('/cards');
  }


  getCardId(card){
    return this.afDB.object('/cards');
  }

}
