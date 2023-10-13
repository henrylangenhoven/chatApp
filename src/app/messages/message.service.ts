import { Injectable } from '@angular/core';

import { BehaviorSubject, EMPTY, map, mergeMap, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as uuid from 'uuid';
import { ChatMessage } from '../chats/chat/chat-history/chat-message.model';
import { Conversation } from './conversation.model';
import { UserService } from '../user/user.service';
import { Message } from './message.model';
import { ContactService } from '../contacts/contact.service';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messages$: BehaviorSubject<ChatMessage[]> = new BehaviorSubject<ChatMessage[]>([]);

  constructor(private http: HttpClient, private contactService: ContactService, private userService: UserService) {
    this.http.get('/api/messages').subscribe((messages) => this.messages$.next(messages as ChatMessage[]));
  }

  convertMessagesToChatMessages(messages: Message[]): ChatMessage[] {
    return messages.map((message) => {
      let creatorUser = this.contactService.getContactById(message.creatorId!);
      let currentUserId = this.userService.getCurrentUserId();

      let createdDate = new Date(message.createdDate + '');
      return {
        name: creatorUser?.name,
        body: message.messageBody,
        time: createdDate.toLocaleTimeString(),
        date: createdDate.toDateString(),
        avatarUrl: creatorUser?.avatarUrl,
        myMessage: message.creatorId === currentUserId,
      } as ChatMessage;
    });
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

  sendMessage(conversation: Conversation, messageBody: string): void {
    if (!messageBody) return;

    let message: Message = {
      id: uuid.v4(),
      creatorId: this.userService.getCurrentUserId()!,
      messageBody: messageBody,
      createdDate: new Date(),
      isRead: false,
    };
    conversation.messages?.push(message);
    this.updateConversation(conversation);
  }

  private updateConversation(conversation: Conversation): void {
    this.http.put(`/api/conversations/${conversation.id}`, conversation).subscribe();
  }
}
