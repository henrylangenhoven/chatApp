import { Component, DestroyRef, inject } from '@angular/core';
import { ContactService } from '../../contacts/contact.service';
import { User } from '../../user/user.model';
import { BehaviorSubject, filter, map, mergeMap, of } from 'rxjs';
import { MessageService } from '../../messages/message.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Conversation } from '../../messages/conversation.model';
import { Message } from '../../messages/message.model';
import { ChatMessage } from './chat-history/chat-message.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent {
  destroyRef = inject(DestroyRef);
  public selectedUser: User = {} as User;
  public conversation: Conversation | never[] = {} as Conversation;
  public chatMessages$: BehaviorSubject<ChatMessage[]> = new BehaviorSubject([] as ChatMessage[]);

  constructor(private contactService: ContactService, private messageService: MessageService) {
    this.loadChatMessages();
  }

  newMessageSent(messageBody: string) {
    this.messageService
      .sendMessage(this.conversation as Conversation, messageBody)
      ?.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => {
        console.log('newMessageSent: ', value);
      });
  }

  private loadChatMessages() {
    this.contactService
      .getSelectedContact()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        filter((user: User) => !!user),
        mergeMap((user: User) => {
          if (!user) return of([]);

          this.selectedUser = user;
          return this.messageService.getConversation(user?.id!);
        }),
        map((value) => {
          if (!value) return [];

          this.conversation = value;

          return this.messageService.convertMessagesToChatMessages(
            (this.conversation as Conversation)?.messages as Message[]
          );
        })
      )
      .subscribe((value) => {
        this.chatMessages$.next(value);
      });
  }
}
