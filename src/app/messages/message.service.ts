import { Injectable } from '@angular/core';

import { BehaviorSubject, EMPTY, map, mergeMap, Observable, of, take, tap } from 'rxjs';
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
  conversations$: BehaviorSubject<Conversation[]> = new BehaviorSubject<Conversation[]>([]);

  constructor(
    private http: HttpClient,
    private contactService: ContactService,
    private userService: UserService,
  ) {
    this.loadConversationsFromDb();
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

  getConversation(correspondentId: string): Observable<Conversation | undefined> {
    let currentUserId = this.userService.getCurrentUserId();
    if (!correspondentId || !currentUserId) {
      return EMPTY;
    }

    return this.conversations$.pipe(
      map((conversations) => {
        return conversations.find((conversation) => {
          let users = conversation.users as string[];
          let conversationExists = users.includes(currentUserId!) && users.includes(correspondentId);
          return conversationExists;
        });
      }),
      mergeMap((value: Conversation | undefined) => {
        return !!value ? of(value!) : this.createConversation(correspondentId);
      }),
    );
  }

  createConversation(correspondentId: string): Observable<Conversation> {
    return this.postConversationToDb(this.userService.getCurrentUserId()!, correspondentId);
  }

  sendMessage(conversation: Conversation, messageBody: string) {
    if (!messageBody) return;

    let message: Message = {
      id: uuid.v4(),
      creatorId: this.userService.getCurrentUserId()!,
      messageBody: messageBody,
      createdDate: new Date(),
      isRead: false,
    };
    conversation.messages?.push(message);
    return this.updateConversationToDb(conversation);
  }

  private loadConversationsFromDb() {
    this.http
      .get('/api/conversations')
      .pipe(
        take(1),
        map((conversations) => conversations as Conversation[]),
      )
      .subscribe((conversations) => this.conversations$.next(conversations));
  }

  private postConversationToDb(currentUserId: string | null, correspondentId: string): Observable<Conversation> {
    return this.http
      .post('/api/conversations', {
        id: uuid.v4(),
        users: [currentUserId, correspondentId],
        messages: [],
      })
      .pipe(
        take(1),
        map((value) => {
          return value as Conversation;
        }),
        tap(() => this.loadConversationsFromDb()),
      );
  }

  private updateConversationToDb(conversation: Conversation): Observable<Conversation> {
    return this.http.put(`/api/conversations/${conversation.id}`, conversation).pipe(
      take(1),
      map((value) => {
        return value as Conversation;
      }),
      tap(() => this.loadConversationsFromDb()),
    );
  }
}
