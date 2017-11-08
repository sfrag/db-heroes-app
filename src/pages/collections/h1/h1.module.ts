import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { H1Page } from './h1';

@NgModule({
  declarations: [
    H1Page,
  ],
  imports: [
    IonicPageModule.forChild(H1Page),
  ],
})
export class H1PageModule {}
