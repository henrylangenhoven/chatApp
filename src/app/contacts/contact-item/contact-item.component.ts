import { Component, Input } from '@angular/core';
import { ContactService } from '../contact.service';
import { User } from '../../user/user.model';
import { NgIf, NgClass } from '@angular/common';

@Component({
  selector: 'app-contact-item',
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.scss'],
  imports: [NgIf, NgClass],
})
export class ContactItemComponent {
  @Input() public contact: User = {
    name: 'Dummy',
    avatarUrl: 'https://bootdey.com/img/Content/avatar/avatar1.png',
    isOnline: true,
    badge: 5,
  };

  constructor(private contactService: ContactService) {}

  contactItemClicked() {
    this.contactService.setSelectedContact(this.contact);
  }
}
