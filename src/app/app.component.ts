import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// Muy importante, a partir de la versión 3 de ionic native todos los plugins tenemos que añadirlos
// en el app.module.ts y añadirlo tanbien en el apartado de providers para que funcione.
import { FCM } from '@ionic-native/fcm';

import { AuthProvider } from '../providers/auth/auth';

import { CardSearchPage } from '../pages/card-search/card-search';
import { RepeatedCardsPage } from '../pages/repeated-cards/repeated-cards';
import { InfoPage } from '../pages/info/info';
import { DbhMenuPage } from '../pages/dbh-menu/dbh-menu';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  //rootPage:any = 'DhbTabsPage';
  @ViewChild(Nav) nav: Nav;
  
  rootPage:any = 'LoginPage';

  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public alertCtrl: AlertController,
    private fcm: FCM,
    private auth: AuthProvider) {
    
      this.initializeApp();

      this.pages = [
        { title: 'Home', component: DbhMenuPage },
        { title: 'Collections', component: RepeatedCardsPage },
        { title: 'Searcher', component: CardSearchPage },
        //{ title: 'Info', component: InfoPage}
      ];

    }

    cerrarSesion() {
      this.auth.logout();
    }

    initializeApp() {
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

      // Importante, este es el código de las notificaciones que hace uso de plugins nativos
      // para que la app funcione en el browser debemos añadir un condicional para que solo
      // se ejecute este código en caso de que estemos en un dispositivo.

      if (this.platform.is('cordova')){
        
        this.fcm.subscribeToTopic('all');
        
        this.fcm.getToken().then(token => {
          //backend.registerToken(token);
        });
  
        this.fcm.onNotification().subscribe(data => {
          alert('message received');
          if(data.wasTappedTapped){
            console.info("Received in background");
          }else{
            alert(data);
            console.info("Received in foreground");
          };
        });
  
        this.fcm.onTokenRefresh().subscribe(token => {
          //backend.registerToken(token);
        });
      }

    }

    // Actualmente ionic native push 4.4 pero debemos bajarla a la 4.2.1 debido a la dependencia con phonegap-plugin-push
    // para funcionar la 4.4 phonegap-plugin-push tiene que ser la 2.0.0 pero no funciona todavia de forma estable por lo que debemos usar la 1.10.5
    // sino nos da error con el senderID. Cuando se pueda usar la 2.0.0 la forma de hacerlo es distinta y habrá que mirar la documentación.

    openPage(page) {
      // Reset the content nav to have just this page
      // we wouldn't want the back button to show in this scenario
      this.nav.setRoot(page.component);
    }
}

