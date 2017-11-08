import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GmPage } from './gm';

@NgModule({
  declarations: [
    GmPage,
  ],
  imports: [
    IonicPageModule.forChild(GmPage),
  ],
})
export class GmPageModule {}
