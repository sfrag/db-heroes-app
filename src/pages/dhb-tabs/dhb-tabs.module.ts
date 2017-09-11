import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DhbTabsPage } from './dhb-tabs';

@NgModule({
  declarations: [
    DhbTabsPage,
  ],
  imports: [
    IonicPageModule.forChild(DhbTabsPage),
  ]
})
export class DhbTabsPageModule {}
