import { Component } from '@angular/core';
import { Contact } from '../../contacts/contact-item/contact.model';
import { ContactService } from '../../contacts/contact.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent {
  public contact: Contact = {} as Contact;

  constructor(private contactService: ContactService) {
    this.contactService
      .getSelectedContact()
      .pipe(takeUntilDestroyed())
      .subscribe((contact) => (this.contact = contact));
  }
}
