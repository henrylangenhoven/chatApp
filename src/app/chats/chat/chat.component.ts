import { Component } from '@angular/core';
import { ContactService } from '../../contacts/contact.service';
import { User } from '../../user/user.model';
import { filter, mergeMap, of } from 'rxjs';
import { MessageService } from '../../messages/message.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Conversation } from '../../messages/conversation.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent {
  public selectedUser: User = {} as User;
  public conversation: Conversation | never[] = {} as Conversation;

  constructor(private contactService: ContactService, private messageService: MessageService) {
    this.contactService
      .getSelectedContact()
      .pipe(
        takeUntilDestroyed(),
        filter((user: User) => !!user),
        mergeMap((user: User) => {
          if (!user) return of([]);

          this.selectedUser = user;
          return this.messageService.getConversation(user?.id!);
        })
      )
      .subscribe((value) => {
        if (!value) return;

        this.conversation = value;
      });
  }
}
