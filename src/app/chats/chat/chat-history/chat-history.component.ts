import {Component, OnInit} from '@angular/core';
import {Message} from "./message.model";
import {Observable, of} from "rxjs";
import {MessageService} from "../../message.service";

@Component({
  selector: 'app-chat-history',
  templateUrl: './chat-history.component.html',
  styleUrls: ['./chat-history.component.scss']
})
export class ChatHistoryComponent implements OnInit {
  public messages$: Observable<Message[]> = of([]);

  constructor(private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.messages$ = this.messageService.getMessages();
  }
}
