import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MessageService } from '../../../messages/message.service';
import { Conversation } from '../../../messages/conversation.model';
import { ChatMessage } from './chat-message.model';
import { NgFor, AsyncPipe } from '@angular/common';
import { ChatHistoryItemComponent } from '../chat-history-item/chat-history-item.component';

@Component({
  selector: 'app-chat-history',
  templateUrl: './chat-history.component.html',
  styleUrls: ['./chat-history.component.scss'],
  imports: [NgFor, ChatHistoryItemComponent, AsyncPipe],
})
export class ChatHistoryComponent implements AfterViewInit {
  @ViewChild('bottom') bottomElement: ElementRef<HTMLInputElement> = {} as ElementRef;

  @Input() conversation: Observable<Conversation> = {} as Observable<Conversation>;
  @Input() chatMessages$: Observable<ChatMessage[]> = of([]);

  constructor(private messageService: MessageService) {}

  ngAfterViewInit(): void {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.bottomElement.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } catch (err) {}
  }
}
