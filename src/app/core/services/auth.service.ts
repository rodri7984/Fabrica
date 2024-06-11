import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { signInWithEmailAndPassword } from 'firebase/auth'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private authFirebase: AngularFireAuth
  ) { 
  }

  iniciarSesion(email: string, password: string){
    return this.authFirebase.signInWithEmailAndPassword(email, password);
  }

  cerrarSesion(){
    return this.authFirebase.signOut();
  }
}
