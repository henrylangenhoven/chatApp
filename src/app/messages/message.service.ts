import {Injectable} from '@angular/core';
import {Message} from "../chats/chat/chat-history/message.model";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import * as uuid from "uuid";

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
    let body = {
      "id": uuid.v4(),
      "myMessage": true,
      "time": '10am',
      "body": message,
      "name": 'You',
      "avatarUrl": 'https://bootdey.com/img/Content/avatar/avatar1.png'
    }

    let objectObservable = this.http.post('/api/messages', body);
    objectObservable.subscribe(() => {
      this.messages$ = this.http.get('/api/messages') as Observable<Message[]>
    });

  }
}
