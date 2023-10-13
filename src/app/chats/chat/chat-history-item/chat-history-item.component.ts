import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { ChatMessage } from '../chat-history/chat-message.model';
import { Message } from '../../../messages/message.model';

@Component({
  selector: 'app-chat-history-item',
  templateUrl: './chat-history-item.component.html',
  styleUrls: ['./chat-history-item.component.scss'],
})
export class ChatHistoryItemComponent implements AfterViewInit {
  @Output() newMessageAppears = new EventEmitter<void>();
  @Input() public message2: Message = {};
  @Input() public message: ChatMessage = {
    name: 'Dummy Dum',
    body: 'dummy',
    time: '2:33am',
    avatarUrl: 'https://bootdey.com/img/Content/avatar/avatar7.png',
    myMessage: true,
  };

  ngAfterViewInit(): void {
    this.newMessageAppears.emit();
  }
}
