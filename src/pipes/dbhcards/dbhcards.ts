import { Pipe, PipeTransform } from '@angular/core';
import { FirebaseDbProvider } from '../../providers/firebase-db/firebase-db';

/**
 * Generated class for the DbhcardsPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'dbhcards'
})
export class DbhcardsPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */

  transform(cards: string, collection: string ) {
    //necesitamos las cartas y la coleccion que queremos filtrar
    let cards2 = FirebaseDbProvider; //Probar que devuelve esto
  }
}
