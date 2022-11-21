import {Component, Input} from '@angular/core';
import {Message} from "../chat-history/message.model";

@Component({
  selector: 'app-chat-history-item',
  templateUrl: './chat-history-item.component.html',
  styleUrls: ['./chat-history-item.component.scss']
})
export class ChatHistoryItemComponent {
  @Input() public message: Message = {
    body: "dummy",
    time: "long time ago",
    avatarUrl: "https://bootdey.com/img/Content/avatar/avatar7.png"
  };
}
