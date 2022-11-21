import {Component} from '@angular/core';
import {Message} from "./message.model";

@Component({
  selector: 'app-chat-history',
  templateUrl: './chat-history.component.html',
  styleUrls: ['./chat-history.component.scss']
})
export class ChatHistoryComponent {
  public messages: Message[] = [
    {
      body: "Hi Aiden, how are you? How is the project coming",
      time: "10:10 AM, Today",
      avatarUrl:"https://bootdey.com/img/Content/avatar/avatar7.png"
    },
    {
      body: "Are we meeting today?",
      time: "10:12 AM, Today",
      myMessage: true
    },
    {
      body:"Project has been already finished and I have results to show you.",
      time: "10:15 AM, Today",
      myMessage:true
    },
  ]
}
