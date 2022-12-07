import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Message} from "./message.model";
import {Observable, of} from "rxjs";
import {MessageService} from "../../message.service";

@Component({
  selector: 'app-chat-history',
  templateUrl: './chat-history.component.html',
  styleUrls: ['./chat-history.component.scss']
})
export class ChatHistoryComponent implements OnInit,AfterViewInit {
  @ViewChild("bottom") bottomElement: ElementRef<HTMLInputElement> = {} as ElementRef;

  public messages$: Observable<Message[]> = of([]);

  constructor(private messageService: MessageService) {
  }

  ngAfterViewInit(): void {
        this.scrollToBottom();
    }

  ngOnInit(): void {
    this.messages$ = this.messageService.getMessages();
  }

  scrollToBottom(): void {
    try {
      this.bottomElement.nativeElement.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch(err) {}
  }
}
