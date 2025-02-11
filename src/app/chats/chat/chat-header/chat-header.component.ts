import { Component, Input } from '@angular/core';
import { User } from '../../../user/user.model';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-chat-header',
  templateUrl: './chat-header.component.html',
  styleUrls: ['./chat-header.component.scss'],
  imports: [NgIf],
})
export class ChatHeaderComponent {
  @Input() contact: User = {} as User;

  settingsClicked() {
    alert('settings clicked');
  }
}
