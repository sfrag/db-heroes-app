import { Component } from '@angular/core';

/**
 * Generated class for the CardsListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'cards-list',
  templateUrl: 'cards-list.html'
})
export class CardsListComponent {

  text: string;

  constructor() {
    console.log('Hello CardsListComponent Component');
    this.text = 'Hello World';
  }

}
