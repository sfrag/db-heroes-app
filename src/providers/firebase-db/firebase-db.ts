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

  guardarCartas(){

  }

  getCards(){
    return this.afDB.list('/cards');
  }

}
