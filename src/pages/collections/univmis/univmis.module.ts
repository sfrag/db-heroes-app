import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UnivmisPage } from './univmis';

@NgModule({
  declarations: [
    UnivmisPage,
  ],
  imports: [
    IonicPageModule.forChild(UnivmisPage),
  ],
})
export class UnivmisPageModule {}
