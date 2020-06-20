import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { NgForageCache } from 'ngforage';
import { Observable } from 'rxjs';
import { scan, startWith, tap } from 'rxjs/operators';
import { ChatMessage } from './chat-message.interface';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  private static readonly STORAGE_ITEM_KEY = 'messages';
  public messageText = '';
  public messages$: Observable<ChatMessage[]>;
  public authorId: string;

  constructor(
    private chatService: ChatService,
    private ngForageCache: NgForageCache,
    private fireAuth: AngularFireAuth,
    private router: Router,
  ) {}

  public async ngOnInit(): Promise<void> {
    const initialMessages: ChatMessage[] =
      (await this.ngForageCache.getItem(ChatComponent.STORAGE_ITEM_KEY)) ?? [];

    this.messages$ = this.chatService.message$.pipe(
      scan(
        (messages: ChatMessage[], message: ChatMessage) => [
          ...messages,
          message,
        ],
        initialMessages,
      ),
      tap(async (messages: ChatMessage[]) => {
        await this.ngForageCache.setItem(
          ChatComponent.STORAGE_ITEM_KEY,
          messages,
        );
      }),
      startWith(initialMessages),
    );

    this.fireAuth.user.subscribe((user: firebase.User) => {
      this.authorId = user?.email;

      if (user === null) {
        this.router.navigateByUrl('');
      }
    });
  }

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
