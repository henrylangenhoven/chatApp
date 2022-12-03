import {Component} from '@angular/core';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss']
})
export class ChatMessageComponent {
  message: string = '';

  send() {
    alert(this.message) // TODO: do the sending
  }
}
