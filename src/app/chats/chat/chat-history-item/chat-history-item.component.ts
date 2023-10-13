import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { ChatMessage } from '../chat-history/chat-message.model';

@Component({
  selector: 'app-chat-history-item',
  templateUrl: './chat-history-item.component.html',
  styleUrls: ['./chat-history-item.component.scss'],
})
export class ChatHistoryItemComponent implements AfterViewInit {
  @Output() newMessageAppears = new EventEmitter<void>();
  @Input() public message: ChatMessage = {} as ChatMessage;

  ngAfterViewInit(): void {
    this.newMessageAppears.emit();
  }
}
