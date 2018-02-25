import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CardPreviewModalPage } from './card-preview-modal';

@NgModule({
  declarations: [
    CardPreviewModalPage,
  ],
  imports: [
    IonicPageModule.forChild(CardPreviewModalPage),
  ],
})
export class CardPreviewModalPageModule {}
