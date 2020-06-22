/**
 * Główny komponent aplikacji wyświetlający podkomponenty oraz służący do zarządzania sesją użytkownika.
 */
import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  /**
   * Strumień informacji o zalogowanym użytkowniku.
   */
  public user$: Observable<firebase.User>;

  constructor(private fireAuth: AngularFireAuth) {
    this.user$ = this.fireAuth.user;
  }

  /**
   * Metoda `login` służy do autoryzacji użytkownika poprzez wyświetlenie okna logowania z Google.
   */
  public login() {
    const authProvider = new auth.GoogleAuthProvider();
    this.fireAuth.signInWithPopup(authProvider);
  }

  /**
   * Metoda służąca do wylogowania użytkownika.
   */
  public logout() {
    this.fireAuth.signOut();
  }
}
