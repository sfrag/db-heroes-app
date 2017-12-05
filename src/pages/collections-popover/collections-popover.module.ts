import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CollectionsPopoverPage } from './collections-popover';

@NgModule({
  declarations: [
    CollectionsPopoverPage,
  ],
  imports: [
    IonicPageModule.forChild(CollectionsPopoverPage),
  ],
})
export class CollectionsPopoverPageModule {}
