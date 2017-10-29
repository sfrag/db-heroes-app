import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { FirebaseDbProvider } from '../providers/firebase-db/firebase-db';
import { AuthProvider } from '../providers/auth/auth';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

//pages
import { CardListPage } from '../pages/card-list/card-list'


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
    MyApp, CardListPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
    
    /* IonicModule.forRoot(MyApp, {
      statusbarPadding: true,
     },
    {
      links: [
        { component: CardListPage, name: 'CardListPage', segment: 'card-list-page' }
      ]
    }) */
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp, CardListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FirebaseDbProvider,
    AuthProvider
  ]
})
export class AppModule {}
