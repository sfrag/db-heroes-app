import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AuthProvider } from '../providers/auth/auth';

import { CardListPage } from '../pages/card-list/card-list';
import { RepeatedCardsPage } from '../pages/repeated-cards/repeated-cards';
import { InfoPage } from '../pages/info/info';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  //rootPage:any = 'DhbTabsPage';
  rootPage:any = 'LoginPage';

  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    private auth: AuthProvider) {
    
      this.initializeApp();

      this.pages = [

      ]

    }

    initializeApp(){
      this.platform.ready().then(() => {
        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
        this.auth.Session.subscribe(session=>{
          if(session){
            this.rootPage = 'DbhMenuPage';
          }
          else{
            this.rootPage = 'LoginPage';
          }
        });
        this.statusBar.styleDefault();
        this.splashScreen.hide();
      });
    }
}

