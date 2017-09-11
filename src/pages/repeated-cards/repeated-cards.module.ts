import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RepeatedCardsPage } from './repeated-cards';

@NgModule({
  declarations: [
    RepeatedCardsPage,
  ],
  imports: [
    IonicPageModule.forChild(RepeatedCardsPage),
  ],
})
export class RepeatedCardsPageModule {}
