/**
 * Serwis służący to komunikacji z serwerem przez WebSocket wykorzystujący bibliotekę `socket.io-client`.
 */
import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import * as io from 'socket.io-client';
import { ChatMessage } from './chat-message.interface';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  /**
   * Statyczne stałę przechowujące informacje o adresie URL serwera oraz typie przesyłanych wiadomości.
   */
  private static readonly SOCKET_URL = 'https://chat-server.fbg.pl';
  private static readonly EVENT_TYPE = 'chat message';

  /**
   * Referencja do instancji połączenia zwracana przez funkcję `connect` biblioteki SocketIO.
   */
  private socket: SocketIOClient.Socket;

  /**
   * Strumień wiadomości przychodzących z serwera przez WebSocket.
   */
  public message$: Observable<ChatMessage>;

  constructor() {
    /**
     * Nawiązanie połączenia przez Socket.
     */
    this.socket = io.connect(ChatService.SOCKET_URL);

    /**
     * Strumień emitujący pojedyncze wiadomości gdy przyjdą one jako wiadomości z serwera.
     * Metoda `socket.on` pozwala na nasłuchiwanie na wskazany typ wiadomości emitowanych przez WebSocket.
     * Metoda `subscriber.next` pozwala na wyemitowanie wiadomości do wszystkich obserwatorów danego strumienia.
     */
    this.message$ = new Observable((subscriber: Subscriber<ChatMessage>) => {
      this.socket.on(ChatService.EVENT_TYPE, (message) => {
        subscriber.next(message);
      });
    });
  }

  /**
   * Metoda służąca to wysyłania wiadomości do serwera.
   * Metoda `socket.emit` służy do emitowania wiadomości wskazanego typu przez WebSocket.
   */
  public send(message: ChatMessage) {
    this.socket.emit(ChatService.EVENT_TYPE, message);
  }
}
