import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GdmPage } from './gdm';

@NgModule({
  declarations: [
    GdmPage,
  ],
  imports: [
    IonicPageModule.forChild(GdmPage),
  ],
})
export class GdmPageModule {}
