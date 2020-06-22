/**
 * Komponent wyświetlający Chata.
 */
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { NgForageCache } from 'ngforage';
import { Observable } from 'rxjs';
import { scan, share, startWith, tap } from 'rxjs/operators';
import { ChatMessage } from './chat-message.interface';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  /**
   * Statyczna stała przechowująca klucz pod którym wiadomości zapisywane są w IndexedDB.
   */
  private static readonly STORAGE_ITEM_KEY = 'messages';

  /**
   * Model wiadomości użytkownika przypięty w szablonie do elementu <textarea>
   */
  public messageText = '';

  /**
   * Strumień przechowujący tablicę wiadomości do wyświetlenia
   */
  public messages$: Observable<ChatMessage[]>;

  /**
   * Identyfikator użytkownika służący do rozróżniania nadawców wiadomości
   */
  public authorId: string;

  /**
   * Konstruktor z wstrzykiwanymi zależnościami:
   * - ChatService służy do komunikacji z serwerem Chata poprzez WebSocket
   * - NgForageCache służy do zapisu i odczytu danych w IndexedDB
   * - AngularFireAuth służy do pobierania informacji o autoryzacji użytkownika
   * - Router to serwis służący do nawigacji po różnych ściwżkach aplikacji
   */
  constructor(
    private chatService: ChatService,
    private ngForageCache: NgForageCache,
    private fireAuth: AngularFireAuth,
    private router: Router,
  ) {}

  /**
   * Metoda implementująca interfejs OnInit związany z cyklem życia komponentu
   */
  public async ngOnInit(): Promise<void> {
    /**
     * Pobranie zapisanych w przeglądarce wiadomości poprzez wywołanie asynchronicznej metody `getItem` z serwisu `NgForageCache`
     * W przypadku braku zapisanych wiadomości zostanie użyta wartość domyślna, czyli pusta tablica
     */
    const initialMessages: ChatMessage[] = (await this.ngForageCache.getItem(ChatComponent.STORAGE_ITEM_KEY)) ?? [];

    /**
     * Strumień wiadomości tworzony na podstawie eventów emitowanych przez strumień pojedynczych wiadomości z serwisu `ChatService`,
     * tworzony poprzez wykorzystanie operatora rxjs `scan`, będącego _odpowiednikiem_ funkcji `reduce`.
     * Operator `tap` służy do dodania efektu ubocznego bez zmiany danych emitowanych przez strumień – w tym przypadku
     * służy do zapisania tablicy wiadomości do IndexedDB.
     */
    this.messages$ = this.chatService.message$.pipe(
      scan((messages: ChatMessage[], message: ChatMessage) => [...messages, message], initialMessages),
      tap((messages: ChatMessage[]) => {
        this.ngForageCache.setItem(ChatComponent.STORAGE_ITEM_KEY, messages);
      }),
      startWith(initialMessages),
      share(),
    );

    /**
     * Logika obsługi sesji użytkownika, ustawiająca wartość `authorId` na podstawie adresu email zalogowanego użytkownika.
     * W przypadku zakończenia sesji (wyemitowania wartości `null`) użytkownik zostanie przekierowany na stronę główną.
     */
    this.fireAuth.user.subscribe((user: firebase.User) => {
      this.authorId = user?.email;

      if (user === null) {
        this.router.navigateByUrl('');
      }
    });
  }

  /**
   * Metoda `send` wywoływana z szablonu HTML służy do wysyłania wiadomości poprzez wywołanie metody `send` serwisu `ChatService`.
   * Wiadomość jest wysyłana tylko w przypadku gdy treść wiadomości nie jest pusta oraz wartość `authorId` jest ustawiona.
   * Po wysłaniu wiadomości treść wiadomości w tagu `<textarea>` jest czyszczona.
   */
  public send() {
    const text = this.messageText.trim();
    if (text && this.authorId) {
      this.chatService.send({
        text,
        authorId: this.authorId,
      });

      this.messageText = '';
    }
  }
}
