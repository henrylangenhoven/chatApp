import {Injectable} from '@angular/core';
import {Message} from "./chat/chat-history/message.model";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages$: Observable<Message[]> = this.http.get('/api/messages') as Observable<Message[]>;

  constructor(private http: HttpClient) {
  }

  getMessages(): Observable<Message[]> {
    return this.messages$;
  }

  sendMessage(message: string): void {
    this.messages.push({
      myMessage: true,
      time: '10am',
      body: message,
      name: 'You',
      avatarUrl: 'https://bootdey.com/img/Content/avatar/avatar1.png'
    })
  }
}
