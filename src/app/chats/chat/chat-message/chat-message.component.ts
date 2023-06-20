import { Component } from '@angular/core';
import { MessageService } from '../../../messages/message.service';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss'],
})
export class ChatMessageComponent {
  message: string = '';

  constructor(private messageService: MessageService) {}

  send() {
    this.messageService.sendMessage(this.message);
    this.message = '';
  }
}
