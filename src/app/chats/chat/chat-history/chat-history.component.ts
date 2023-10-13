import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { MessageService } from '../../../messages/message.service';
import { Conversation } from '../../../messages/conversation.model';
import { ChatMessage } from './chat-message.model';

@Component({
  selector: 'app-chat-history',
  templateUrl: './chat-history.component.html',
  styleUrls: ['./chat-history.component.scss'],
})
export class ChatHistoryComponent implements OnInit, AfterViewInit {
  @ViewChild('bottom') bottomElement: ElementRef<HTMLInputElement> = {} as ElementRef;

  @Input() conversation: Observable<Conversation> = {} as Observable<Conversation>;
  @Input() chatMessages: ChatMessage[] = [];

  constructor(private messageService: MessageService) {}

  ngAfterViewInit(): void {
    this.scrollToBottom();
  }

  ngOnInit(): void {
    // this.messages$ = this.messageService.getMessages();
  }

  scrollToBottom(): void {
    try {
      this.bottomElement.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } catch (err) {}
  }
}
