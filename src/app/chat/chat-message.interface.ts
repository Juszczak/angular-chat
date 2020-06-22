/**
 * Interfejs opisujący model wiadomości przesyłanych przez WebSocket.
 * Pola `timestamp` oraz `id` są opcjonalne, ponieważ pojawiają się dopiero w przypadku wiadomości zwrotnej z serwera.
 */
export interface ChatMessage {
  authorId: string;
  text: string;
  timestamp?: number;
  id?: string;
}
