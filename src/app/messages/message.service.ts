import { Injectable } from '@angular/core';
import { Message } from '../chats/chat/chat-history/message.model';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as uuid from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messages$: BehaviorSubject<Message[]> = new BehaviorSubject<Message[]>([]);

  constructor(private http: HttpClient) {
    this.http.get('/api/messages').subscribe((messages) => this.messages$.next(messages as Message[]));
  }

  getMessages(): Observable<Message[]> {
    return this.messages$;
  }

  sendMessage(message: string): void {
    let body = {
      id: uuid.v4(),
      myMessage: true,
      time: '10am',
      body: message,
      name: 'You',
      avatarUrl: 'https://bootdey.com/img/Content/avatar/avatar1.png',
    };

    this.messages$.next([...this.messages$.getValue(), body]);
  }
}
