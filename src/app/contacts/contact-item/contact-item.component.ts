import {Component, Input} from '@angular/core';
import {Contact} from "./contact.model";
import {ContactService} from "../contact.service";

@Component({
  selector: 'app-contact-item',
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.scss']
})
export class ContactItemComponent {
  @Input() public contact: Contact = {
    name: "Dummy",
    avatarUrl: "https://bootdey.com/img/Content/avatar/avatar1.png",
    status: "Online",
    badge: 5
  };


  constructor(private contactService: ContactService) {
  }

  contactItemClicked() {
    this.contactService.setSelectedContact(this.contact)
  }
}
