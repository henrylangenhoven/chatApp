import { Component } from '@angular/core';
import { ContactService } from '../../contacts/contact.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { User } from '../../user/user.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent {
  public contact: User = {} as User;

  constructor(private contactService: ContactService) {
    this.contactService
      .getSelectedContact()
      .pipe(takeUntilDestroyed())
      .subscribe((contact) => (this.contact = contact));
  }
}
