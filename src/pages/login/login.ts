import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {
    email:'',
    password:''
  };

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public auth: AuthProvider,
    public alertCtrl: AlertController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  signin(){
    this.auth.registerUser(this.user.email,this.user.password)
    .then((user) => {
      // El usuario se ha creado correctamente
    })
    .catch(err=>{
      let alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: err.message,
        buttons: ['Aceptar']
      });
      alert.present();
    })

  }

  login(){
    this.auth.loginUser(this.user.email, this.user.password)
    .then((user)=>{

    })
    .catch((err)=>{
      let alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: err.message,
        buttons: ['Aceptar']
      });
      alert.present();
    })
  }

  /////////// ALERTS ///////////

  resetPasswordInputAlert(){
    let alert = this.alertCtrl.create({
      title: 'Password reset',
      message: 'Introduce your email to recieve your password reset code',
      inputs: [
        {
          name: 'email',
          placeholder: 'Email'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: (data:any) => {
            this.auth.passReset(data.email);
            console.log('Save clicked');
          }
        }
      ]
    })
    alert.present();
  }


}
