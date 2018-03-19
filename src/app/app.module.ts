import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';

import { CardSearchPage } from '../pages/card-search/card-search';
import { RepeatedCardsPage } from '../pages/repeated-cards/repeated-cards';
import { InfoPage } from '../pages/info/info';
import { CollectionsPopoverPage } from '../pages/collections-popover/collections-popover';

import { FirebaseDbProvider } from '../providers/firebase-db/firebase-db';
import { AuthProvider } from '../providers/auth/auth';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { FCM } from '@ionic-native/fcm';
import { CardsProvider } from '../providers/cards/cards';
import { CardPreviewModalPage } from '../pages/card-preview-modal/card-preview-modal';

//export class PhotoViewerMock extends PhotoViewer {
  /**
   * Shows an image in full screen
   * @param url {string} URL or path to image
   * @param title {string}
   * @param options {any}
   */
// show(url: string, title?: string, options?: {
//      share?: boolean;
//  }): void {};
//}

//pages -- revisar esto porque creo que esta mal y se tiene que eliminar como las otras paginas y solo ponerlo en el modulo de su carpeta

var firebaseConfig = {
      apiKey: "AIzaSyDyq4hUe4NJq1GIMqVbIhlisZ1-m-AhMMQ",
      authDomain: "dbhcarcollector.firebaseapp.com",
      databaseURL: "https://dbhcarcollector.firebaseio.com",
      projectId: "dbhcarcollector",
      storageBucket: "",
      messagingSenderId: "144947304291"
    };

@NgModule({
  declarations: [
    MyApp,
    CardSearchPage,
    RepeatedCardsPage,
    CollectionsPopoverPage,
    CardPreviewModalPage,
    InfoPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CardSearchPage,
    RepeatedCardsPage,
    CollectionsPopoverPage,
    CardPreviewModalPage,
    InfoPage, 
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    FirebaseDbProvider,
    AuthProvider,
    FCM,
    CardsProvider
  ]
})
export class AppModule {}
