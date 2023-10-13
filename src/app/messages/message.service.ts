import { Injectable } from '@angular/core';

import { BehaviorSubject, EMPTY, map, mergeMap, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as uuid from 'uuid';
import { ChatMessage } from '../chats/chat/chat-history/chat-message.model';
import { Conversation } from './conversation.model';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messages$: BehaviorSubject<ChatMessage[]> = new BehaviorSubject<ChatMessage[]>([]);

  constructor(private http: HttpClient, private userService: UserService) {
    this.http.get('/api/messages').subscribe((messages) => this.messages$.next(messages as ChatMessage[]));
  }

  getMessages(): Observable<ChatMessage[]> {
    return this.messages$;
  }

  getConversation(correspondentId: string): Observable<Conversation | undefined> {
    let currentUserId = this.userService.getCurrentUserId();
    if (!correspondentId || !currentUserId) {
      return EMPTY;
    }

    return this.http.get('/api/conversations').pipe(
      map((conversations) => conversations as Conversation[]),
      map((conversations) => {
        return conversations.find((conversation) => {
          let users = conversation.users as string[];
          return users.includes(currentUserId!) && users.includes(correspondentId);
        });
      }),
      mergeMap((value) => (value ? of(value) : this.createConversation(correspondentId)))
    );
  }

  createConversation(correspondentId: string): Observable<Conversation> {
    let currentUserId = this.userService.getCurrentUserId();

    return this.http.post('/api/conversations', {
      id: uuid.v4(),
      users: [currentUserId, correspondentId],
      messages: [],
    }) as Observable<Conversation>;
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
