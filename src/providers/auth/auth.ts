import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';


/*
  Generated class for the AuthProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class AuthProvider {

  // Registro de usuario
  registerUser(email:string, password:string){
    return this.afAuth.auth.createUserWithEmailAndPassword( email, password)
    .then((res)=>{
      // El usuario se ha creado correctamente. 
    })
    .catch(err=>Promise.reject(err))
  }

  // Login de un usuario
  loginUser(email:string, password:string){
    return this.afAuth.auth.signInWithEmailAndPassword( email, password)
    .then(user=>Promise.resolve(user))
    .catch(err=>Promise.reject(err))
  }

  //Devuelve la sesion ??
  get Session(){
    return this.afAuth.authState;
  }

  //Logout de usuario
  logout(){
    this.afAuth.auth.signOut().then(()=>{
      //hemos salido
    })
  }

  //Obtenemos el id de usuario
  getUser(){
    return this.afAuth.auth.currentUser.uid;
  }

  constructor(private afAuth: AngularFireAuth) {
    console.log('Hello AuthProvider Provider');
  }

}
