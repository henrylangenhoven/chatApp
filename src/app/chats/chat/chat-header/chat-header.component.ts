import { Component, Input } from '@angular/core';
import { Contact } from '../../../contacts/contact-item/contact.model';

@Component({
  selector: 'app-chat-header',
  templateUrl: './chat-header.component.html',
  styleUrls: ['./chat-header.component.scss'],
})
export class ChatHeaderComponent {
  @Input() contact: Contact = {} as Contact;

  settingsClicked() {
    alert('settings clicked');
  }
}
